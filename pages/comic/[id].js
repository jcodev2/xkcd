import { readdirSync, stat } from 'fs'
import { readFile } from 'fs/promises'
import Link from 'next/link'
import Layout from '../../components/Layout'

export default function Comic({ comic, hasPrev, hasNext, prevId, nextId }) {
  const { title, img, alt, year, month, day } = comic
  const monthWithZero = month < 10 ? `0${month}` : month
  const dayWithZero = day < 10 ? `0${day}` : day

  return (
    <Layout>
      <article className='comic-page'>
        <h1>{title}</h1>
        <img src={img} alt={alt} />
        <p>{alt}</p>
        <p>
          {year}/{monthWithZero}/{dayWithZero}
        </p>

        <div className='comic-navigation'>
          {hasPrev && (
            <Link href={`/comic/${prevId}`}>
              <a>Previous</a>
            </Link>
          )}
          {hasNext && (
            <Link href={`/comic/${nextId}`}>
              <a>Next</a>
            </Link>
          )}
        </div>
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const files = readdirSync('comics')
  const paths = files.map((file) => {
    const id = file.replace('.json', '')
    return { params: { id } }
  })

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const { id } = params
  const content = await readFile(`./comics/${id}.json`, 'utf8')
  const comic = JSON.parse(content)
  const parsedComic = JSON.parse(comic)

  const idNumer = +id
  const prevId = idNumer - 1
  const nextId = idNumer + 1

  // check if previous comic exists
  const hasPrev = await new Promise((resolve) => {
    stat(`./comics/${prevId}.json`, (err) => {
      if (err) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
  // check if next comic exists
  const hasNext = await new Promise((resolve) => {
    stat(`./comics/${nextId}.json`, (err) => {
      if (err) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })

  return {
    props: {
      comic: parsedComic,
      hasPrev,
      hasNext,
      prevId,
      nextId
    }
  }
}
