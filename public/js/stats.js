

export function initState(what, solutionId) {


    let jsonState = localStorage.getItem(what);
    let state;


    if (jsonState) {
        state = JSON.parse(jsonState);
    }


    if (!state) {
        state = {
            guesses: [],
            solution: solutionId
        };

        localStorage.setItem(what, JSON.stringify(state));
    }


    function updateState(guess) {
        state.guesses.push(guess);
        localStorage.setItem(what, JSON.stringify(state));
    }


    return [state, updateState];
}


function successRate (e){
    if (e.totalGames === 0) {
        return 0;
    }


    let wins = e.totalGames - e.gamesFailed;

    return Math.round((wins / e.totalGames) * 100);
}

export let getStats = function(what) {
    let jsonStats = localStorage.getItem(what);

    if (jsonStats) {
        return JSON.parse(jsonStats);
    }

    let newStats = {
        winDistribution: [0,0,0,0,0,0,0,0,0], // 9 posizio
        gamesFailed: 0,
        currentStreak: 0,
        bestStreak: 0,
        totalGames: 0,
        successRate: 0
    };

    localStorage.setItem(what, JSON.stringify(newStats));
    return newStats;
};


export function updateStats(t) {
    gamestats.totalGames++;
    if (t < 8) {
        gamestats.currentStreak++;


        if (gamestats.winDistribution[t + 1] !== undefined) {
            gamestats.winDistribution[t + 1]++;
        }


        if (gamestats.currentStreak > gamestats.bestStreak) {
            gamestats.bestStreak = gamestats.currentStreak;
        }

    } else {
        gamestats.gamesFailed++;


        gamestats.currentStreak = 0;
    }

    gamestats.successRate = successRate(gamestats);


    localStorage.setItem('gameStats', JSON.stringify(gamestats));
}


let gamestats = getStats('gameStats');

