import Image from 'next/image'
import Next from 'public/Nextjs-logo.svg'
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons'
import { useI18N } from 'context/i18n'

export function Footer() {
  const { translate } = useI18N()

  return (
    <footer className='flex items-center justify-around py-2 text-center bg-slate-800'>
      <a href='https://nextjs.org/' target='_blank' rel='noopener noreferrer'>
        <Image width={100} height={50} src={Next} alt='Logo de Vercel' />
      </a>
      <div className='flex flex-col'>
        <p className='font-bold text-white'>
          {translate('POWER_BY')}{' '}
          <a
            href='https://xkcd.com/'
            target='_blank'
            rel='noopener noreferrer'
            className='transition text-sky-400 hover:text-black'
          >
            XKCD - Comics
          </a>
        </p>
        <p className='font-light text-white'>
          {translate('DEVELOPED_BY')}{' '}
          <a
            href='https://github.com/escontrerass'
            target='_blank'
            rel='noopener noreferrer'
            className='transition text-sky-400 hover:text-black'
          >
            Escontrerass
          </a>
        </p>
      </div>
      <ul className='flex gap-5 icon-footer'>
        <li>
          <a href='https://github.com/escontrerass' target='_blank' rel='noopener noreferrer'>
            <IconBrandGithub size='32' color='white' />
          </a>
        </li>
        <li>
          <a href='https://www.linkedin.com/in/escontreras/' target='_blank' rel='noopener noreferrer'>
            <IconBrandLinkedin size='32' color='white' />
          </a>
        </li>
      </ul>
    </footer>
  )
}
