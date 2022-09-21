import Image from 'next/image'
import Link from 'next/link'

export function MasonryCard({ comic }) {
  return (
    <Link href={`/comic/${comic.id}`}>
      <a className='transition hover:scale-110'>
        <h3 className='px-2 py-1 text-sm font-bold text-center text-white rounded-t-lg bg-slate-900'>{comic.title}</h3>
        <Image src={comic.img} alt={comic.alt} width={comic.width} height={comic.height} />
      </a>
    </Link>
  )
}
