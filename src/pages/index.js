import React from 'react';
import Helmet from 'react-helmet';
import L from 'leaflet'

import Layout from 'components/Layout';
import Map from 'components/Map';

import { getJSON } from 'utils/request';

const LOCATION = {
  lat: 53.5775,
  lng: 23.106111
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 3;

const IndexPage = () => {

  /**
   * mapEffect
   * @description Fires a callback once the page renders
   * @example Here this is and example of being used to zoom in and set a popup on load
   */

  async function mapEffect({ leafletElement: map } = {}) {
    if ( !map ) return;

    let dataPerCountry = [];

    try {
      dataPerCountry = await getJSON('https://corona.lmao.ninja/countries')
    } catch(e) {
      console.log(`Failed to fetch countries: ${e.message}`, e);
      return;
    }

    const hasData = Array.isArray(dataPerCountry) && dataPerCountry.length > 0;

if ( !hasData ) return;

const geoJSON = {
  type: 'FeatureCollection',
  features: dataPerCountry.map((countryObj = {}) => {
    const { countryInfo = {} } = countryObj;
    const { lat, long } = countryInfo;
    return {
      type: 'Feature',
      properties: {
        ...countryObj,
      },
      geometry: {
        type: 'Point',
        coordinates: [ long, lat ]
      }
    }
  })
}

const geoJsonLayers = new L.GeoJSON(geoJSON, {
  pointToLayer: (feature = {}, latlng) => {
    const { properties = {} } = feature;
    let updatedFormatted;
    let recoveredString;

    const {
      country,
      updated,
      cases,
      deaths,
      recovered
    } = properties

    recoveredString = `${recovered}`;

    if ( recovered > 1000 ) {
      recoveredString = `${recoveredString.slice(0, -3)}k+`
    }

    if ( updated ) {
      updatedFormatted = new Date(updated).toLocaleString('ru-RU');
    }

    const html = `
      <span class='icon-marker'>
        <span class='icon-marker-tooltip'>
          <h2>${country}</h2>
          <ul>
            <li><strong>Заболело:</strong> ${cases}</li>
            <li><strong>Умерло:</strong> ${deaths}</li>
            <li><strong>Выздоровело:</strong> ${recovered}</li>
            <li><strong>Обновление данных:</strong> ${updatedFormatted}</li>
          </ul>
        </span>
        ${ recoveredString }
      </span>
    `;

    return L.marker( latlng, {
      icon: L.divIcon({
        className: 'icon',
        html
      }),
      riseOnHover: true
    });
  }
});

geoJsonLayers.addTo(map)

   
  }

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: 'MapBox',
    zoom: DEFAULT_ZOOM,
    mapEffect
  };

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <Map {...mapSettings}>
      </Map>

    </Layout>
  );
};

export default IndexPage;
