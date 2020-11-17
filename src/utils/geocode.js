const request = require('request');

const geocode = (address, callback) => {
    const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZ2V0YWRldiIsImEiOiJja2FtaDRzazIwazJ2MnRxbWhkNGhzYmdoIn0._C0Dg9kOcqS23A7of4tzbw&limit=1'`;

    request({ url: mapboxUrl, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location service.');
            return;
        }

        if (response.body.message) {
            callback(response.body.message);
            return;
        }

        if (!response.body.features.length) {
            callback('Unable to find location, try another search');
            return;
        }

        const data = response.body.features[0];
        const longitude = data.center[0];
        const latitude = data.center[1];
        const location = data.place_name;

        callback(undefined, {
            latitude,
            longitude,
            location
        })
    });
};

module.exports = geocode;