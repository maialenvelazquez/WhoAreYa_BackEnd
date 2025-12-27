const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const fetch = require('node-fetch');

const genericScraper = async(inputFile, outputDir, buildUrl, extension) => {
    try {
        await fsPromises.mkdir(outputDir, {recursive:true});

        const content = await fsPromises.readFile(inputFile, "utf8");
        const items = content.split("\n");

        for (const raw of items) {
            const clean = raw.trim();
            if(!clean) continue;
            const url = buildUrl(clean);
            const filePath = path.join(outputDir, `${clean}${extension}`);

            try{
                const res = await fetch(url);
                if (res.ok) {
                    const dest = fs.createWriteStream(filePath);
                    res.body.pipe(dest);
                    console.log(`✅ ${clean} deskargatuta.`);
                }else{
                    console.log(`❌ Ez da aurkitu: ${clean} (Status: ${res.status})`);
                }
            }catch (err) {
                console.error(`Errorea ${clean} deskargatzerakoan`, err);
            }
        }
    }catch(err) {
        console.error(err);
    }

};

const scrapeLeagues = () => {
    const input = path.join(__dirname, "leagues.txt");
    const output = path.join(__dirname, "../public/images/leagues/");
    const buildUrl = (id) => `https://playfootball.games/media/competitions/${id}.png`;
    return genericScraper(input, output, buildUrl, ".png");
};

const scrapeTeams = () => {
    const input = path.join(__dirname, "../teamIDs.txt");
    const output = path.join(__dirname, "../public/images/teams/");
    const buildUrl = (id) => { const folder = parseInt(id) % 32;
    return `https://cdn.sportmonks.com/images/soccer/teams/${folder}/${id}.png`; };
    return genericScraper(input, output, buildUrl, ".png");
};

const scrapeFlags = () => {
    const input = path.join(__dirname, "../nationalities.txt");
    const output = path.join(__dirname, "../public/images/nations/");
    const buildUrl = (nation) => `https://playfootball.games/media/nations/${encodeURIComponent(nation)}.svg`;
    return genericScraper(input, output, buildUrl, ".svg");
};

(async () => {
    console.log("Scraping hasiera...");
    await scrapeLeagues();
    await scrapeTeams();
    await scrapeFlags();
    console.log("🎉 Scraping guztiak amaitu dira!");
})();