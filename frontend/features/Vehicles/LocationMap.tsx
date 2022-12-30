import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Mapclasses from "../../styles/Map.module.css"

function LocationMap() {

  mapboxgl.accessToken = 'pk.eyJ1Ijoib2xpdmVtb25rIiwiYSI6ImNsYzhsYjIybjVramszcWtlM3Z5Y3ZpYzQifQ.U39RBs91Zqi5ZXkabWgKUA';

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
      container: mapContainer.current,
      // style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  return (
    <div>
      <div ref={mapContainer} className={Mapclasses.mapContainer}/>
    </div>
  );
}

export default LocationMap;
