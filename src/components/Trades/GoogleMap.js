import React,{Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


export class GoogleMap extends Component {
  state = {
    markers: [
      {
        name: "Current position",
        position: {
          lat: 34.762653,
          lng: 10.754910
        }
      }
    ]
  };

  
  onMarkerDragEnd = async (coord, index) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    const datatFromDataBase = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=pk.eyJ1IjoiYWhtZWRkZXJiZWwiLCJhIjoiY2thanU4aG8yMGU5dDJ6anV3aTV5cHBmaSJ9.7SjE9ubvZ8mVmy-yCEcXjg&limit=1`);
    const data = await datatFromDataBase.json();
    this.props.getPlaceName(data.features[0].place_name);
    console.log(this.props.getPlaceName(data.features[0].place_name));
    this.setState(prevState => {
      const markers = [...this.state.markers];
      markers[index] = { ...markers[index], position: { lat, lng } };
      return { markers };
    });
  };
  render()
   {
  

    return (
      <Map google={this.props.google} 
      
      initialCenter={{
        lat:34.762653,
        lng:10.754910
      }}
      onClick={this.mapClicked} 
      onDragend={this.centerMoved}
      >
          
          {this.state.markers.map((marker, index) => (
          <Marker
            position={marker.position}
            draggable={true}
            onDragend={(t, map, coord) => this.onMarkerDragEnd(coord, index)}
            name={marker.name}
          />
        ))}
       
        <InfoWindow onClose={this.onInfoWindowClose}>
          
        </InfoWindow>
      </Map>
    );
  }
}
 

export default GoogleApiWrapper({
  apiKey: ("AIzaSyAykba50Lfg3s47EfHHmdcaIeGeMsoTyIY")
})(GoogleMap)