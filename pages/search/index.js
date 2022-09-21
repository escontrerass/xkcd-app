import { MainLayout } from '../../components/MainLayout'
import Image from 'next/image'
import Link from 'next/link'
import { searchService } from '../../services/searchService'
import { useI18N } from 'context/i18n'

export default function Component({ query, results }) {
  const { translate } = useI18N()

  return (
    <MainLayout>
      <h1 className='mb-4 text-3xl font-bold text-center'>{translate('SEARCH_RESULT', results.length, query)}</h1>
      <section className='flex flex-col max-w-xl mx-auto'>
        {results.map(result => {
          console.log(result)
          return (
            <Link href={`/comic/${result.id}`} key={result.id}>
              <a className='flex flex-row items-center content-center justify-between gap-5 pr-5 font-bold transition rounded-l-3xl bg-slate-300 hover:bg-slate-900 hover:text-white hover:scale-110 hover:my-1'>
                <Image src={result.img} alt={result.alt} width={50} height={50} className='rounded-full' />
                <h2>{result.title}</h2>
                <p>{`${result.day}-${result.month}-${result.year}`}</p>
              </a>
            </Link>
          )
        })}
      </section>
    </MainLayout>
  )
}

export async function getServerSideProps(context) {
  const { query } = context
  const { ask = '' } = query

  const { results } = await searchService({ query: ask })

  return {
    props: { query: ask, results },
  }
}
