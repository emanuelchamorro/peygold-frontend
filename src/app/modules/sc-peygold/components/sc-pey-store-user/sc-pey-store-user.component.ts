import {Component, Input, OnInit} from '@angular/core';
import {City, Country, DocumentType, Role, State, User} from '../../../../models';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from '../../services/users.service';
import {InMemoryService, LocationService} from '../../../../services';
import {RolesService} from '../../services/roles.service';
import {ErrorResponse} from '../../../commons-peygold/entities/error-response';
import {BaseComponent} from '../base.component';
import { UserFactory } from '../../../../factory/user-factory';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sc-pey-store-user',
  templateUrl: './sc-pey-store-user.component.html',
  styleUrls: ['./sc-pey-store-user.component.scss']
})
export class ScPeyStoreUserComponent extends BaseComponent implements OnInit {

  @Input() private user: User;

  private countries: Array<Country>;
  private states: Array<State>;
  private cities: Array<City>;
  private documentTypes: Array<DocumentType>;
  private availableRoles: Array<Role>;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private locationService: LocationService,
    private rolesService: RolesService,
    private inMemoryService: InMemoryService,
    protected router: Router,
    private spinnerService: NgxSpinnerService
  ) {
    super();
    const userId = Number(this.route.snapshot.paramMap.get('userId'));

    if (userId && ! isNaN(userId)) {
      this.getUser(userId);
      return;
    }

    this.user = new User();
  }

  /**
   * On init implementation
   */
  ngOnInit() {
    // Get the countries.
    this.locationService.getCountries().then((countries: Array<Country>) => {
      this.countries = countries;
    });
    this.documentTypes = this.inMemoryService.documentTypes;
    this.rolesService.all().then((roles: Array<Role>) => {
      if(this.user && this.user.idUserType && this.user.idUserType!=5){
        this.availableRoles = roles;
      }else{
        this.availableRoles = roles.filter(rol => rol.name!= "Client");
      }
      
    });
  }


  /**
   * Get the user info by the id.
   * @param id User id
   */
  private getUser(id: number): void {
    this.spinnerService.show();
    this.usersService.one(id).then((user: User) => {
      
      console.log('user',user);
      const countriesTemp = this.countries.filter(x => x.value == user.address.country.value);
      if(countriesTemp.length > 0){
          user.address.country.label = countriesTemp[0].label;
      }
      
      this.locationService.getStates(user.address.country).then((states: Array<State>) => {
        this.states = states;
        const statesTemp = states.filter(x => x.value == user.address.state.value);
        if(statesTemp.length > 0 ){
          user.address.state.label = statesTemp[0].label;
        }        
        this.locationService.getCities(user.address.state).then((cities: Array<City>) => {
          this.cities = cities;
          const citiesTemp = cities.filter(x => x.value == user.address.city.value);
          if(citiesTemp.length > 0){
            user.address.city.label = citiesTemp[0].label;
          } 
          this.rolesService.all().then((roles: Array<Role>) => {
            if(user.idUserType && user.idUserType!=5){
              this.availableRoles = roles;
            }else{
              this.availableRoles = roles.filter(rol => rol.name!= "Client");
            }
            this.user = user;                  
            this.spinnerService.hide();
          }); 

        });
      });

    });
  }

  /**
   * Get the states by the selected country
   * @return void;
   */
  getStates(): void {
    this.cleanState();
    this.cleanCity();
    if (this.user.address.country) {
      this.locationService.getStates(this.user.address.country).then((states: Array<State>) => {
        this.states = states;
        
      });
    }
  }

  /**
   * Get the cities by the selected  state
   * @return void
   */
  getCities(): void {
    this.cleanCity();
    if (this.user.address.state) {
      this.locationService.getCities(this.user.address.state).then((cities: Array<City>) => {
        this.cities = cities;
      });
    }
  }

  /**
   * Remove the selected city
   * @return void
   */
  cleanCity(): void {
    this.user.address.city = null;
    this.cities = [];
  }

  /**
   * Remove the selected state
   * @return void
   */
  cleanState(): void {
    this.user.address.state = null;
    this.states = [];
  }

  /**
   * Store the user data
   * @param user the user to be stored.
   * @return void;
   */
  onSubmit(user: User): void {
    if(user.id) {
      this.updateUser(user);
      return;
    }

    this.createUser(user);
  }

  /**
   * Store the user data
   * @param user the user to be created.
   * @return void;
   */
  private createUser(user: User): void{
    console.log(UserFactory.make(user));
    this.spinnerService.show();
    this.usersService.store(UserFactory.make(user)).then((success: boolean)  => {
      this.spinnerService.hide();
      this.setSuccess("El usuario fué registrado exitosamente.");
      console.log(success);
    }).catch((e: ErrorResponse) => {
      this.spinnerService.hide();
      this.setError("Ha ocurrido un error. El usuario no fué registrado.");
      console.log(e);
    });
  }

  /**
   * Store the user data
   * @param user the user to be updated.
   * @return void;
   */
  private updateUser(user: User): void{
    this.spinnerService.show();
    this.usersService.update(UserFactory.makeToUpdate(user)).then((success: boolean)  => {
      this.spinnerService.hide();
      this.setSuccess("El usuario fué actualizado exitosamente.");
      console.log(success);
    }).catch((e: ErrorResponse) => {
      this.spinnerService.hide();
      this.setError("Ha ocurrido un error. El usuario no fué actualizado.");
      console.log(e);
    });
  }
}
