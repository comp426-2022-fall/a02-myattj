#!/usr/bin/env node
import moment from "moment-timezone";
import fetch from "node-fetch";


const timezone = moment.tz.guess();

const argv = process.argv.slice(2);

var lat = null
var long = null

if(argv[0] == '-h'){
    console.log("Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE")
    console.log( "-h            Show this help message and exit.")
    console.log("-n, -s        Latitude: N positive; S negative.")
    console.log("-e, -w        Longitude: E positive; W negative.")
    console.log("-z            Time zone: uses tz.guess() from moment-timezone by default.")
    console.log("-d 0-6        Day to retrieve weather: 0 is today; defaults to 1.")
    console.log("-j            Echo pretty JSON from open-meteo API and exit.")
    process.exit(0)
}

if(argv[0] == '-j'){
    // Make a request
    //const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude='+ lat +'&longitude='+ long +'&daily=precipitation_hours&timezone='+timezone);

    // Get the data from the request
    //const data = await response.json();

    console.log("Latitude must be in range")
    process.exit(0)
}

if(argv[0] == '-n') {
    lat = parseInt(argv[1]).toFixed(2);
}
else {
    lat = -parseInt(argv[1]).toFixed(2);
}


if (argv[2] == '-e'){
    long = parseInt(argv[3]).toFixed(2);
}
else{
    long = -parseInt(argv[3]).toFixed(2);
}



// Make a request
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude='+ lat +'&longitude='+ long +'&daily=precipitation_hours&timezone='+timezone);

// Get the data from the request
const data = await response.json();
var days = 1


if(argv[6] == '-d'){
    days = argv[7]
}


if (days == 0) {
    console.log(data.daily.precipitation_hours[days]+" precipitation hours today.")
} else if (days > 1) {
    console.log(data.daily.precipitation_hours[days]+" precipitation hours in" + days + "days.")
} else {
    console.log(data.daily.precipitation_hours[1]+" precipitation hours tomorrow.")
}

