const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const fetch = require('node-fetch');


const downloadLeagues = async () => {

    const writepath = path.join(__dirname, '../public/images/leagues/');

    try {

        await fsPromises.mkdir(writepath, { recursive: true });

        const content = await fsPromises.readFile("leagues.txt", "utf8");

        const data = content.split("\n");

        data.forEach((elem, idx) => {
            const cleanElem = elem.trim();
            if (!cleanElem) return;

            const url = `https://playfootball.games/media/competitions/${cleanElem}.png`;

            fetch(url)
                .then(res => {

                    if (res.status === 200) {
                        const dest = fs.createWriteStream(path.join(writepath, `${cleanElem}.png`));
                        res.body.pipe(dest);
                        console.log(`✅ ${cleanElem}.png gordeta.`);
                    } else {
                        console.log(`❌ Errorea: status: ${res.status} line: ${idx} elem: ${cleanElem} not found`);
                    }
                })
                .catch(err => console.log('Fetch errorea:', err));
        });

    } catch (err) {
        console.error('Fitxategi errorea:', err);
    }
};

downloadLeagues();