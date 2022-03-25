import axios from "axios";
import { Loader } from "@googlemaps/js-api-loader";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

const loader = new Loader({
  apiKey: `${process.env.SECRET_KEY}`,
  version: "weekly",
});

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  // send this to Google's API
  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${process.env.SECRET_KEY}`
    )
    .then((response) => {
      if (response.data.status !== "OK") {
        throw new Error("Could not fetch location!");
      }
      const coordinates = response.data.results[0].geometry.location;
      
      // load map
      let map: any;
      loader.load().then(() => {
        map = new google.maps.Map(
          document.getElementById("map") as HTMLElement,
          {
            center: coordinates,
            zoom: 12,
          }
        );
        // add marker
        new google.maps.Marker({ position: coordinates, map: map })
      });

      // console.log(response);
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
}

form.addEventListener("submit", searchAddressHandler);
