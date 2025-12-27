const fs = require('fs');
const players = require('../FullPlayers.json');
const leaguesMap = new Map();

players.forEach(player => {
                  if(!player.leagueId || !player.leagueName || !player.leagueCode) return;

                  if(!leaguesMap.has(player.leagueId)){
                    leaguesMap.set(player.leagueId, {
                        id: player.leagueId,
                        name: player.leagueName,
                        code: player.leagueCode,
                        country: player.nationality,
                        flag: `/images/nations/${player.nationality}.svg`
                    });
                  }

});

const leagues = Array.from(leaguesMap.values());
fs.writeFileSync('../leagues.json', JSON.stringify(leagues,null,2));

const teamsMap = new Map();

players.forEach(player => {
        if (!player.teamId || !player.teamName) return;
        if(!teamsMap.has(player.teamId)) {
            teamsMap.set(player.teamId, {
                id: player.teamId,
                name: player.teamName,
                leagueId: player.leagueId,
                country: player.nationality,
                stadium: null,
                logo: `/images/teams/${player.teamId}.png`
            });
        }
});

const teams = Array.from(teamsMap.values());
fs.writeFileSync('../teams.json', JSON.stringify(teams,null,2));

console.log("leagues.json eta teams.json sortuta")
