import React, { useEffect } from 'react'

import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet';
import 'leaflet-geosearch/assets/css/leaflet.css';
import { useGlobal } from "./GlobalContext";

{/* Most of this code is given by the plugin's github
    More info here: https://github.com/smeijer/leaflet-geosearch
    Need to edit the navbar to where it is hideable on the site-creation-page
*/}
const Search = ({ baseZoom }) => {
  const provider = new OpenStreetMapProvider({
    params: {
        email: 'annregalab@gmail.com',
    },
  });

  // @ts-ignore
  const searchControl = new GeoSearchControl({
    provider: provider, // required
    showMarker: false, // optional: true|false  - default true
    showPopup: false, // optional: true|false  - default false
    marker: {
      // optional: L.Marker    - default L.Icon.Default
      icon: new L.Icon.Default(),
      draggable: false,
    },
    style: 'bar',
    maxMarkers: 1, // optional: number      - default 1
    retainZoomLevel: false, // optional: true|false  - default false
    animateZoom: false, // optional: true|false  - default true
    autoClose: false, // optional: true|false  - default false
    searchLabel: 'Enter an address for your event', // optional: string      - default 'Enter address'
    keepResult: false, // optional: true|false  - default false
    updateMap: false, // optional: true|false  - default true
  });

  const {setLocation} = useGlobal();

  const map = useMap();
  useEffect(() => {
    map.addControl(searchControl);

    // getting the results from the geosearch 
    map.on('geosearch/showlocation', function(result) {

      setLocation({
        lat: result.location.y,
        lng: result.location.x,
        label: result.location.label,
      });

      map.setView([result.location.y, result.location.x], baseZoom)
    });

    return () => map.removeControl(searchControl);
  }, [map, setLocation]);

  return null;
};

export default Search;

