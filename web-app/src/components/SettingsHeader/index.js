import './styles.css';
const SettingsHeader = ({ setScreen }) => {
    return (
        <div className="settings-header">
            <img onClick={() => { setScreen('home') }} className="header-icon" src="images/back.png" />
        </div>
    )
}

export default SettingsHeader;