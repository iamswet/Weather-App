const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/search/geocode/v6/forward?q=" +
    encodeURIComponent(address) +
    "&access_token=pk.eyJ1Ijoic3dldGUyMjkiLCJhIjoiY2x4MjNpcjZvMGdiYjJqczRuMzZocndkZCJ9.Ut1zrmPtFtF6v3jilZLJTw&limit=1";

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to fetch Coordinates", undefined);
    } else if (response.body.error_code) {
      callback("Invalid location", undefined);
    } else {
      callback(undefined, {
        longitude: response.body.features[0].properties.coordinates.longitude,
        latitude: response.body.features[0].properties.coordinates.latitude,
        place: response.body.features[0].properties.full_address,
      });
    }
  });
};

module.exports = geocode;
