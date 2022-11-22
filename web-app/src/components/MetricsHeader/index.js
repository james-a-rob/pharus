
import './styles.css';

const MetricsHeader = ({ setScreen }) => {
    return (
        <div className="metrics-header">
            <img onClick={() => { setScreen('home') }} className="header-icon" src="images/back.png" />
        </div>
    )
}

export default MetricsHeader;