import Link from 'next/link'

const Comic = ({ id, title, img, alt }) => {
  return (
    <article className='comic'>
      <h2>{title}</h2>
      <Link href={`/comic/${id}`}>
        <a>
          <img src={img} alt={alt} />
        </a>
      </Link>
    </article>
  )
}

export default Comic
