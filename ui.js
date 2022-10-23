const {
    QMainWindow,
    QFrame,
    QLabel,
    FlexLayout,
    QMovie,
    WindowType,
    QGraphicsDropShadowEffect
} = require("@nodegui/nodegui");
const { detectFaceTouch, setupFaceTouchAI } = require('./face-touch');
const { startCamera } = require('./camera');




const setupUi = async (model) => {
    const win = new QMainWindow();

    const shadow = new QGraphicsDropShadowEffect();
    shadow.setBlurRadius(8);

    win.setWindowFlag(WindowType.WindowStaysOnTopHint, true);
    win.setWindowFlag(WindowType.FramelessWindowHint, true);

    win.resize(50, 50);
    win.setWindowOpacity(0.8);
    win.setGraphicsEffect(shadow);

    const frame = new QFrame();

    const label = new QLabel();



    win.setCentralWidget(frame);
    win.setInlineStyle("background:white; opacity:0;");
    frame.setInlineStyle("background:white;");

    win.move(0, 0);

    const rootLayout = new FlexLayout();
    frame.setLayout(rootLayout);

    const absoulteImagePath = 'facepalm-extra-small.gif';
    const movie = new QMovie();
    movie.setFileName(absoulteImagePath);
    movie.start();

    label.setMovie(movie);



    label.setText("");


    rootLayout.addWidget(label);
    const stopped = false
    await startCamera();

    // infinite loop
    while (!stopped) {
        await new Promise(r => setTimeout(r, 2000));

        console.log('start detectFaceTouch')
        const result = await detectFaceTouch(model);
        console.log('detectFaceTouch done')

        if (result) {
            win.show();
            win.raise();
            win.activateWindow();


            frame.show();

            frame.activateWindow();
            frame.raise();

            // label.setText("stop touching your face");



        } else {
            win.hide();
            win.lower();
            win.activateWindow();
            frame.hide();

            frame.activateWindow();
            frame.raise();

            frame.lower();
            // label.setText("all good");

        }

        console.log("touch face result is", result);
    }

    (global).win = win;
}

const run = async () => {
    const model = await setupFaceTouchAI();
    setupUi(model);
}

run();

