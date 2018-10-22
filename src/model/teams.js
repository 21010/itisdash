const teams = {
    teams: [
        {
            id: 'SGP01',
            name: 'Team 1',
            short: 'TE1',
            category: 'FD'
        },
        {
            id: 'SGP02',
            name: 'Team 2',
            short: 'T#2',
            category: 'FD'
        },
        {
            id: 'SGP03',
            name: 'Team 3',
            short: 'TE3',
            category: 'SD'
        }
    ],
    
    getById(id) {
        return teams.teams.filter(team => team.id === id)
    },
    getByName(name) {
        return teams.teams.filter(team => team.name === name)
    },
    getByShort(short) {
        return teams.teams.filter(team => team.short === short)
    },
    getByCategory(category) {
        return teams.teams.filter(team => team.category === category)
    }

}

export default teams