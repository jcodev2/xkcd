import Comic from 'components/Comic'
import Layout from 'components/Layout'
import fs from 'fs'

const layoutProps = {
  title: 'Home - Comics',
  description: 'Home page for the Comics site',
  keywords: 'comics, home'
}

export default function HomePage({ latestComics }) {
  return (
    <Layout {...layoutProps}>
      <h1>Best comics here!</h1>

      <section className='comics'>
        {latestComics.map((comic) => {
          const parsedComic = JSON.parse(comic)
          const { id, title, img, alt } = parsedComic

          return <Comic key={id} id={id} title={title} img={img} alt={alt} />
        })}
      </section>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const files = fs.readdirSync('./comics')
  const lastestComicsFiles = files.slice(-20, files.length)

  const promisesReadFiles = lastestComicsFiles.map((file) => {
    const content = fs.readFileSync(`./comics/${file}`, 'utf8')
    return JSON.parse(content)
  })
  const latestComics = await Promise.all(promisesReadFiles)

  return {
    props: {
      latestComics
    }
  }
}
