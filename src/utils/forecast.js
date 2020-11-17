const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=d4a6ebfaecb2cf958c8f3f78acd5358c&query=${latitude},${longitude}&units=m`;

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service.');
            return;
        }

        if (response.body.error) {
            callback(response.body.error.info);
            return;
        }

        const data = response.body;
        const currentData = data.current;
        const { temperature, feelslike, weather_descriptions: weatherDescription} = currentData;
        callback(undefined, `${weatherDescription[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`);
    });
}

module.exports = forecast;