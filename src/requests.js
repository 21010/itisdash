import config from './config'

const requests = {
    remedy: {
        getDataByTeamID(queryName, teamId, callback) {
            const uri = `${ config.api.remedy.uri }/${ queryName }`
            const method = config.api.remedy.method
            const headers = { 
                'Content-Type': 'application/json', 
                'x-access-token': 'LVm=b@:Nkd0^r?^Xgrv|`VPSrD(*' 
            }
            const body = JSON.stringify({ 
                'data': { 
                    'teamId': teamId 
                } 
            })
            return fetch(uri, { method, headers, body } )
                .then(res => res.json())
                .then(response => callback(null, response.response))
                .catch(error => callback(error))
        },

        getDataByTeamName(queryName, teamNames, callback) {
            const uri = `${ config.api.remedy.uri }/${ queryName }`
            const method = config.api.remedy.method
            const headers = { 
                'Content-Type': 'application/json', 
                'x-access-token': 'LVm=b@:Nkd0^r?^Xgrv|`VPSrD(*' 
            }
            const body = JSON.stringify({ 
                'data': { 'teamName': teamNames } 
            })
            return fetch(uri, { method, headers, body } )
                .then(res => res.json())
                .then(response => callback(null, response.response))
                .catch(error => callback(error))
        }
    }

}

export default requests