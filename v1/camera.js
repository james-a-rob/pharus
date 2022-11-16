const { VideoCapture } = require('camera-capture');
const fs = require('fs');
const camera = {
    value: null
}

const startCamera = async () => {
    camera.value = new VideoCapture({
        mime: 'image/png'
    })
    await camera.value.initialize()
    await camera.value.startCamera()
}

const stopCamera = async () => {
    camera.value.stopCamera()
}
const takePicture = async () => {
    const sleep = ms => new Promise(r => setTimeout(r, ms));

    let f = await camera.value.readFrame();
    fs.writeFileSync('tmp.png', f.data)

}
module.exports = {
    startCamera,
    stopCamera,
    takePicture
}
