import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 
export class GoogelMap extends Component {
  render() {
    return (
      <Map google={this.props.google} 
      initialCenter={{
        lat: 40.854885,
        lng: -88.081807
      }}
      zoom={14}
      >
          
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}
 

export default GoogleApiWrapper({
  apiKey: ("AIzaSyAykba50Lfg3s47EfHHmdcaIeGeMsoTyIY")
})(GoogelMap)