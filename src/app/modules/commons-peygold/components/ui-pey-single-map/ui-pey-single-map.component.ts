import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { MapsAPILoader, GoogleMapsAPIWrapper } from "@agm/core";
import { User } from '../../../../models/user';

declare var google: any;

@Component({
  selector: 'app-ui-pey-single-map',
  templateUrl: './ui-pey-single-map.component.html',
  styleUrls: ['./ui-pey-single-map.component.scss']
})
export class UiPeySingleMapComponent implements OnInit {

  //@Input('address') address: string;
  @Input('ecommerces') ecommerces: Array<any>;
  // initial center position for the map
  protected map: google.maps.Map;
  protected myMarker: any = null;
  protected marker: any = null;
  public lat: number;
  public lng: number;
  protected geocoder: any = null;
  protected markerBounds;
  protected markers: any[];

  constructor(private mapsAPILoader: MapsAPILoader) { }

  ngOnInit() {
    this.markers = [];
    //Una Vez se pueda usar la API de google map se obtiene ubicación actual para obtener la dirección y se lanza el evento onNewAddress
    this.mapsAPILoader.load().then(() => {
      //Instancia objeto que calcula direcciones y geolocalizaciones
      this.geocoder = new google.maps.Geocoder();
      //Obtener geolocalización actual
      this.markerBounds = new google.maps.LatLngBounds();
      this.getCurrentGeolocation();

    });
  }

  /** detente new chage in array ecommerces */
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    let currentValue;
    if (changes.ecommerces != undefined) {
      currentValue = changes.ecommerces.currentValue;
    }
    if (currentValue && currentValue != '' && currentValue != undefined) {
      this.loadAllMarkes();
    }
  }

  public mapReady(map) {
    console.log(map)
    this.map = map;
    //this.map.addListener('click', this.placeMarkerAndPanTo);

    console.log('ecommerces', this.ecommerces);

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

    this.lat = latitude;
    this.lng = longitude;

    console.log('latitude', latitude)
    console.log('longitude', longitude)

  }

  onErrorGeolocating = () => {

    this.lat = 4.6482837;
    this.lng = -74.2478914;
    //this.onNewLatLng.emit([this.lat,this.lng]);

  }
  /**
   * add current location
   */
  addMyMarker = () => {
    let latLng = new google.maps.LatLng(this.lat, this.lng);

    this.myMarker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: "Mi ubicacion",
      icon: "/assets/images/ic_location_on_128_28437.png"
    });
    this.markers.push(this.myMarker);
    this.markerBounds.extend(latLng);
  };


  /**
   * add new mark to map
   */
  addNewMarker = (latLng) => {
    new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: "Tu busqueda",
      icon: { url: '/assets/images/icon-map-02.svg', scaledSize: new google.maps.Size(40, 40) }
    })
  };


  /**
   * convert dir to lat and lng
   * @param address 
   */
  addressToLatLng(address: string) {
    this.geocoder.geocode({ 'address': address }, (results, status) => {
      if (status === 'OK') {
        console.log('address', address)

        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();
        console.log('lat', lat)
        console.log('lng', lng)
        this.deleteMarker();
        this.addNewMarker(results[0].geometry.location);
        this.markerBounds.extend(results[0].geometry.location);
        this.map.fitBounds(this.markerBounds);
        //this.onNewLatLng.emit([lat,lng]);
      } else {
        //this.onNewAddress.emit('');
        //this.onNewLatLng.emit(['','']);
      }
    });

  }


  /**
   * Load and print markers into map
   */

  loadAllMarkes() {
    this.deleteMarker();
    this.addMyMarker();
    this.ecommerces.forEach(ecommerce => {
      let cardInfo = new google.maps.InfoWindow({
        content: this.generateInfoCard(ecommerce),
      });
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.lat + this.getRandom(0.001, 0.003), this.lng + this.getRandom(0.001, 0.003)),
        map: this.map,
        title: ecommerce.completeName,
        icon: { url: '/assets/images/icon-map-02.svg', scaledSize: new google.maps.Size(40, 40) }
      });
      marker.addListener('mouseover', () => {
        cardInfo.open(this.map, marker);
      })

      marker.addListener('mouseout', () => {
        cardInfo.close();
      })

      this.markers.push(marker);
      this.markerBounds.extend(marker.position);
    });
  }

  /**
   * Delete markers from  map
   */
  deleteMarker() {
    if (this.markers && this.markers.length > 0) {
      this.markers.forEach(mark => {
        mark.setMap(null);
      });
    }
    this.markers = [];
  }

  /**
   * TODO: this it is temporary.
   * @param min 
   * @param max 
   */

  getRandom(min: number, max: number): number {
    const num = (Math.random() * (max - min) + min).toFixed(3);
    console.log('num', num);
    return parseFloat(num);
  }

  generateInfoCard(ecommerce: User): string {

    return `<div class="p-2">
                <div class="content-avatar"><img class="img-card" src=" ${ecommerce.avatarURL}"/></div>

                <div class="info-card">
                    <h2>${ecommerce.completeName}</h2>
                    <div>
                        <i class="fas fa-map-marker-alt"></i><h6 class="address">Direccion, calle, ciudad, pais</h6>
                    </div>
                    <div><i class="fas fa-envelope"></i><h6 class="email">${ecommerce.email}</h6></div>
                    <div><i class="fas fa-phone"></i><h6 class="phone">${ecommerce.phone}</h6></div>
                </div>
           </div>`

  }

}
