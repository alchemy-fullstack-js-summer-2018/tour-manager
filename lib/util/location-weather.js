const request = require('superagent');
const apiKey = process.env.WU_API_KEY;

if(!apiKey) {
    console.log('No API key present!');
    process.exit(1);
}

const getLocation = zip => `http://api.wunderground.com/api/${apiKey}/conditions/q/${zip}.json`;

function processLocationData(data) {
    return {
        location: {
            city: data.current_observation.display_location.city,
            state: data.current_observation.display_location.state,
            zip: data.current_observation.display_location.zip,
        },
        weather: {
            temperature: data.current_observation.temperature_string,
            // sunset: data.sun_phase.sunset.hour + ':' + data.sun_phase.sunset.minute,
        }
    };
}

const get = url => request.get(url).then(res => res.body);

module.exports = function getLocationWeather(zip) {
    return get(getLocation(zip))
        .then(processLocationData);
};