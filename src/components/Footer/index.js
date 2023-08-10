import {FiInstagram} from 'react-icons/fi'
import {VscGithubAlt} from 'react-icons/vsc'
import {FaTwitter} from 'react-icons/fa'
import './index.css'

export default function Footer() {
  return (
    <div className="footer">
      <h1 className="covid-india-a">
        COVID19<span className="header-span">INDIA</span>
      </h1>
      <p className="tagline">
        we stand with everyone fighting on the front lines
      </p>
      <div className="icon-container">
        <VscGithubAlt className="icon" />
        <FiInstagram className="icon" />
        <FaTwitter className="icon" />
      </div>
    </div>
  )
}
