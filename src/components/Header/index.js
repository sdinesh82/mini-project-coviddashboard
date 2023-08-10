import {Link} from 'react-router-dom'
import './index.css'

export default function Header() {
  return (
    <div className="header-bg-container">
      <h1 className="covid-india">
        COVID19<span className="header-span">INDIA</span>
      </h1>
      <ul className="header-li">
        <Link className="link-s" to="/">
          <li>Home</li>
        </Link>
        <Link className="link-s" to="/about">
          <li>About</li>
        </Link>
      </ul>
    </div>
  )
}
