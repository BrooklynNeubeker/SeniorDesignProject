import React, { useEffect } from 'react'

import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet';
import 'leaflet-geosearch/assets/css/leaflet.css';

{/* Most of this code is given by the plugin's github
    More info here: https://github.com/smeijer/leaflet-geosearch
    Need to edit the navbar to where it is hideable on the site-creation-page
*/}
const Search = ({ apiKey }) => {
  const provider = new OpenStreetMapProvider({
    params: {
        email: 'annregalab@gmail.com',
    },
  });

  // @ts-ignore
  const searchControl = new GeoSearchControl({
  provider: provider, // required
  showMarker: true, // optional: true|false  - default true
  showPopup: false, // optional: true|false  - default false
  marker: {
    // optional: L.Marker    - default L.Icon.Default
    icon: new L.Icon.Default(),
    draggable: false,
  },
  style: 'bar',
  maxMarkers: 1, // optional: number      - default 1
  retainZoomLevel: false, // optional: true|false  - default false
  animateZoom: true, // optional: true|false  - default true
  autoClose: false, // optional: true|false  - default false
  searchLabel: 'Enter address', // optional: string      - default 'Enter address'
  keepResult: false, // optional: true|false  - default false
  updateMap: true, // optional: true|false  - default true
});

  const map = useMap();
  useEffect(() => {
    map.addControl(searchControl);

    // getting the results from the geosearch 
    map.on('geosearch/showlocation', function(result) {
      console.log('Result', result);
      // getting the longitude and latitude
      const {x: lng, y: lat} = result.location;
    });
    return () => map.removeControl(searchControl);
  }, []);

  return null;
};

export default Search;
