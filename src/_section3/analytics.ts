let logged; // for variables they can be any in TS

function sendAnalytics(data: string) {
  console.log(data);
  logged = true;
  console.log(logged)
}

sendAnalytics('The data');