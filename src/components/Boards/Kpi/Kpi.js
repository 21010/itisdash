import React from 'react'

import './Kpi.css'

class Kpi extends React.Component {
    constructor(props) {
        super(props)
        
        this.items = {
            team: { label: 'TEAM', className: 'teamName' },
            queue: { label: 'QUEUE', className: 'queue' },
            unassigned: { label: 'UNASSIGNED', className: 'unassigned' },
            highCriticalPriority: { label: 'HIGH/CRITICAL', className: 'highCriticalPriority' },
            dueToBreach: { label: 'DUE TO BREACH', className: 'dueToBreach' },
            breachedResolution: { label: 'BREACHED', className: 'breached' },
            sla: { label: 'SLA', className: 'kpi sla' },
            closedUnder30: { label: 'KPI 30', className: 'kpi closed30' },
            closedUnder60: { label: 'KPI 60', className: 'kpi closed60' }
        }

        this.renderTable = (data, filters) => {
            const result = {}
            for (const filter in filters) {
                if (data[ filter ] !== undefined) { 
                    result[ filter ] = data[ filter ]
                }
            }
            return <Table key={ data.teamID } rawData={ data } data={ result } filters={ filters } />
        }
    }
    render() {
        return (
            <div className="summary">
                { this.props.data[ 0 ] !== undefined ? this.props.data.map(item => this.renderTable(item, this.items)) : 'Loading data...'} 
            </div>
        )
    }
}

export default Kpi

function Table(props) {
    if (props.data) {
        return (
            <table id={ props.rawData.teamID }>
                <Headers headers={ Object.keys(props.data) } data={ Object.keys(props.rawData) } filters={ props.filters } />
                <Body body={ props.data } data={ props.rawData } filters={ props.filters } />
            </table>
        )
    } else {
        return ''
    }

}

function Headers(props) {
    return (
        <thead>
            <tr>
                {props.headers.map(header => <th className={ props.filters[ header ].className } key={ header.replace(' ','-') }>{props.filters[ header ].label}</th>)}
            </tr>
        </thead>
    )
}

function Body(props) {
    const tds = () => {
        const tds = []
        for (const prop in props.body) {
            tds.push(<td className={ props.filters[ prop ].className } key={ prop }><span>{props.body[ prop ]}</span></td>)
        }
        return tds
    }
    return (
        <tbody>
            <tr>
                { tds() }
            </tr>
        </tbody>
    )
}