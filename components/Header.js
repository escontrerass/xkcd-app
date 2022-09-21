import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useI18N } from 'context/i18n'
import xkcdLogo from '../public/xkcd-logo.png'

export function Header() {
  const [results, setResults] = useState([])
  const searchRef = useRef()
  const { locale, locales } = useRouter()
  const { translate } = useI18N()

  const liStyle =
    'px-2 py-5 font-semibold text-white transition border-b-4 border-transparent hover:border-sky-400 hover:text-sky-400'

  const getValue = () => searchRef.current?.value

  const handleChange = () => {
    try {
      const ask = getValue()
      if (!ask) return setResults([])
      fetch(`/api/search?ask=${ask}`)
        .then(res => res.json())
        .then(searchResults => {
          setResults(searchResults)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const restOfLocales = locales?.filter(l => l !== locale)

  return (
    <header className='flex items-center w-full py-2 shadow-xl bg-slate-900'>
      <nav className='flex items-center justify-around w-full'>
        <Link href='/'>
          <a>
            <Image className='shadow-xl' width={128} height={72} src={xkcdLogo} alt='XKCD comics logo' />
          </a>
        </Link>
        <ul className='flex items-center gap-2'>
          <li className={liStyle}>
            <Link href='/'>
              <a>{translate('HOME')}</a>
            </Link>
          </li>
          <li>
            <input
              type='search'
              ref={searchRef}
              onChange={handleChange}
              placeholder={translate('SEARCH')}
              className='px-4 py-2 text-xs border-2 border-transparent outline-none cursor-pointer rounded-3xl hover:border-sky-400'
            />
            <div className='relative z-10'>
              {Boolean(results.length) && (
                <div className='absolute top-0 left-0'>
                  <ul className='overflow-hidden bg-white border rounded-lg shadow-xl border-gray-50'>
                    <li className='m-0' key='all-result'>
                      <Link href={`/search?ask=${getValue()}`}>
                        <a className='block px-2 py-1 text-sm font-semibold text-gray-500 whitespace-nowrap hover:bg-slate-200'>
                          Ver {results.length} resultados
                        </a>
                      </Link>
                    </li>
                    {results.map(result => {
                      return (
                        <li className='m-0' key={result.id}>
                          <Link href={`/comic/${result.id}`}>
                            <a className='block px-2 py-1 text-sm font-semibold whitespace-nowrap hover:bg-slate-200'>
                              {result.title}
                            </a>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </div>
          </li>
          <li>
            <div className='relative inline-block group'>
              <button className='inline-flex items-center px-4 py-2 font-semibold text-white transition border-2 rounded-3xl border-sky-400 hover:bg-sky-400 hover:text-black hover:border-white'>
                <span className='mr-1'>
                  {translate('LANGUAGE', locale)}
                  <span className='pl-2'>▼</span>
                </span>
              </button>
              <ul className='absolute hidden pt-1 text-gray-700 dropdown-menu group-hover:block'>
                {restOfLocales &&
                  restOfLocales.map(local => {
                    return (
                      <li key={local}>
                        <Link href='/' locale={local}>
                          <a className='block py-2 pl-4 font-bold text-black whitespace-no-wrap transition border-2 rounded-3xl bg-slate-300 border-sky-400 text-md pr-28 hover:bg-sky-400 hover:border-white'>
                            {local}
                          </a>
                        </Link>
                      </li>
                    )
                  })}
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  )
}
