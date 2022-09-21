import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { MasonryCard } from 'components/MasonryCard'
import { MainLayout } from '../components/MainLayout'
import { useI18N } from 'context/i18n'
import fs from 'fs/promises'

export default function Home({ latestComics }) {
  const { translate } = useI18N()

  return (
    <MainLayout>
      <h2 className='mt-5 mb-10 text-3xl font-bold text-center'>{translate('LATEST_COMICS')}</h2>
      <section className='max-w-xl m-auto'>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter='20px'>
            {latestComics.map(comic => (
              <MasonryCard key={comic.id} comic={comic} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </section>
    </MainLayout>
  )
}

export async function getStaticProps() {
  const files = await fs.readdir('./comics')
  const latestComicsFiles = files.slice(-9, files.length)

  const promisesReadFiles = latestComicsFiles.map(async file => {
    const content = await fs.readFile(`./comics/${file}`, 'utf-8')
    return JSON.parse(content)
  })

  const latestComics = await Promise.all(promisesReadFiles)
  return {
    props: {
      latestComics,
    },
  }
}
