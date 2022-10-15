import Link from 'next/link'
import { useRouter } from 'next/router'

const menu = [
  {
    name: 'Home',
    href: '/'
  },
  {
    name: 'About',
    href: '/about'
  },
  {
    name: 'Contact',
    href: '/contact'
  }
]

const Navbar = () => {
  const { pathname } = useRouter()

  return (
    <nav className='nav'>
      <ul className='nav-list'>
        <li className='nav-item'>
          {menu.map(({ href, name }) => (
            <Link href={href} key={name}>
              <a className={href === pathname ? 'active' : ''}>{name}</a>
            </Link>
          ))}
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
