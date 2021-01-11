import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { MapsAPILoader, GoogleMapsAPIWrapper } from "@agm/core";
import { User } from '../../../../models/user';
import { ServiceCategory } from '../../../..//models/service-category';
import { MapSearchService } from '../../../../services/map-search.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceCategoryService } from '../../../../services/service-category.service';
import { BaseComponent } from '../base-component.component';
import { Subject } from 'rxjs';

declare var google: any;

@Component({
  selector: 'app-ui-pey-single-map',
  templateUrl: './ui-pey-single-map.component.html',
  styleUrls: ['./ui-pey-single-map.component.scss']
})

export class UiPeySingleMapComponent extends BaseComponent implements OnInit {

  protected ecommerces: Array<any> = null;
  protected serviceCategories: Array<ServiceCategory>;
  protected cords = new Subject<Array<number>>();
  protected latitud: number;
  protected longitud: number;
  protected filter: string = '';
  protected km: number = 5;
  protected selectdFilterServiceCategory: string = '0';

  protected map: google.maps.Map;
  protected myMarker: any = null;
  protected marker: any = null;
  protected geocoder: any = null;
  protected markerBounds;
  protected markers: any[];

  constructor(private mapsAPILoader: MapsAPILoader,
    private mapSearchService: MapSearchService,
    private spinnerService: NgxSpinnerService,
    private serviceCategoryService: ServiceCategoryService) {
    super();
  }

  ngOnInit() {
    this.markers = [];
    //Una Vez se pueda usar la API de google map se obtiene ubicación actual para obtener la dirección y se lanza el evento onNewAddress
    this.mapsAPILoader.load().then(() => {
      //Instancia objeto que calcula direcciones y geolocalizaciones
      this.geocoder = new google.maps.Geocoder();
      //Obtener geolocalización actual
      this.markerBounds = new google.maps.LatLngBounds();
      this.getCurrentGeolocation();
      this.serviceCategoryService.all().then((items: Array<ServiceCategory>) => {
        this.serviceCategories = items;
      });

    });
  }

  /**
   * try ready map
   * @param map 
   */
  public mapReady(map) {
    console.log(map)
    this.map = map;
    //this.map.addListener('click', this.placeMarkerAndPanTo);
    if (this.ecommerces && this.ecommerces.length > 0) {
      this.loadAllMarkes();
      this.map.fitBounds(this.markerBounds);
    }

  }

/**
 * get current position
 */
  getCurrentGeolocation() {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.onSuccessGeolocating,
        this.onErrorGeolocating,
        { enableHighAccuracy: true, maximumAge: Infinity}
      );
    }else{
      this.setError('Geolocation is not supported by this browser');
    }
  }

  onSuccessGeolocating = (position) => {
    const { latitude, longitude } = position.coords;
    this.cords.next([latitude, longitude]);
    //this.latitud = -34.85736308219589;
    //this.longitud = -58.08378879257855;
    console.log('latitude', latitude)
    console.log('longitude', longitude)

  }

  onErrorGeolocating = () => {
    console.log('onErrorGeolocating')

  }
  /**
   * add current location
   */
  addMyMarker = () => {
    let latLng = new google.maps.LatLng(this.latitud, this.longitud);

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
        position: new google.maps.LatLng(ecommerce.latitud, ecommerce.longitud), //new google.maps.LatLng(this.lat + this.getRandom(0.001, 0.003), this.lng + this.getRandom(0.001, 0.003)),
        map: this.map,
        title: ecommerce.bussinessName,
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
  /**
   * generate info card
   * @param ecommerce 
   */
  generateInfoCard(ecommerce: User): string {

    return `<div class="p-2">
                <div class="content-avatar"><img class="img-card" src=" ${ecommerce.avatarURL}"/></div>

                <div class="info-card">
                    <h2>${ecommerce.bussinessName}</h2>
                    <div>
                        <i class="fas fa-map-marker-alt"></i><h6 class="address">${ecommerce.address.street}, ${ecommerce.address.houseNumber}, ${ecommerce.address.city.label}, ${ecommerce.address.state.label}, ${ecommerce.address.country.label} </h6>
                    </div>
                    <div><i class="fas fa-envelope"></i><h6 class="email">${ecommerce.email}</h6></div>
                    <div><i class="fas fa-phone"></i><h6 class="phone">${ecommerce.phone}</h6></div>
                </div>
           </div>`

  }

  /**
     * search By filter (category and radio)
     */

  searchByFilters() {

    this.spinnerService.show();
    this.mapSearchService.searchByFilters(this.getParams(this.latitud, this.longitud, parseInt(this.selectdFilterServiceCategory), this.km)).then(
      (response: Array<User>) => {
        this.ecommerces = response;
        if (this.ecommerces && this.ecommerces.length > 0) {
          this.loadAllMarkes();
          this.map.fitBounds(this.markerBounds);
        } else {
          this.deleteMarker();
          this.addMyMarker();
        }
        this.spinnerService.hide();
        if (!response || response.length == 0) {
          this.setError("No se tienen comercios registrados en nuestra red Peygold cercanos a su ubicación y de acuerdo a los parámetros de búsqueda.");
        }
        this.spinnerService.hide();
      }
    ).catch(
      (error) => {
        this.spinnerService.hide();
        this.setError("Ha ocurrido un error. No será posible visualizar los comercios de nuestra red Peygold.");
      }
    )
  }

  /**
 * search By filter (category and radio)
 */

  searchByWord() {

    this.spinnerService.show();
    this.mapSearchService.searchByWord(this.filter, 5, this.latitud, this.longitud).then(
      (response: Array<User>) => {
        this.ecommerces = response;
        if (this.ecommerces && this.ecommerces.length > 0) {
          this.loadAllMarkes();
          this.map.fitBounds(this.markerBounds);
        } else {
          this.deleteMarker();
          this.addMyMarker();
        }
        this.spinnerService.hide();
        if (!response || response.length == 0) {
          this.setError("No se tienen comercios registrados en nuestra red Peygold cercanos a su ubicación y de acuerdo a los parámetros de búsqueda.");
        }
        this.spinnerService.hide();
      }
    ).catch(
      (error) => {
        this.spinnerService.hide();
        this.setError("Ha ocurrido un error. No será posible visualizar los comercios de nuestra red Peygold.");
      }
    )
  }



  /**
* set filter 
* @param filter service category
*/
  setFilterServiceCategory(filter: string) {
    this.filter = null;
    this.selectdFilterServiceCategory = filter && filter != '-1' ? filter : '0';
    console.log('category', this.selectdFilterServiceCategory)
    this.searchByFilters();
  }


  /**
 * search by km
 */
  setFilterByKM() {
    this.searchByFilters();
  }


  /**
 * search by word
 * @param event 
 */
  setFilterByWord(event?: any) {
    this.selectdFilterServiceCategory = '0';
    this.km = 5;
    if (this.filter.length > 3) {
      this.searchByWord();
    } else if (this.filter.length == 0) {
      this.filter = '';
      this.km = 5;
      this.selectdFilterServiceCategory = '0';
      this.searchByFilters();
    }
  }

  /**
   * get params structure
   * @param latitud 
   * @param longitud 
   * @param categoryId 
   * @param radio 
   */
  getParams(latitud: number, longitud: number, categoryId: number, radio: number): any {
    return {
      latitud: latitud,
      longitud: longitud,
      categoria: categoryId,
      radio: radio
    }
  }

  /**
   * after view init
   */
  ngAfterViewInit() {

    this.cords.subscribe(
      (data: Array<number>) => {
        if (data && data.length > 0) {
          this.latitud = data[0];
          this.longitud = data[1];
          //this.map.setCenter({lat:this.latitud,lng:this.longitud})
          console.log('this.latitud', this.latitud)
          console.log('this.longitud', this.longitud)
          this.spinnerService.show();
          this.mapSearchService.searchByFilters(this.getParams(this.latitud, this.longitud, parseInt(this.selectdFilterServiceCategory), this.km)).then(
            (response: Array<User>) => {

              this.ecommerces = response;
              if (this.ecommerces && this.ecommerces.length > 0) {
                this.loadAllMarkes();
                this.map.fitBounds(this.markerBounds);
              } else {
                this.deleteMarker();
                this.addMyMarker();
              }

              this.spinnerService.hide();
              if (!response || response.length == 0) {
                this.setError("No se tienen comercios registrados en nuestra red Peygold cercanos a su ubicación.");
              }
            }
          ).catch(
            (error) => {
              this.spinnerService.hide();
              this.setError("Ha ocurrido un error. No será posible visualizar los comercios de nuestra red Peygold.");
            }
          )

        }
      }
    );

  }
}
