import {Component} from 'react'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

class About extends Component {
  state = {faqList: []}

  componentDidMount() {
    this.getTotalFaq()
  }

  getTotalFaq = async () => {
    const url = 'https://apis.ccbp.in/covid19-faqs'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    const updated = data.faq.map(each => ({
      question: each.question,
      answer: each.answer,
    }))
    this.setState({faqList: updated})
  }

  render() {
    const {faqList} = this.state
    return (
      <div className="about-bg-container">
        <Header />
        <ul className="about-ul">
          <h1 className="about-main-head">About</h1>
          <p className="about-main-para">Last updated on march 28th 2021.</p>
          <p className="about-main">
            Covid-19 vaccines be ready for distribution
          </p>
          {faqList.map(each => (
            <li>
              <p className="about-main-para">{each.question}</p>
              <p className="about-main-para-s">{each.answer}</p>
            </li>
          ))}
        </ul>
        <Footer />
      </div>
    )
  }
}

export default About
