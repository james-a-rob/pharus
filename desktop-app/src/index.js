const { app, BrowserWindow, Tray, Menu, systemPreferences, ipcMain, Notification } = require('electron');
const  { createFFmpeg, fetchFile } = require('@ffmpeg/ffmpeg');
const path = require('path');
const fs = require('fs');
const sound = require("sound-play");
const { initDetectFaceTouch, detectFaceTouch } = require('./detections/face-touching/detect');
// require('./detections/speaking-pace/detect');
const ffmpeg = createFFmpeg({ log: true });


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const config = {
  notificationsEnabled: false
}

let faceTouchingTrayIcon = null;

const handleImageCapture = async (image) => {

  console.log('yep handling image caputre');

  var base64Data = image.replace(/^data:image\/jpeg;base64,/, "");

  fs.writeFileSync(path.join(__dirname, 'tmp.jpeg'), base64Data, 'base64');

  const touchingFace = await detectFaceTouch();
  if (faceTouchingTrayIcon) {
    faceTouchingTrayIcon.destroy();

  }
  if (touchingFace) {
    faceTouchingTrayIcon = new Tray(path.join(__dirname, 'images/tray-icons/face-touch.png'));
    sound.play(path.join(__dirname, 'sounds/precussion.mp3'));
    if (config.notificationsEnabled) {
      new Notification({ title: "Face touching", body: "Watch what your doing with your hands", silent: true }).show()

    }

  }

}

const handleMicCapture = async (audio)=>{
  var base64Data = audio.split("base64,")[1];
  console.log(base64Data);
  fs.writeFileSync(path.join(__dirname, 'tmp.webm'), base64Data, 'base64');
  ffmpeg.FS('writeFile', 'tmp.webm', await fetchFile(path.join(__dirname, 'tmp.webm')));
  await ffmpeg.run('-i', 'tmp.webm', 'test.wav');
  fs.writeFileSync(path.join(__dirname, 'tmp.wav'), ffmpeg.FS('readFile', 'test.wav'));


}



const onAppReady = async () => {
  // Create the browser window.

  await initDetectFaceTouch();

  ipcMain.on('input-captured', async (event, data) => {

    switch (data.type) {
      case "webcam-image":

        await handleImageCapture(data.content);

        break;
      case "mic":
        console.log(data.content)
        await handleMicCapture(data.content);

      default:
      // code block
    }
  });

  ipcMain.on('config-changed', async (event, data) => {
    config.notificationsEnabled = data.notificationsEnabled;


  });

  await systemPreferences.askForMediaAccess('camera');
  await systemPreferences.askForMediaAccess('microphone');
  await ffmpeg.load();

  const mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    icon: '/Users/jamesrobertson/Code/pharus/desktop-app/src/images/pharus.icns',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', onAppReady);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    onAppReady();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
