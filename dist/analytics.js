"use strict";
let logged; // for variables they can be any in TS
function sendAnalytics(data) {
    console.log(data);
    logged = true;
    console.log(logged);
}
sendAnalytics('The data');
