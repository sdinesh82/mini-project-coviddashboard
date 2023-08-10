import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import {BiChevronRightSquare} from 'react-icons/bi'
import Header from '../Header'
import TotalStateDetails from '../TotalStateDetails'
import Footer from '../Footer'
import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class Home extends Component {
  state = {
    isLoading: true,
    totalActiveCases: 0,
    totalConfirmedCases: 0,
    totalRecoveredCases: 0,
    totalDeceasedCases: 0,
    statesInfo: [],
    search: '',
    filteredSearchList: [],
  }

  componentDidMount() {
    this.getTotalData()
  }

  getTotalData = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      let nationalWideConfirmedCases = 0
      let nationalWideRecoveredCases = 0
      let nationalWideDeceasedCases = 0
      let nationalWideActiveCases = 0

      statesList.forEach(state => {
        if (data[state.state_code]) {
          const {total} = data[state.state_code]
          nationalWideConfirmedCases += total.confirmed ? total.confirmed : 0
          nationalWideRecoveredCases += total.recovered ? total.recovered : 0
          nationalWideDeceasedCases += total.deceased ? total.deceased : 0
        }
      })
      nationalWideActiveCases +=
        nationalWideConfirmedCases -
        (nationalWideRecoveredCases + nationalWideDeceasedCases)

      const states = statesList.map(each => ({
        stateName: each.state_name,
        stateCode: each.state_code,
        confirmed: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].total.confirmed),
        recovered: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].total.recovered),
        deceased: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].total.deceased),
        active: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].total.active),
        other: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].total.other),
        population: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].meta.population),
      }))

      this.setState({
        totalActiveCases: nationalWideActiveCases,
        totalRecoveredCases: nationalWideRecoveredCases,
        totalDeceasedCases: nationalWideDeceasedCases,
        totalConfirmedCases: nationalWideConfirmedCases,
        isLoading: false,
        statesInfo: states,
      })
    }
  }

  getSearchResult = event => {
    const searchItem = event.target.value
    const searchResult = statesList.filter(data =>
      data.state_name.toLowerCase().includes(searchItem.toLowerCase()),
    )

    return this.setState({
      search: event.target.value,
      filteredSearchList: searchResult,
    })
  }

  showSearchList = () => {
    const {filteredSearchList} = this.state
    console.log(filteredSearchList)
    return (
      <ul className="filter-ui">
        {filteredSearchList.map(each => (
          <li className="filtered-search-li">
            <p className="each-state-name">{each.state_name}</p>
            <Link className="link-home" to={`/state/${each.state_code}`}>
              <button type="button" className="search-btn">
                <p>{each.state_code}</p>
                <BiChevronRightSquare />
              </button>
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  getSearchBar = () => {
    const {filteredSearchList, search} = this.state
    const showSearchList =
      filteredSearchList.length === 0 ? '' : this.showSearchList()
    return (
      <div className="search-div">
        <div className="search-di">
          <BsSearch className="search-icon" />
          <input
            type="search"
            placeholder="Enter the State"
            className="search-input"
            onChange={this.getSearchResult}
          />
        </div>
        {search.length > 0 ? showSearchList : ''}
      </div>
    )
  }

  getTotalNational = () => {
    const {
      totalActiveCases,
      totalConfirmedCases,
      totalDeceasedCases,
      totalRecoveredCases,
    } = this.state
    return (
      <div className="national-wide">
        <div className="national-wide-div">
          <p className="confirmed">Confirmed</p>
          <img
            src="https://res.cloudinary.com/dqgbmdtmt/image/upload/v1686902810/Group_uxppra.svg"
            alt="conformed"
            className="national-wide-img"
          />
          <p className="confirmed size">{totalConfirmedCases}</p>
        </div>
        <div className="national-wide-div">
          <p className="active">Active</p>
          <img
            src="https://res.cloudinary.com/dqgbmdtmt/image/upload/v1686903260/protection_1_vslzng.svg"
            alt="active"
            className="national-wide-img"
          />
          <p className="active size">{totalActiveCases}</p>
        </div>
        <div className="national-wide-div">
          <p className="recovered">Recovered</p>
          <img
            src="https://res.cloudinary.com/dqgbmdtmt/image/upload/v1686903391/recovered_1_ne5d1v.svg"
            alt="recovered"
            className="national-wide-img"
          />
          <p className="recovered size">{totalRecoveredCases}</p>
        </div>
        <div className="national-wide-div">
          <p className="deceased">Deceased</p>
          <img
            src="https://res.cloudinary.com/dqgbmdtmt/image/upload/v1686903441/breathing_1_uhaowc.svg"
            alt="deceased"
            className="national-wide-img"
          />
          <p className="deceased size">{totalDeceasedCases}</p>
        </div>
      </div>
    )
  }

  decClick = () => {
    const {statesInfo} = this.state
    const sortedList = statesInfo.sort((a, b) => {
      const x = a.stateName.toUpperCase()
      const y = b.stateName.toUpperCase()
      return x > y ? 1 : -1
    })
    this.setState({statesInfo: sortedList})
  }

  incClick = () => {
    const {statesInfo} = this.state
    const sortedList = statesInfo.sort((a, b) => {
      const x = a.stateName.toUpperCase()
      const y = b.stateName.toUpperCase()
      return x < y ? 1 : -1
    })
    this.setState({statesInfo: sortedList})
  }

  getTotalStateWise = () => {
    const {statesInfo} = this.state
    return (
      <div className="din">
        <div className="states-table">
          <div className="table-div">
            <div className="table-names">
              <p>States/UT</p>
              <button
                className="order-btn"
                type="button"
                onClick={this.decClick}
              >
                <FcGenericSortingAsc className="order-icon" />
              </button>
              <button
                className="order-btn"
                type="button"
                onClick={this.incClick}
              >
                <FcGenericSortingDesc className="order-icon" />
              </button>
            </div>
            <div className="table-para">
              <p>Confirmed</p>
            </div>
            <div className="table-para">
              <p>Active</p>
            </div>
            <div className="table-para">
              <p>Recovered</p>
            </div>
            <div className="table-para">
              <p>Deceased</p>
            </div>
            <div className="table-para">
              <p>Population</p>
            </div>
          </div>
          <hr />
          <ul className="state">
            {statesInfo.map(each => (
              <TotalStateDetails key={each.stateCode} details={each} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {isLoading, statesInfo} = this.state
    console.log(isLoading)
    console.log(statesInfo)
    return (
      <div className="home-bg-container">
        <Header />
        <div className="home-second">
          {this.getSearchBar()}
          {this.getTotalNational()}
        </div>
        {this.getTotalStateWise()}
        <Footer />
      </div>
    )
  }
}
export default Home
