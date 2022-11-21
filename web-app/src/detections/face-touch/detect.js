const cvstfjs = require('@microsoft/customvision-tfjs');

let model = null;

export const initDetectFaceTouch = async () => {
    return new Promise(async (resolve, reject) => {
        model = new cvstfjs.ClassificationModel();
        await model.loadModelAsync(`models/face-touch/model.json`);
        resolve();

    });

}

export const detectFaceTouch = (image) => {
    return new Promise(async (resolve, reject) => {

        const result = await model.executeAsync(image);

        const [chanceNoFace, chanceNotTouching, chanceTouching] = result[0];
        resolve(chanceTouching > 0.02 && chanceNotTouching < 0.007);
    });
}

