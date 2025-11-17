const pup = require ('puppeteer');

const url = 'https://www.gov.br/saude/pt-br/assuntos/noticias';

(async () => {
    const browser = await pup.launch({headless: false});
    const page = await browser.newPage();


    await page.goto(url);

    await page.waitForNetworkIdle();

    const links = await page.$$eval('.tileHeadline > a', el => el.map(link => link.href));
    
    for (const link of links) {
        await page.goto(link);


        const titulo = await page.$eval('.documentFirstHeading', el => el.innerText);
        const data = await page.$eval('.documentPublished > span.value', el => el.innerText);
        const imagem = await page.$$eval('#media > img', el => el.map(link => link.src));
    

        const objeto = {
            titulo: titulo,
            data: data,
            url: link,
            imagem: imagem
        };

        console.log(objeto);
    }

    await browser.close();
})();