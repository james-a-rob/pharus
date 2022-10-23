const { QSystemTrayIcon, QIcon } = require("@nodegui/nodegui");
const { exec } = require('child_process');

const { detectFaceTouch, setupFaceTouchAI } = require('./face-touch');
const { startCamera } = require('./camera');
const trayIcon = new QIcon("facepalm-icon-color-4.png");

const initFlashingIcon = () => {
    let showFaded = false;
    const trayIcon = new QIcon("facepalm-icon-color-4.png");
    const trayIconFaded = new QIcon("facepalm-icon-color-4-faded.png");
    const tray = new QSystemTrayIcon();
    tray.setIcon(trayIcon);
    setInterval(() => {
        if (showFaded) {
            tray.setIcon(trayIcon);
            showFaded = false;

        } else {
            tray.setIcon(trayIconFaded);
            showFaded = true;

        }

    }, 200);
    return tray;


}


const init = async () => {
    const model = await setupFaceTouchAI();

    const tray = initFlashingIcon();
    await startCamera();
    const stopped = false;

    // infinite loop
    while (!stopped) {
        await new Promise(r => setTimeout(r, 2000));

        const result = await detectFaceTouch(model);

        if (result) {
            exec('afplay precussion.mp3')


            console.log('show')
            tray.show();

        } else {
            console.log('hide')

            tray.hide();


        }

    }



    global.tray = tray;
}

init();