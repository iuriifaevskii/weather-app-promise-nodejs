const request = require('request');

var geocodeAddress = (inputData) => {
    return new Promise((resolve,reject)=>{
        var enchodeAddress = encodeURIComponent(inputData);
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${enchodeAddress}`,
            json: true
        }, (error, response, body)=> {
            if(error){
                reject('Unable to connect to Google servers');
            } else if(body.status === 'ZERO_RESULTS'){
                reject('Unable to find that address');
            } else if(body.status === 'OK'){

                resolve({
                    address: body.results[0].formatted_address,
                    lat: body.results[0].geometry.location.lat,
                    lng: body.results[0].geometry.location.lng
                });
                console.log(`Address: ${body.results[0].formatted_address}`);
                console.log(`lat:${body.results[0].geometry.location.lat}`);
                console.log(`lng:${body.results[0].geometry.location.lng}`);
            }
        });
    });
};

var getWeather = (address,lat,lng) => {
    return new Promise((resolve,reject) => {
        request({
            url: `https://api.forecast.io/forecast/4a04d1c42fd9d32c97a2c291a32d5e2d/${lat},${lng}`,
            json: true
        }, (error, response, body)=> {
            if(error){
                reject('Unable to connect to Temperature servers');
            } else if(response.statusCode === 400){
                reject('Unable to find that temperature');
            } else if(response.statusCode === 200){
                resolve({
                    city: address,
                    temperature:body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature
                }); 
            }
        });
    });
};

geocodeAddress('19146')
    .then((location) => {
        //console.log(JSON.stringify(location,undefined,2));
        return getWeather(location.address, location.lat, location.lng);
    })
    .then((res) => {
        console.log(`In ${res.city}, we have temperature:${res.temperature} and apparentTemperature:${res.apparentTemperature}`)
    })
    .catch((errorMessage) => {
        console.log(errorMessage);
    });