import {Component} from 'react'
import './index.css'

class StateTotalData extends Component {
  state = {
    confirmedData: {},
    activeData: {},
    recoveredData: {},
    deceasedData: {},
  }

  componentDidMount() {
    this.getEachState()
  }

  getEachState = async () => {
    const {eachStateTotalData} = this.props

    const totalConfirmed = eachStateTotalData.confirmed
    const totalRecovered = eachStateTotalData.recovered

    const totalDeceased = eachStateTotalData.deceased

    const totalActive = totalConfirmed - totalRecovered - totalDeceased

    const confirmedData = {
      name: 'Confirmed',
      logo:
        'https://res.cloudinary.com/dqgbmdtmt/image/upload/v1686902810/Group_uxppra.svg',
      value: totalConfirmed,
    }

    const activeData = {
      name: 'Active',
      logo:
        'https://res.cloudinary.com/dqgbmdtmt/image/upload/v1686903260/protection_1_vslzng.svg',
      value: totalActive,
    }

    const recoveredData = {
      name: 'Recovered',
      logo:
        'https://res.cloudinary.com/dqgbmdtmt/image/upload/v1686903391/recovered_1_ne5d1v.svg',
      value: totalRecovered,
    }
    const deceasedData = {
      name: 'Deceased',
      logo:
        'https://res.cloudinary.com/dqgbmdtmt/image/upload/v1686903441/breathing_1_uhaowc.svg',
      value: totalDeceased,
    }

    this.setState({
      confirmedData,
      activeData,
      recoveredData,
      deceasedData,
    })
  }

  onGetTotal = value => {
    const {onGetCategory} = this.props
    onGetCategory(value)
  }

  render() {
    const {confirmedData, activeData, recoveredData, deceasedData} = this.state
    const {active} = this.props
    const itsactiveonload = active ? 'confirmed-block' : ''

    return (
      <ul className="state-result-ul ">
        <li
          className={`state-category ${confirmedData.name} ${itsactiveonload} `}
          tabIndex="-1"
          key={confirmedData.name}
          value={confirmedData.name}
          onClick={() => this.onGetTotal(confirmedData.name)}
        >
          <p className="title red">{confirmedData.name}</p>
          <img
            src={confirmedData.logo}
            alt="state specific confirmed cases pic"
            className="state-stats-icon"
          />
          <p className="title-s red">{confirmedData.value}</p>
        </li>
        <li
          className={`state-category ${activeData.name}`}
          tabIndex="-1"
          key={activeData.name}
          value={activeData.name}
          onClick={() => this.onGetTotal(activeData.name)}
        >
          <p className="title blue">{activeData.name}</p>
          <img
            src={activeData.logo}
            alt="state specific active cases pic"
            className="state-stats-icon"
          />
          <p className="title-s blue">{activeData.value}</p>
        </li>
        <li
          className={`state-category ${recoveredData.name}`}
          tabIndex="-1"
          key={recoveredData.name}
          value={recoveredData.name}
          onClick={() => this.onGetTotal(recoveredData.name)}
        >
          <p className="title green">{recoveredData.name}</p>
          <img
            src={recoveredData.logo}
            alt="state specific recovered cases pic"
            className="state-stats-icon"
          />
          <p className="title-s green">{recoveredData.value}</p>
        </li>
        <li
          className={`state-category ${deceasedData.name}`}
          tabIndex="-1"
          key={deceasedData.name}
          value={deceasedData.name}
          onClick={() => this.onGetTotal(deceasedData.name)}
        >
          <p className="title ash">{deceasedData.name}</p>
          <img
            src={deceasedData.logo}
            alt="state specific deceased cases pic"
            className="state-stats-icon"
          />
          <p className="title-s ash">{deceasedData.value}</p>
        </li>
      </ul>
    )
  }
}
export default StateTotalData
