const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const fetch = require('node-fetch');

const downloadFlags = async () => {
    const readPath = path.join(__dirname, '../nationalities.txt');
    const writePath = path.join(__dirname, '../public/images/nations/');

    try {
        await fsPromises.mkdir(writePath, { recursive: true });

        const content = await fsPromises.readFile(readPath, "utf8");
        const nations = content.split("\n");

        for (const nation of nations) {
            const cleanNation = nation.trim();
            if (!cleanNation) continue;

            const encodedNation = encodeURIComponent(cleanNation);

            const url = `https://playfootball.games/media/nations/${encodedNation}.svg`;

            const filePath = path.join(writePath, `${cleanNation}.svg`);

            try {
                const res = await fetch(url);
                if (res.ok) {
                    const dest = fs.createWriteStream(filePath);
                    res.body.pipe(dest);
                    console.log(`✅ ${cleanNation} deskargatuta.`);
                } else {
                    console.log(`❌ Ez da aurkitu: ${cleanNation} (Status: ${res.status})`);
                }
            } catch (err) {
                console.error(`Errorea ${cleanNation} deskargatzean:`, err);
            }
        }

    } catch (err) {
        console.error('Errore orokorra:', err);
    }
};

downloadFlags();