import './index.css'

const ShowEachDistrictData = props => {
  const {number, name} = props

  return (
    <li className="district-li">
      <p className="district-number">{number}</p>
      <p className="district-name">{name}</p>
    </li>
  )
}

export default ShowEachDistrictData
