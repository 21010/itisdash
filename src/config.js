const config = {
    title: 'dashboard',
    port: 3110,

    api: {
        remedy: {
            uri: 'http://localhost:3111/api',
            method: 'POST',
            token: 'LVm=b@:Nkd0^r?^Xgrv|`VPSrD(*',
            teams: [
                'Team 1',
                'Team 2',
                'Team 3'
            ]
        }
    },
    boards: [
        {
            title: false,
            type: 'summary',
            items: {
                team: { label: 'TEAM', className: 'teamName' },
                queue: { label: 'QUEUE', className: 'queue' },
                unassigned: { label: 'UNASSIGNED', className: 'unassigned' },
                highCriticalPriority: { label: 'HIGH/CRITICAL', className: 'highCriticalPriority' },
                dueToBreach: { label: 'DUE TO BREACH', className: 'dueToBreach' },
                breachedResolution: { label: 'BREACHED', className: 'breached' },
                sla: { label: 'SLA', className: 'kpi sla' }
            },
            sections: [
                {
                    title: 'Teams Summary',
                    teams: [
                        'Team 1',
                        'Team 2'
                    ]
                },
                {
                    title: 'Team 3 Summary',
                    teams: [
                        'Team 3'
                    ]
                }
            ]
        },
        {
            title: 'Teams Summary',
            type: 'cards',
            items: {
                team: { label: 'TEAM', className: 'teamName' },
                queue: { label: 'QUEUE', className: 'queue' },
                unassigned: { label: 'UNASSIGNED', className: 'unassigned' },
                highCriticalPriority: { label: 'HIGH/CRITICAL', className: 'highCriticalPriority' },
                dueToBreach: { label: 'DUE TO BREACH', className: 'dueToBreach' },
                breachedResolution: { label: 'BREACHED', className: 'breached' },
                sla: { label: 'SLA', className: 'kpi sla' },
                // closedUnder30: { label: 'KPI 30', className: 'kpi closed30' },
                // closedUnder60: { label: 'KPI 60', className: 'kpi closed60' }
            },
            sections: [
                {
                    title: 'Team 1 Stats',
                    teams: [
                        'Team 1'
                    ]
                },
                {
                    title: 'Team 2 Stats',
                    teams: [
                        'Team 2'
                    ]
                },
                {
                    title: 'Team 3 Stats',
                    teams: [
                        'Team 3'
                    ]
                }
            ]
        }
    ]
}

export default config