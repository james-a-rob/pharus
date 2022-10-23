const NodeWebcam = require("node-webcam");
const cvstfjs = require('@microsoft/customvision-tfjs-node');
const fs = require('fs');
const { takePicture } = require('./camera');
const opts = {

    //Picture related

    width: 1280,

    height: 720,

    quality: 100,

    // Number of frames to capture
    // More the frames, longer it takes to capture
    // Use higher framerate for quality. Ex: 60

    frames: 60,


    //Delay in seconds to take shot
    //if the platform supports miliseconds
    //use a float (0.1)
    //Currently only on windows

    delay: 0,


    //Save shots in memory

    saveShots: true,


    // [jpeg, png] support varies
    // Webcam.OutputTypes

    output: "jpeg",


    //Which camera to use
    //Use Webcam.list() for results
    //false for default device

    device: false,


    // [location, buffer, base64]
    // Webcam.CallbackReturnTypes

    callbackReturn: "location",


    //Logging

    verbose: false

};


//Creates webcam instance

var Webcam = NodeWebcam.create(opts);


//Will automatically append location output type



function executeAsync(model) {
    return new Promise((resolve, reject) => {

        fs.readFile("tmp.png", async function (err, data) {
            console.log('success file load')

            if (err) {
                throw err;
            }

            const result = await model.executeAsync(data);

            const [chanceNoFace, chanceNotTouching, chanceTouching] = result[0];
            resolve(chanceTouching > 0.01 && chanceNotTouching < 0.002);
        })
    });
}

const detectFaceTouch = (model) => {
    return new Promise(async (resolve, reject) => {
        // console.log('start image capture')
        // Webcam.capture("test_picture", function (err, data) {
        //     console.log('success capture');
        //     const runMachineLearning = async () => {
        //         const result = await executeAsync(model);
        //         resolve(result);

        //     }
        //     runMachineLearning();

        // });
        // Webcam.clear();

        await takePicture();
        const result = await executeAsync(model);
        resolve(result);

    })

}

const setupFaceTouchAI = async () => {
    const model = new cvstfjs.ClassificationModel();
    await model.loadModelAsync('http://127.0.0.1:8081/model/model.json');
    return model;
}

module.exports = {
    setupFaceTouchAI,
    detectFaceTouch
};


