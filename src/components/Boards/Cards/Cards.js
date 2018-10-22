import React from 'react'
import PropTypes from 'prop-types'
import './Cards.css'

class Cards extends React.Component {
    renderCard = (data, filters) => {
        const result = {}
        for (const filter in filters) {
            if (data[ filter ] !== undefined) result[ filter ] = data[ filter ]
        }
        return <Card key={ data.teamID } rawData={ data } data={ result } filters={ filters } />
    }

    renderSection = (section, items, key) => {
        return (
            <section key ={ key } className="card">
                <h3>{section.title}</h3>
                { section.data[ 0 ] !== undefined ? section.data.map(item => this.renderCard(item, items)) : 'Loading data...' }       
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
            <div className="cards">
                { this.renderSections(this.props.data.sections, this.props.data.items) } 
            </div>
        )
    }
}

export default Cards

Cards.propTypes = {
    data: PropTypes.object
}

function Card(props) {
    console.log(props.data)
    return (
        <div id={ props.rawData.teamID } className="card-body">
            <SlaGauge id={ props.data.name } label="SLA" value={ props.data.sla } />
            <Boxes>
                <Box label="Queue" value={ props.data.queue } />
                <Box label="Unassigned" value={ props.data.unassigned } />
                <Box label="High/Critical" value={ props.data.highCriticalPriority } />
                <Box label="Due to Breach" value={ props.data.dueToBreach } />
                <Box label="Breached" value={ props.data.breachedResolution } />
            </Boxes>
        </div>
    )
}

Card.propTypes = {
    rawData: PropTypes.object,
    data: PropTypes.object
}

function SlaGauge(props) {
    return (
        <div id={ props.id } className="gauge">
            <div className="mask">
                <div className={ [ 'semi-circle ', props.value > 96 ? 'green' : 'red' ].join(' ') }></div>
                <div className="semi-circle--mask" style={ { transform: 'rotate(' + ((Number(props.value)/100)*180) + 'deg) translate3d(0,0,0)' } }></div>
            </div>
            <span className="gauge-label">{ props.label }</span>
            <span className="gauge-value">{ props.value + '%' }</span>
        </div>
    )
}

function Boxes(props) {
    return (
        <div className="card-boxes">
            {props.children}
        </div>
    )
}

function Box(props) {
    return (
        <dl className="card-box">
            <dt>{props.label}</dt>
            <dd>{props.value}</dd>
        </dl>
    )
}