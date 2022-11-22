import './styles.css';
const HomeHeader = ({ setScreen }) => {
    console.log("header")
    return (
        <div className="header">
            <img onClick={() => { setScreen('settings') }} className="header-icon" src="images/settings.png" />
            <img onClick={() => { setScreen('analytics') }} className="header-icon" src="images/analytics.png" />
        </div>
    )
}

export default HomeHeader;