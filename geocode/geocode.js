const request = require('request');

var geocodeAddress = (inputData, callback) => {
    var enchodeAddress = encodeURIComponent(inputData);
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${enchodeAddress}`,
        json: true
    }, (error, response, body)=> {
        if(error){
            callback('Unable to connect to Google servers');
        } else if(body.status === 'ZERO_RESULTS'){
            callback('Unable to find that address');
        } else if(body.status === 'OK'){
            callback(undefined, {
                address: body.results[0].formatted_address,
                lat: body.results[0].geometry.location.lat,
                lng: body.results[0].geometry.location.lng
            });
            console.log(`Address: ${body.results[0].formatted_address}`);
            console.log(`lat:${body.results[0].geometry.location.lat}`);
            console.log(`lng:${body.results[0].geometry.location.lng}`);
        }
    });
};

//IN CONSOLE
//node app.js --address="1301 Lombard St Philadelphia"

module.exports.geocodeAddress = geocodeAddress;