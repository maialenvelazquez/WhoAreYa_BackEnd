export { fetchJSON, fetchPlayer, fetchSolution };

// Zure APIaren helbidea
const API_URL = '/api';


async function fetchJSON(what) {

    // 1. KASUA: Jokalari guztiak kargatu
    if (what.includes('fullplayers')) {
        try {
            console.log("📡 Jokalariak API-tik kargatzen...");
            // ?limit=3000 jartzen dugu guztiak ekartzeko
            const response = await fetch(`${API_URL}/players?limit=3000`);

            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

            const json = await response.json();


            return json.data;
        } catch (err) {
            console.error("Errorea jokalariak kargatzean:", err);
            return [];
        }
    }

    // 2. KASUA: Eguneko Soluzioa kargatu
    else if (what.includes('solution')) {
        try {
            console.log("📡 Soluzioa kalkulatzen...");


            let baseDate = new Date("2025-10-01");
            let today = new Date();
            let diffTime = Math.abs(today - baseDate);
            let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));


            const response = await fetch(`${API_URL}/players/solution/${diffDays}`);

            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

            const json = await response.json();


            if (json.data && json.data.id) {
                return [json.data.id];
            } else {
                // Badaezpada, egitura desberdina bada
                return [json.id];
            }

        } catch (err) {
            console.error(" Errorea soluzioa kargatzean:", err);
            return [];
        }
    }

    // 3. KASUA: Beste edozein fitxategi (arraroa litzateke hemen sartzea)
    const response = await fetch(what);
    return await response.json();
}

async function fetchPlayer(playerId) {
    try {
        const response = await fetch(`${API_URL}/players/${playerId}`);
        const json = await response.json();
        return json.data || json;
    } catch (err) {
        console.error("Errorea fetchPlayer:", err);
        return null;
    }
}

async function fetchSolution(gameNumber) {
    try {
        const response = await fetch(`${API_URL}/players/solution/${gameNumber}`);
        const json = await response.json();
        return json.data || json;
    } catch (err) {
        console.error("Errorea fetchSolution:", err);
        return null;
    }
}