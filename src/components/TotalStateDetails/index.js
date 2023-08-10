import {Link} from 'react-router-dom'
import './index.css'

const TotalStateDetails = props => {
  const {details} = props
  const {
    confirmed,
    deceased,
    population,
    recovered,
    stateCode,
    stateName,
    other,
  } = details
  const active = confirmed - recovered - deceased - other
  return (
    <li>
      <div className="table-di">
        <div className="table-name state-ut">
          <Link className="link" to={`/state/${stateCode}`}>
            <p>{stateName}</p>
          </Link>
        </div>
        <div className="table-para confirmed">
          <p>{confirmed}</p>
        </div>
        <div className="table-para active">
          <p>{active}</p>
        </div>
        <div className="table-para recovered">
          <p>{recovered}</p>
        </div>
        <div className="table-para deceased">
          <p>{deceased}</p>
        </div>
        <div className="table-para population">
          <p>{population}</p>
        </div>
      </div>
    </li>
  )
}
export default TotalStateDetails
