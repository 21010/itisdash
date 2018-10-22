const customServiceWorker = () => {
    indicateConnectionStatus()
}

export default customServiceWorker

function indicateConnectionStatus() {
    window.addEventListener('online',  () => { 
        popUpMsg('Connection established', 'success')
    })
    window.addEventListener('offline', () => { 
        popUpMsg('Connection Lost', 'error')
    })
}

function popUpMsg(message, status) {
    const popUp = document.querySelector('#pop-up')
    popUp.innerHTML = message
    popUp.className = status
    setTimeout(() => {popUp.className = 'hidden'}, 5000)
}