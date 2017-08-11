//MAIN FILE

const yargs = require('yargs');
const axios = require('axios');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
   .options({
       a: {
           demand:true,
           alias: 'address',
           describe: 'Address to fetch weather for',
           string: true
       }
   })
   .help()
   .alias('help','h')
   .argv;

var enchodeAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${enchodeAddress}`;

var weatherPromise = (weatherUrl,formattedAddress) => {
    return new Promise((resolve,reject) => {
        console.log('FA',formattedAddress);
        var myAddress = formattedAddress;
        axios.get(weatherUrl)
            .then((response)=> {
                var temperature = response.data.currently.temperature;
                var apparentTemperature = response.data.currently.apparentTemperature;
                var clientAddress = myAddress;
                resolve({
                    temperature,
                    apparentTemperature,
                    clientAddress
                });
            });
    });
};

axios.get(geocodeUrl).then((response) => {
    if(response.data.status ==='ZERO_RESULTS'){
        throw new Error('Unable to find that address.');
    }

    var formattedAddress = response.data.results[0].formatted_address;
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.forecast.io/forecast/4a04d1c42fd9d32c97a2c291a32d5e2d/${lat},${lng}`;
    //console.log(response.data);
    return weatherPromise(weatherUrl,formattedAddress) // we can make: axios.get(weatherUrl);
})
.then((response) => {
    console.log(response);
    console.log(`===In ${response.clientAddress}, we have temperature:${response.temperature} and apparentTemperature:${response.apparentTemperature}===`);
})
.catch((e) => {
    if(e.code === 'ENOTFOUND'){
        console.log('Unable to connect to api server');
    } else {
        console.log(e.message);
    }
});
