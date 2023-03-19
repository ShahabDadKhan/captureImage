import { useState } from 'react'
import React, { useRef, useEffect } from 'react';
import './App.css'
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import SceneComponent from './sceneComponent';
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder } from "@babylonjs/core";
import * as BABYLON from '@babylonjs/core'

function App() {
  const [count, setCount] = useState(0)
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(77.5946);
  const [lat, setLat] = useState(12.9716);
  const [zoom, setZoom] = useState(9);

  let box;
  const [capturedImage, setCapture] = useState(null);

  const onSceneReady = (scene) => {
    // This creates and positions a free camera (non-mesh)
    const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
  
    // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero());
  
    const canvas = scene.getEngine().getRenderingCanvas();
  
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
  
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;
  
    // Our built-in 'box' shape.
    box = MeshBuilder.CreateBox("cube", { size: 4 }, scene);
  
    // Move the box upward 1/2 its height
    box.position.y = 1;
  
    // Our built-in 'ground' shape.

    if(capturedImage){ 
      var materialCube = new BABYLON.StandardMaterial("texture1", scene);
      materialCube.diffuseTexture = new BABYLON.Texture(capturedImage, scene);
      box.material = materialCube;
    }
  };
  
  /**
   * Will run on every frame render.  We are spinning the box on y-axis.
   */
  const onRender = (scene) => {
    if (box !== undefined) {
      const deltaTimeInMillis = scene.getEngine().getDeltaTime();
  
      const rpm = 10;
      // box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    }
  };
  useEffect(()=>{
  }, [lat,lng])

  const onButtonClick = (()=>{
    var img = new Image();
    var mapCanvas = document.querySelector('.mapboxgl-canvas');
    setCapture(mapCanvas.toDataURL())
})
  // ///////////////////

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhaGFiMTIzIiwiYSI6ImNsZmJlaXQ2ejBlNmkzcW4xbnJsMXBmeDUifQ.VKF0hCNJ5yhPHHCqHckElw';
    const newMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
      preserveDrawingBuffer: true
    });

    // setMap(map)

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      reverseGeocode:true,
      marker: {
        color: "orange"
      }
    });

    newMap.addControl(geocoder);

    const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(newMap);

    newMap.on("click", (e) => {
      setLng(newMap.getCenter());
      setLat(newMap.getCenter().lat.toFixed(4));
      const {lng, lat} = e.lngLat
      marker.setLngLat([lng, lat])
      setZoom(newMap.getZoom().toFixed(2));
    });

    return () => newMap.remove();
  }, []);

  return (
    <div className="App" id='App'>
     <div ref={mapContainer}
      className="div-cont"
      id='my-node'
      >
        <button className='capture-image' onClick={onButtonClick}>Capture</button>
      </div>
      <div className='rightBox'>
        <SceneComponent className='babylon-class' antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
      </div>
    </div>
  )
}

export default App
