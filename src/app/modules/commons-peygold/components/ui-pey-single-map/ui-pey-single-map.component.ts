import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { MapsAPILoader, GoogleMapsAPIWrapper } from "@agm/core";
declare var google: any;

@Component({
  selector: 'app-ui-pey-single-map',
  templateUrl: './ui-pey-single-map.component.html',
  styleUrls: ['./ui-pey-single-map.component.scss']
})
export class UiPeySingleMapComponent implements OnInit {

  @Input('address') address: string;
  @Output() onNewAddress: EventEmitter<string> = new EventEmitter<string>();
  // initial center position for the map
  protected map: google.maps.Map;
  protected myMarker: any = null;
  protected marker: any = null;
  public lat: number;
  public lng: number;
  protected geocoder: any = null;
  protected markerBounds;


  markers = [
    {
      lat: 10.4946141,
      lng: -66.8154954,
      title: "C.C Aloa, El marques."
    },
    {
      lat: 10.4859436,
      lng: -66.8210799,
      title: "C.C Lides."
    }
  ]

  constructor(private mapsAPILoader: MapsAPILoader, ) { }

  ngOnInit() {

    //Una Vez se pueda usar la API de google map se obtiene ubicación actual para obtener la dirección y se lanza el evento onNewAddress
    this.mapsAPILoader.load().then(() => {
      //Instancia objeto que calcula direcciones y geolocalizaciones
      this.geocoder = new google.maps.Geocoder();
      //Obtener geolocalización actual
      this.markerBounds = new google.maps.LatLngBounds();
      this.getCurrentGeolocation();

    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const { currentValue } = changes.address;
    console.log(currentValue);
    if (currentValue) {
      this.addressToLatLng(currentValue);
    }
  }

  public mapReady(map) {
    console.log(map)
    this.map = map;
    //this.map.addListener('click', this.placeMarkerAndPanTo);


    this.loadAllMarkes();
    this.map.fitBounds(this.markerBounds);
  }


  getCurrentGeolocation() {
    navigator.geolocation.getCurrentPosition(
      this.onSuccessGeolocating,
      this.onErrorGeolocating,
      { enableHighAccuracy: true }
    );
  }

  onSuccessGeolocating = (position) => {
    const { latitude, longitude } = position.coords;
    console.log('latitude', latitude)
    console.log('longitude', longitude)
    this.lat = latitude;
    this.lng = longitude;
    let latLng: any;
    latLng = new google.maps.LatLng(latitude, longitude);
    //this.map.setCenter({ lat: latitude, lng: longitude });
    this.myMarker = this.newMyMarker(latLng);
    this.markerBounds.extend(latLng);
    //this.latLngToAddress(latLng);

  }

  onErrorGeolocating = () => {

    this.lat = 4.6482837;
    this.lng = -74.2478914;
    //this.onNewLatLng.emit([this.lat,this.lng]);

  }

  newMyMarker = (latLng) => (
    new google.maps.Marker({
      position: latLng,
      map: this.map,
      title:"Mi ubicacion",
      icon:"/assets/images/ic_location_on_128_28437.png"
    })
  );

  newMarker = (latLng) => (
    new google.maps.Marker({
      position: latLng,
      map: this.map,
      title:"Tu busqueda",
      icon:'/assets/images/bank_finance_dollar_location_pointer_icon_124684.png'
    })
  );

  addressToLatLng(address: string) {

    this.geocoder.geocode({ 'address': address }, (results, status) => {
      if (status === 'OK') {
        console.log('address', address)

        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();
        console.log('lat', lat)
        console.log('lng', lng)
        this.deleteMarker();
        this.newMarker(results[0].geometry.location);
        this.markerBounds.extend(results[0].geometry.location);
        this.map.fitBounds(this.markerBounds);
        //this.onNewLatLng.emit([lat,lng]);
      } else {
        //this.onNewAddress.emit('');
        //this.onNewLatLng.emit(['','']);
      }
    });

  }

  deleteMarker() {
    if (this.marker != null)
      this.marker.setMap(null);
  }

  loadAllMarkes() {
    this.markers.forEach(itemMmark => {

      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(itemMmark.lat, itemMmark.lng),
        map: this.map,
        title: itemMmark.title,
        icon:'/assets/images/bank_finance_dollar_location_pointer_icon_124684.png'
      });
      this.markerBounds.extend(marker.position);
    });

    
  }

}
