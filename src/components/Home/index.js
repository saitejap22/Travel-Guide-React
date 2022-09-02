import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
}

class Home extends Component {
  state = {
    tourList: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getTourItems()
  }

  getTourItems = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const url = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.packages.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
        description: each.description,
      }))
      this.setState({
        apiStatus: apiConstants.success,
        tourList: updatedData,
      })
    }
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
    </div>
  )

  renderTourList = () => {
    const {tourList} = this.state
    return (
      <ul className="tour-container">
        {tourList.map(eachItem => (
          <li className="list-item" key={eachItem.id}>
            <img
              src={eachItem.imageUrl}
              alt={eachItem.name}
              className="tour-image"
            />
            <h4>{eachItem.name}</h4>
            <p>{eachItem.description}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderUI = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.inProgress:
        return this.renderLoader()
      case apiConstants.success:
        return this.renderTourList()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="container">
        <h1 className="heading">Travel Guide</h1>
        {this.renderUI()}
      </div>
    )
  }
}
export default Home
