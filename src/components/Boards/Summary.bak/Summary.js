import React from 'react'

import './Summary.css'

class Summary extends React.Component {
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
            // closedUnder30: { label: 'KPI 30', className: 'kpi closed30' },
            // closedUnder60: { label: 'KPI 60', className: 'kpi closed60' }
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

export default Summary

function Table(props) {
    if (props.data) {
        return (
            <div>
                <table id={ props.rawData.teamID }>
                    <Headers headers={ Object.keys(props.data) } data={ Object.keys(props.rawData) } filters={ props.filters } />
                    <Body body={ props.data } data={ props.rawData } filters={ props.filters } />
                </table>
            </div>
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
    return (
        <tbody>
            <tr>
                { renderTd(props.body, props.filters) }
            </tr>
        </tbody>
    )
}

function renderTd(data, filters) {
    const tds = []
    for (const prop in data) {
        tds.push(<td className={ filters[ prop ].className } key={ prop }>
            {renderSpanValue(prop, data[ prop ])}
        </td>)
    }
    return tds
}

function renderSpanValue(prop, value) {
    let span
    switch (prop) {
        case 'sla':
            span = <span className={ value >= 96 ? 'sla-meet' : 'sla-missed' }>{value} %</span>
            break
        default:
            span = <span>{value}</span>
    }
    return span
}