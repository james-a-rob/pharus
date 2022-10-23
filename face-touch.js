const cvstfjs = require('@microsoft/customvision-tfjs-node');
const fs = require('fs');
const { takePicture } = require('./camera');



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


