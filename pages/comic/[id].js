import { MainLayout } from '../../components/MainLayout'
import Image from 'next/image'
import { readFile, stat, readdir } from 'fs/promises'
import { basename } from 'path'
import Link from 'next/link'
import { useI18N } from 'context/i18n'

export default function Comic({ img, alt, title, width, height, prevId, hasPrevious, nextId, hasNext }) {
  const { translate } = useI18N()

  return (
    <MainLayout>
      <section className='flex flex-col justify-between max-w-xl m-auto'>
        <div className='overflow-hidden rounded-lg'>
          <h1 className='py-5 font-mono text-3xl font-bold text-center bg-slate-300'>{title}</h1>
          <Image layout='responsive' width={width} height={height} src={img} alt={alt} />
          <p className='p-2 bg-slate-300'>{alt}</p>
        </div>
        <div className='flex justify-between my-5'>
          <div>
            {hasPrevious && (
              <Link href={`/comic/${prevId}`}>
                <a className='px-4 py-2 transition rounded-lg bg-slate-900 text-sky-400 hover:text-slate-900 hover:bg-sky-400 hover:transition'>
                  ⬅ {translate('PREVIOUS')}
                </a>
              </Link>
            )}
          </div>
          <div>
            {hasNext && (
              <Link href={`/comic/${nextId}`}>
                <a className='px-4 py-2 transition rounded-lg bg-slate-900 text-sky-400 hover:text-slate-900 hover:bg-sky-400 hover:transition'>
                  {translate('NEXT')} ➡
                </a>
              </Link>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export async function getStaticPaths({ locales }) {
  const files = await readdir('./comics')
  let paths = []

  locales.forEach(locale => {
    paths = paths.concat(
      files.map(file => {
        const id = basename(file, '.json')
        return { params: { id }, locale }
      })
    )
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { id } = params

  const content = await readFile(`./comics/${id}.json`, 'utf-8')
  const comic = JSON.parse(content)

  const idNumber = +id
  const prevId = idNumber - 1
  const nextId = idNumber + 1

  const [prevResults, nextResult] = await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nextId}.json`),
  ])

  const hasPrevious = prevResults.status === 'fulfilled'
  const hasNext = nextResult.status === 'fulfilled'

  return {
    props: {
      ...comic,
      prevId,
      hasPrevious,
      nextId,
      hasNext,
    },
  }
}
