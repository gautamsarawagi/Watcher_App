import React,{useEffect,useRef} from 'react'
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import MapStyles from "../../styles/Map.module.css"
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';

mapboxgl.accessToken = `${process.env.MAPBOX_ACCESS_TOKEN}`;

function LocationMap() {

  const router = useRouter()

  const mapContainerRef = useRef(null);

  const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [router.query.longitude,router.query.latitude],
          sprites:""
        },
        properties: {
          title: 'Current Location',
          description: 'San Francisco, California',
        }
      }
    ]
  };

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center:  [91.73623650000002,26.1445169],
      zoom: 10,
    });

    map.on("load", function () {

      map.resize();
      // Add an image to use as a custom marker
      map.loadImage(
        "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
        function (error, image) {
          if (error) throw error;
          map.addImage("custom-marker", image);
          // Add a GeoJSON source with multiple points
          map.addSource("points", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: geojson.features,
            },
          });
          // Add a symbol layer
          map.addLayer({
            id: "points",
            type: "symbol",
            source: "points",
            layout: {
              "icon-image": "custom-marker",
              'icon-size': 0.75,
              // get the title name from the source's "title" property
              "text-field": ["get", "title"],
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 1.25],
              "text-anchor": "top",
            },
          });
        }
      );
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Clean up on unmount
    return () => map.remove();
  }, []);

  return (
    <>
    <div className={MapStyles.mapContainer} ref={mapContainerRef} />;
    </>
  )
}

export default LocationMap