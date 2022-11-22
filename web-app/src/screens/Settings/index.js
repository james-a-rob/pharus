import SettingsHeader from '../../components/SettingsHeader';
import SettingsTitle from '../../components/SettingsTitle';
import SettingsControls from '../../components/SettingsControls';


const Settings = ({ setScreen }) => {
    return (
        <div>
            <SettingsHeader setScreen={setScreen} />
            <SettingsTitle />
            <SettingsControls />
        </div>
    )
}

export default Settings;