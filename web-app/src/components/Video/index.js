import { useEffect, useRef } from 'react';
import { initDetectFaceTouch, detectFaceTouch } from '../../detections/face-touch/detect';
import './styles.css';

initDetectFaceTouch();
const Video = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        const screenShotOnInterval = async () => {
            let stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
            let video = videoRef.current;
            video.srcObject = stream;
            video.onloadedmetadata = e => {
                video.play();
            };

            video.onloadeddata = async e => {
                setInterval(async () => {
                    const result = await detectFaceTouch(videoRef.current);
                    console.log("result", result);
                    if (result) {
                        await navigator.setAppBadge(1).catch(() => {
                            console.log(
                                'failed set badge'
                            )
                        });
                    } else {
                        await navigator.clearAppBadge();
                    }

                }, 4000);
            };



        }

        screenShotOnInterval();


    }, []);



    return (<div>
        <video className="hidden-video" ref={videoRef} id="video" width="320" height="240"></video>
    </div>)
}

export default Video;