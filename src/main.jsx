import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';

// mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhaGFiMTIzIiwiYSI6ImNsZmJlaXQ2ejBlNmkzcW4xbnJsMXBmeDUifQ.VKF0hCNJ5yhPHHCqHckElw';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

