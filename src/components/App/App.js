import React from 'react'
import PropTypes from 'prop-types'
import requests from '../../requests'
import idb from '../../idb'
import teams from '../../model/teams'

import Layout from '../Layout/Layout'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: {} }
    
    this.handleSummaryDBData = (db) => {
      idb.getAllData(db, (err, res) => {
        if (!err) {
          this.setState({ 
            data: { summary: res[ 0 ] } 
          })
          popUpMsg('Cached data loaded. Fetching new data...', 'info')
        }
      })
      requests.remedy.getDataByTeamName('teamsummary', this.props.config.api.remedy.teams, (remedyError, remedyResponse) => {
        if (remedyError) {
          idb.getAllData(db, (idbError, idbResponse) => {
            setTimeout(this.handleSummaryDBData, 60000, db)
            if (idbError) {
              console.error(idbError)
              this.setState({
                data: { summary: [] }
              })
              popUpMsg('No data available.', 'error')
            } else {
              this.setState({ 
                data: { summary: idbResponse[ 0 ] } 
              })
              popUpMsg('Fetching data failed. Cached data loaded.', 'error')
            }
          })
        } else {
          setTimeout(this.handleSummaryDBData, 600000, db)
          const data = remedyResponse.map(item => { 
            return { 
              team: teams.getById(item.teamID)[ 0 ].short, 
              category: teams.getById(item.teamID)[ 0 ].category,
              sla: sla(item.closed, item.breachedResolution),
              closedUnder30: closedWithin(item.closed, item.closedWithin30),
              closedUnder60: closedWithin(item.closed, item.closedWithin60),
              ...item
            }
          })
          this.setState({  
            data: { summary: data }
          })
          idb.putData(db, data, 'teamID')
          popUpMsg('New data fetched!', 'info')
        }
      })
    }

  }

  componentDidMount() {
    // summary
    const summaryDB = idb.init('summary')
    this.handleSummaryDBData(summaryDB)
  }

  render() {
    return (
        <Layout 
          config={ this.props.config }
          teams={ teams }
          data={ this.state.data }
        />
    )
  }
}

App.propTypes = {
  config: PropTypes.object.isRequired,
  safetyMessage: PropTypes.string
}

App.defaultProps = {
  safetyMessage: 'default safety message'
}

export default App

function sla(closed, breached) {
  if (closed === 0) return 100
  return (100 - ( ( breached * 100 ) / closed )).toFixed(2)
}

function closedWithin(closed, closedWithin) {
  if (closed === 0) return 0
  return ( (closedWithin * 100) / closed ).toFixed(2)
}

function popUpMsg(message, status) {
  const popUp = document.querySelector('#pop-up')
  popUp.innerHTML = message
  popUp.className = status
  setTimeout(() => { 
    popUp.className = 'hidden'
    popUp.innerHTML = ''
  }, 5000)
}