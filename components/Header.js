import Image from 'next/image';
import Link from 'next/link';
import xkcdLogo from '../public/xkcd-logo.png';

export default function Header() {
  const liStyle =
    'transition px-2 py-5 font-semibold text-white border-b-4 border-transparent hover:border-sky-400 hover:text-sky-400 hover:transition';

  return (
    <header className='sticky flex items-center py-2 shadow-xl bg-slate-900'>
      <nav className='flex items-center justify-around w-full'>
        <Link href='/'>
          <a>
            <Image
              className='shadow-xl'
              width={128}
              height={72}
              src={xkcdLogo}
              alt='XKCD comics logo'
            />
          </a>
        </Link>
        <ul className='flex items-center gap-2'>
          <li className={liStyle}>
            <Link href='/'>Home</Link>
          </li>
          <li className={liStyle}>
            <Link href='/search'>Search</Link>
          </li>
          <li className={liStyle}>
            <Link href='/about'>About</Link>
          </li>
          <li className={liStyle}>
            <Link href='/contactUs'>Contact Us</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
