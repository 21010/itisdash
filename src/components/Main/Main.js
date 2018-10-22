import React from 'react'

import './Main.css'

function Main(props) {
    return (
        <main id="app-main">
            { props.children }
        </main>
    )
}

export default Main