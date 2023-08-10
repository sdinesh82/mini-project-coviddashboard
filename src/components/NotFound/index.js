import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found">
    <img
      src="https://res.cloudinary.com/dqgbmdtmt/image/upload/v1691601101/Group_7485_mwcvtv.png"
      alt="not found"
    />
    <h1 className="not-found-h">Page Not Found</h1>
    <p className="not-found-p">
      we are sorry, the page you requested could not be found <br /> Please go
      back to the homepage
    </p>
    <Link className="link" to="/">
      <button type="button" className="button">
        Home
      </button>
    </Link>
  </div>
)
export default NotFound
