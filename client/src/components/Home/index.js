//class based component

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { spectaclesAll } from '../../store/actions/spectacle_actions'
import { listRows, listAll } from '../../utils/renderAll'

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(spectaclesAll(1))
  }

  renderRepertoire = (spectacles) => {
    if (spectacles.repertoire) {
      const rowsArray = listRows(spectacles.repertoire, 2)
      const showAll = listAll(rowsArray, 'six')
      return showAll
    }
    return null
  }

  render() {
    return (
      <div className='container'>
        <div className='row articles_container'>
          {this.renderRepertoire(this.props.spectacles)}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    spectacles: state.spectacles,
  }
}

export default connect(mapStateToProps)(Home)
