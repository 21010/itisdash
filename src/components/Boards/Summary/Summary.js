import React from 'react'
import PropTypes from 'prop-types'
import './Summary.css'

class Summary extends React.Component {
    renderTable = (data, filters) => {
        const result = {}
        for (const filter in filters) {
            if (data[ filter ] !== undefined) result[ filter ] = data[ filter ]
        }
        return <Table key={ data.teamID } rawData={ data } data={ result } filters={ filters } />
    }

    renderSection = (section, items, key) => {
        return (
            <section key ={ key } className="summary-section">
                <h3>{section.title}</h3>
                { section.data[ 0 ] !== undefined ? section.data.map(item => this.renderTable(item, items)) : 'Loading data...' }       
            </section>
        )
    }
    
    renderSections = (sections, items) => {
        return (
            sections.map((section, key) => this.renderSection(section, items, key))
        )
    }

    render() {
        return (
            <div className="summary">
                { this.renderSections(this.props.data.sections, this.props.data.items) } 
            </div>
        )
    }
}

export default Summary

Summary.propTypes = {
    data: PropTypes.object
}

function Table(props) {
        return (
            <div>
                <table id={ props.rawData.teamID }>
                    <Headers headers={ Object.keys(props.data) } data={ Object.keys(props.rawData) } filters={ props.filters } />
                    <Body body={ props.data } data={ props.rawData } filters={ props.filters } />
                </table>
            </div>
        )
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