(async () => {
    const PCR = require("puppeteer-chromium-resolver");
    console.log('load pupeteer')
    const option = {
        revision: "",
        detectionPath: "",
        folderName: ".chromium-browser-snapshots",
        defaultHosts: ["https://storage.googleapis.com", "https://npm.taobao.org/mirrors"],
        hosts: [],
        cacheRevisions: 2,
        retry: 3,
        silent: false
    };
    const stats = await PCR(option);
    console.log(stats);
    const browser = await stats.puppeteer.launch({
        headless: false,
        args: ["--no-sandbox",  "--use-fake-ui-for-media-stream"],
        executablePath: stats.executablePath
    }).catch(function(error) {
        console.log(error);
    });
    const page = await browser.newPage();
    await page.goto(`file://${__dirname}/index.html`);
    const startCameraButton = await page.$('#start-camera');
    const startTakeImage = await page.$('#click-photo')

    startCameraButton.click()

    setInterval(async ()=>{
        startTakeImage.click();
        const result = await page.evaluate(() => {
            let imageData = document.querySelector("#image-data");
            console.log(window.imageDataUrl);
            return imageData.innerHTML;
          });
        console.log(result);
    }, 2000)


    // await browser.close();
})();


