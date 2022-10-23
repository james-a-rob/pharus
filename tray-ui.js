const { QSystemTrayIcon, QIcon } = require("@nodegui/nodegui");
const { detectFaceTouch, setupFaceTouchAI } = require('./face-touch');
const { startCamera } = require('./camera');
const trayIcon = new QIcon(
    "facepalm-icon-color.png")


const init = async () => {
    const model = await setupFaceTouchAI();
    const tray = new QSystemTrayIcon();
    tray.setIcon(trayIcon);

    await startCamera();
    const stopped = false;

    // infinite loop
    while (!stopped) {
        await new Promise(r => setTimeout(r, 2000));

        const result = await detectFaceTouch(model);

        if (result) {
            tray.show();


        } else {
            tray.hide();


        }

    }



    global.tray = tray;
}

init();