
import './styles.css';

const MainControls = ({ hasStarted, setHasStarted }) => {
    return (
        <div className="main-controls">
            <img className="main-controls-icon" onClick={() => { setHasStarted(!hasStarted) }} src="images/start.png" />
            <div className="main-controls-label" onClick={() => { setHasStarted(!hasStarted) }}>{hasStarted ? 'End' : 'Start'}</div>
        </div>
    )
}

export default MainControls;