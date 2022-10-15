import Navbar from './svg/ActiveLink'

const Header = () => {
  return (
    <header className='header'>
      <div className='header-box'>
        <div className='logo'>
          <h1>xkcd 🗞️</h1>
        </div>

        <Navbar />
      </div>
    </header>
  )
}

export default Header
