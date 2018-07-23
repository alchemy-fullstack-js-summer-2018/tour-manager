require('dotenv').config();
const request = require('superagent');
const apiKey = process.env.WU_API_KEY;

if(!apiKey) {
    console.log('No API key present!');
    process.exit(1);
}

const getLocation = zip => `http://api.wunderground.com/api/${apiKey}/conditions/q/${zip}.json`;

function processLocationData(data) {
    return {
        weather: {
            temperature: data.current_observation.temp_f,
            condition: data.current_observation.weather
        },
        location: {
            city: data.current_observation.display_location.city,
            state: data.current_observation.display_location.state
        }
    };
}

const get = url => request.get(url).then(res => res.body);

module.exports = function getLocationWeather(zip) {
    return get(getLocation(zip))
        .then(processLocationData);
};
