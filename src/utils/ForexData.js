import axios from 'axios';
import CONFIG from './config';

export default axios.get(CONFIG.apiUrl).then(res => {
    const currencyData = res.data;

    return currencyData;
});
