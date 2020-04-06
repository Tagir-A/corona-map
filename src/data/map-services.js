const MAPBOX_TOKEN = process.env.GATSBY_MAPBOX_TOKEN

export const mapServices = [
  {
    name: 'MapBox',
    attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    url: `https://api.mapbox.com/styles/v1/tagir-a/ck8oeoik43i901illk2ifag1b/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_TOKEN}`
    
  },
  {
    name: 'OpenStreetMap',
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  }
];