import { useState } from 'react';
import HomeHeader from '../../components/HomeHeader';
import MainControls from '../../components/MainControls';
import Footer from '../../components/Footer';

import Video from '../../components/Video';

const Home = ({ setScreen }) => {
    const [hasStarted, setHasStarted] = useState(false);
    return (
        <div>
            {hasStarted && <Video />}
            <HomeHeader setScreen={setScreen} />
            <MainControls hasStarted={hasStarted} setHasStarted={setHasStarted} />
            <Footer />
        </div>
    )
}

export default Home;
