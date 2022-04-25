import axios from 'axios';

import { GOOGLE_MAPS_API_KEY } from '@env';

export const autoCompletePlaces = async (place) => {

    try {
        const response = await axios({
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${place}&types=geocode&key=${GOOGLE_MAPS_API_KEY}`,
            headers: {
            }
        })

        return response.data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}