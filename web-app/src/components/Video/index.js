import { useEffect, useRef } from 'react';
import { initDetectFaceTouch, detectFaceTouch } from '../../detections/face-touch/detect';

initDetectFaceTouch();
const Video = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        navigator.setAppBadge(2);
        const screenShotOnInterval = async () => {
            let stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
            let video = videoRef.current;
            video.srcObject = stream;
            video.onloadedmetadata = e => {
                video.play();
            };

            video.onloadeddata = e => {
                setInterval(async () => {
                    const result = await detectFaceTouch(videoRef.current);
                    console.log("result", result);
                    if(result){
                        await navigator.setAppBadge(1);
                    }
                    await navigator.clearAppBadge();

                }, 4000);
            };



        }

        screenShotOnInterval();


    }, []);
    return (<div>
        <video ref={videoRef} id="video" width="320" height="240"></video>
    </div>)
}

export default Video;