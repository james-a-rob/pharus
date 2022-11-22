import MetricsHeader from '../../components/MetricsHeader';
import MetricsPreview from '../../components/MetricsPreview';


const Metrics = ({ setScreen }) => {
    return (<div>
        <MetricsHeader setScreen={setScreen} />
        <MetricsPreview />
    </div>
    )
}

export default Metrics;