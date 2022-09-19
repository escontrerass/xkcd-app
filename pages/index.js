import MainLayout from '../components/MainLayout';
import fs from 'fs/promises';
import Image from 'next/image';
import Link from 'next/link';

export default function Home({ latestComics }) {
  return (
    <MainLayout>
      <h2 className='mb-4 text-3xl font-bold text-center'>Latest Comics</h2>
      <section className='grid max-w-lg grid-cols-1 gap-4 m-auto sm:grid-cols-2 md:grid-cols-3'>
        {latestComics.map((comic) => (
          <Link key={comic.id} href={`/comic/${comic.id}`}>
            <a className='pb-4 m-auto mb-4'>
              <h3 className='text-sm font-bold text-center'>{comic.title}</h3>
              <Image
                src={comic.img}
                alt={comic.alt}
                width={comic.width}
                height={comic.height}
              />
            </a>
          </Link>
        ))}
      </section>
    </MainLayout>
  );
}

export async function getStaticProps(context) {
  const files = await fs.readdir('./comics');
  const latestComicsFiles = files.slice(-8, files.length);

  const promisesReadFiles = latestComicsFiles.map(async (file) => {
    const content = await fs.readFile(`./comics/${file}`, 'utf-8');
    return JSON.parse(content);
  });

  const latestComics = await Promise.all(promisesReadFiles);
  // console.log(latestComics);

  return {
    props: {
      latestComics,
    },
  };
}
