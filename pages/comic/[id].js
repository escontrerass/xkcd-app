import MainLayout from '../../components/MainLayout';
import Image from 'next/image';
import { readFile, stat, readdir } from 'fs/promises';
import { basename } from 'path';
import Link from 'next/link';

export default function Comic({
  id,
  img,
  alt,
  title,
  width,
  height,
  prevId,
  hasPrevious,
  nextId,
  hasNext,
}) {
  return (
    <MainLayout title={`XKCD by EC - #${id}`}>
      <section className='max-w-xl m-auto'>
        <h1 className='mb-4 text-3xl font-bold text-center'>{title}</h1>
        <Image
          layout='responsive'
          width={width}
          height={height}
          src={img}
          alt={alt}
        />
        <p>{alt}</p>
        <div className='flex justify-between my-5'>
          <div>
            {hasPrevious && (
              <Link href={`/comic/${prevId}`}>
                <a className='px-4 py-2 transition rounded-lg bg-slate-900 text-sky-400 hover:text-slate-900 hover:bg-sky-400 hover:transition'>
                  ⬅ Previous
                </a>
              </Link>
            )}
          </div>
          <div>
            {hasNext && (
              <Link href={`/comic/${nextId}`}>
                <a className='px-4 py-2 transition rounded-lg bg-slate-900 text-sky-400 hover:text-slate-900 hover:bg-sky-400 hover:transition'>
                  Next ➡
                </a>
              </Link>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export async function getStaticPaths() {
  const files = await readdir('./comics');

  const paths = files.map((file) => {
    const id = basename(file, '.json');
    return {
      params: { id },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;

  const content = await readFile(`./comics/${id}.json`, 'utf-8');
  const comic = JSON.parse(content);

  const idNumber = +id;
  const prevId = idNumber - 1;
  const nextId = idNumber + 1;

  const [prevResults, nextResult] = await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nextId}.json`),
  ]);

  const hasPrevious = prevResults.status === 'fulfilled';
  const hasNext = nextResult.status === 'fulfilled';

  return {
    props: {
      ...comic,
      prevId,
      hasPrevious,
      nextId,
      hasNext,
    },
  };
}
