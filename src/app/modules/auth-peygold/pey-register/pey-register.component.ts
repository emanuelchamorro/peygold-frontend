import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../models/user';
import {Person} from '../../../models/person';
import {Company} from '../../../models/company';
import {Institution} from '../../../models/institution';
import {LocationService} from '../../../services/location.service';
import {Country} from '../../../models/country';
import {State} from '../../../models/state';
import {City} from '../../../models/city';
import {InstitutionService} from '../../../services/institution.service';
import {ProfitInstitution} from '../../../models/profit-institution';
import {AuthService} from '../services/auth.service';
import {Occupation} from '../../../models/occupation';
import {OccupationService} from '../../../services/occupation.service';
import {InMemoryService} from '../../../services/in-memory.service';
import {DocumentType} from '../../../models/document-type';

@Component({
  selector: 'app-pey-register',
  templateUrl: './pey-register.component.html',
  styleUrls: ['./pey-register.component.scss']
})
export class PeyRegisterComponent implements OnInit {

  /**
   * PeyRegisterComponent
   * @param route Provider
   * @param router Provider
   * @param locationService Provider
   * @param institutionService Provider
   * @param occupationService Provider
   * @param authService Provider
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService,
    private institutionService: InstitutionService,
    private occupationService: OccupationService,
    private authService: AuthService,
    private inMemoryService: InMemoryService,
  ) { }

  private type: string;
  private user: User;
  private step = 1;
  private countries: Array<Country>;
  private states: Array<State>;
  private cities: Array<City>;
  private institutions: Array<ProfitInstitution>;
  private occupations: Array<Occupation>;
  private documentsType: Array<DocumentType>;

  ngOnInit() {
    this.type = this.route.snapshot.data[`type`];
    // Get the countries.
    this.locationService.getCountries().then((countries: Array<Country>) => {
      this.countries = countries;
    });

    // Get the list of institutions
    this.institutionService.all().then((institutions: Array<Institution>) => {
      this.institutions = institutions.map((institution: Institution) => {
        return institution.toProfitInstitution();
      });
    });

    switch (this.type) {
      case User.TYPE_PERSON:
        this.user = new Person();
        this.occupationService.all().then((occupations: Array<Occupation>) => {
          this.occupations = occupations;
        });
        this.documentsType = this.inMemoryService.documentsType;

        break;
      case User.TYPE_COMPANY:
        this.user = new Company();
        break;
      case User.TYPE_INSTITUTION:
        this.user = new Institution();
        break;
      default:
        this.user = null;
    }
  }

  /**
   * Checks if the register form is able to continue with the next step.
   * @return void;
   */
  nextStep(): void {
    window.scroll(0,0);
    this.step++;
  }

  /**
   * Checks if the register form is able to continue with the next step.
   * @return void;
   */
  previoustStep(): void {
    this.step--;
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
   * @return void;
   */
  cleanState(): void {
    this.user.address.state = null;
    this.states = [];
  }

  /**
   * Checks if the register form is able to continue with the next step.
   */
  isValidForm(): boolean {
    let valid = false;

    if (this.step === 1) {
      valid = true;
    }

    return valid;
  }

  /**
   * Register the new user
   */
  signUp(): void {
    let signUpPromise: Promise<boolean>;
    switch (this.type) {
      case User.TYPE_COMPANY:
        signUpPromise = this.authService.signUpCompany( this.user as Company);
        break;
      case User.TYPE_INSTITUTION:
        signUpPromise = this.authService.signUpInstitution( this.user as Institution);
        break;
      case User.TYPE_PERSON:
      default:
        signUpPromise = this.authService.signUpPerson( this.user as Person);
        break;
    }

    signUpPromise.then((success) => {
      if (success) {
        this.router.navigateByUrl('/login');
      }
    }).catch((e: any) => {
      console.log(e);
    });
  }
}
