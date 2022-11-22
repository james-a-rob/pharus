import { useState } from 'react';
import { Checkbox } from '@mui/material';
import './styles.css';

const SettingsControls = ({ setScreen }) => {

    const [config, setConfig] = useState({
        notificationsEnabled: false
    });

    const handleNotificationsConfigChange = (event) => {
        console.log('checked', event.target.checked)
        const updatedConfig = {
            notificationsEnabled: event.target.checked
        }
        setConfig(
            updatedConfig
        );
    }

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <div className="settings-controls">
            <div className="settings-control">
                <div className="settings-control-label">Enable sound FX</div>
                <Checkbox
                    checked={config.notificationsEnabled}
                    onChange={handleNotificationsConfigChange}
                    {...label} />

            </div>
            <div className="settings-control">
                <div className="settings-control-label">Enable notifications</div>
                <Checkbox
                    checked={config.notificationsEnabled}
                    onChange={handleNotificationsConfigChange}
                    {...label} />
            </div>
            <div className="settings-control">
                <div className="settings-control-label">Enable tray icon</div>
                <Checkbox
                    checked={config.notificationsEnabled}
                    onChange={handleNotificationsConfigChange}
                    {...label} />
            </div>

        </div>
    )
}

export default SettingsControls;