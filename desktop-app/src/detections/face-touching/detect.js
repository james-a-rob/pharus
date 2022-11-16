const cvstfjs = require('@microsoft/customvision-tfjs-node');
const fs = require('fs');
const path = require('path');
const express = require('express')

let model = null;

const initDetectFaceTouch = async () => {
    return new Promise(async(resolve, reject) => {

        const app = express()
        const port = 4891
        app.use('/model', express.static(__dirname + '/model'));

        app.listen(port, async() => {
            model = new cvstfjs.ClassificationModel();
            await model.loadModelAsync(`http://localhost:4891/model/model.json`);
            resolve();
        })
    });

}

const detectFaceTouch = ()=>{
    return new Promise(async(resolve, reject) => {

        const data = fs.readFileSync(path.join(__dirname, '..', '..', 'tmp.jpeg'));
        const result = await model.executeAsync(data);

        const [chanceNoFace, chanceNotTouching, chanceTouching] = result[0];
        console.log(chanceNotTouching);
        resolve(chanceTouching > 0.02 && chanceNotTouching < 0.007);
    });
}


module.exports = {
    initDetectFaceTouch,
    detectFaceTouch,
};

