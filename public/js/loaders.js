// public/js/loaders.js

export { fetchJSON, fetchPlayer, fetchSolution };

// Zure APIaren helbidea
const API_URL = '/api';

/**
 * Funtzio nagusia fitxategiak edo API datuak kargatzeko.
 * main.js-k 'json/fullplayers25.json' eta 'json/solution25.json' eskatzen ditu,
 * guk interzeptatu eta APIra bideratzen dugu.
 */
async function fetchJSON(what) {

    // 1. KASUA: Jokalari guztiak kargatu
    if (what.includes('fullplayers')) {
        try {
            console.log("📡 Jokalariak API-tik kargatzen...");
            // ?limit=3000 jartzen dugu guztiak ekartzeko
            const response = await fetch(`${API_URL}/players?limit=3000`);

            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

            const json = await response.json();

            // APIak { success: true, data: [...] } itzultzen du.
            // main.js-k zuzenean array-a behar du.
            return json.data;
        } catch (err) {
            console.error("Errorea jokalariak kargatzean:", err);
            return []; // Array hutsa itzuli errorea badago
        }
    }

    // 2. KASUA: Eguneko Soluzioa kargatu
    else if (what.includes('solution')) {
        try {
            console.log("📡 Soluzioa kalkulatzen...");

            // Egunen kalkulua
            let baseDate = new Date("2025-10-01");
            let today = new Date();
            let diffTime = Math.abs(today - baseDate);
            let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            // APIari soluzioa eskatu
            const response = await fetch(`${API_URL}/players/solution/${diffDays}`);

            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

            const json = await response.json();

            // GAKOA HEMEN DAGO:
            // 1. APIak objektu konplexu bat dakar: { success: true, data: { id: 123, name: "..." } }
            // 2. main.js-k IDen array bat espero du ([123, 456...]) bertatik bat aukeratzeko.
            // 3. Guk array bat itzultzen dugu gure ID bakarrarekin.
            //    Honela, main.js-k kalkulua egiten duenean (index % 1), beti gure IDa hartuko du.

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

/**
 * Jokalari zehatz bat bilatzeko (adibidez autokonpletatuan klik egitean)
 */
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

/**
 * Soluzioa zuzenean lortzeko (beste logika batzuetarako)
 */
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