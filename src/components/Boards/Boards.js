import React from 'react'
import PropTypes from 'prop-types'

import './Boards.css'

import Board from './Board/Board'

import Summary from './Summary/Summary'
import Kpi from './Kpi/Kpi'
import Cards from './Cards/Cards'

class Boards extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            active: 0, 
            total: props.config.boards.length 
        }
    }
    
    componentDidMount() {
        setInterval(() => { 
            this.setState({ 
                active: this.state.active === this.state.total - 1 ? 0 : this.state.active + 1 
            })
        }, 20000)
    }
    
    slideShow(slides) {
        return slides[ this.state.active ]
    }

    generateBoards(slides) {
        return slides.map(slide => {
            const summaryData = prepareBoardData(this.props.data.summary, slide)
            const config = this.props.config
            
            let board
            switch (slide.type) {
                case 'summary':
                    board = <Board title={ slide.title } config={ config } data={ summaryData }><Summary /></Board>
                    break
                case 'kpi':
                    board = <Board title={ slide.title } config={ config } data={ summaryData } ><Kpi /></Board>
                    break
                case 'cards':
                    board = <Board title={ slide.title } config={ config } data={ summaryData } ><Cards /></Board>
                    break
                default:
                    board = false
            }
            return board
        })
    }
    
    render() {
        const boards = this.generateBoards(this.props.config.boards)
        return (
            <div className="boards">
                {this.slideShow(boards)}
            </div>
        )
    }
}

export default Boards

Boards.propTypes = {
    config: PropTypes.object,
    data: PropTypes.object
}

function prepareBoardData(data = [], board = {}) {
    return { 
        title: board.title, 
        type: board.type,
        items: board.items,
        sections: board.sections.map(section => {
            return {
                title: section.title,
                data: section.teams.map(teamName => data.filter(item => item.teamName === teamName)[ 0 ])
            }
        })
    }
}