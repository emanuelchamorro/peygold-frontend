import {Component, Input, OnInit} from '@angular/core';
import {City, Country, DocumentType, Role, State, User} from '../../../../models';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from '../../services/users.service';
import {InMemoryService, LocationService} from '../../../../services';
import {RolesService} from '../../services/roles.service';
import {ErrorResponse} from '../../../commons-peygold/entities/error-response';
import {BaseComponent} from '../base.component';

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
      this.availableRoles = roles;
    });
  }


  /**
   * Get the user info by the id.
   * @param id User id
   */
  private getUser(id: number): void {
    this.usersService.one(id).then((user: User) => {
      this.user = user;
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
    this.usersService.store(user).then((success: boolean)  => {
      console.log(success);
    }).catch((e: ErrorResponse) => {
      console.log(e);
    });
  }

  /**
   * Store the user data
   * @param user the user to be updated.
   * @return void;
   */
  private updateUser(user: User): void{
    this.usersService.update(user).then((success: boolean)  => {
      console.log(success);
    }).catch((e: ErrorResponse) => {
      console.log(e);
    });
  }
}
