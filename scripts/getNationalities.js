const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '../FullPlayers.json');
const outputFile = path.join(__dirname, '../nationalities.txt');

try {
    if (!fs.existsSync(inputFile)) {
        console.error("❌ Ez da FullPlayers.json aurkitu proiektuaren erroan.");
        process.exit(1);
    }

    const rawData = fs.readFileSync(inputFile, 'utf8');
    const players = JSON.parse(rawData);

    const nationalities = [...new Set(players.map(p => p.nationality))];
    nationalities.sort();
    fs.writeFileSync(outputFile, nationalities.join('\n'));

    console.log(`✅ nationalities.txt sortu da ${nationalities.length} herrialderekin.`);

} catch (error) {
    console.error("Errorea:", error);
}