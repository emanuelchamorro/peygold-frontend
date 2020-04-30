import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {City, Company, Country, DocumentType, Institution, Occupation, Person, ProfitInstitution, State, User} from '../../../../models';
import {LocationService, InstitutionService, OccupationService, InMemoryService} from '../../../../services';
import {AuthService} from '../../services/auth.service';
import {environment} from '../../../../../environments/environment';
import {NgModel} from '@angular/forms';
import {BaseComponent} from '../../components/base.component';;
import {ErrorResponse} from '../../../commons-peygold/entities/error-response';
import {OK} from 'http-status-codes';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pey-register',
  templateUrl: './pey-register.component.html',
  styleUrls: ['./pey-register.component.scss']
})
export class PeyRegisterComponent extends BaseComponent implements OnInit, OnDestroy {

  /**
   * PeyRegisterComponent
   * @param route Provider
   * @param router Provider
   * @param locationService Provider
   * @param institutionService Provider
   * @param occupationService Provider
   * @param authService Provider
   * @param inMemoryService Provider
   */
  constructor(
    private route: ActivatedRoute,
    private locationService: LocationService,
    private institutionService: InstitutionService,
    private occupationService: OccupationService,
    private authService: AuthService,
    private inMemoryService: InMemoryService,
    protected router: Router,
    private spinnerService:NgxSpinnerService
  ) {
    super();
  }

  private type: string;
  private user: User = new User();
  private step: number;
  private countries: Array<Country>;
  private states: Array<State>;
  private cities: Array<City>;
  private institutions: Array<ProfitInstitution>;
  private occupations: Array<Occupation>;
  private documentTypes: Array<DocumentType>;
  private environment = environment;
  private tryNextStep = false;
  private trySubmit = false;

  /**
   * On init implementation
   */
  ngOnInit() {
    this.step = 1;
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
        this.documentTypes = this.inMemoryService.documentTypes;

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
  previoustStep(): void {
    this.step--;
  }

  /**
   * Submit the form.
   * @return void;
   */
  nextStep(validators: Array<NgModel>): void {
    const valid = this.isValidFormModels(validators);

    if (! valid) {
      this.tryNextStep = true;
      return;
    }

    window.scroll(0,0);
    this.step++;
    return;
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
   * Register the new user
   * @return void
   */
  signUp(validators: Array<NgModel>): void {
    const valid = this.isValidFormModels(validators);

    if (! valid) {
      this.trySubmit = true;
      return;
    }

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
    this.spinnerService.show();
    signUpPromise.then(
      (resp)=>{
        this.spinnerService.hide();
        this.user = new User();
        this.router.navigateByUrl(this.routes.register.success.href, {
          state : {
            securedRedirection: true
          }
        });
      }
      
    ).catch((e: ErrorResponse) => {
      this.spinnerService.hide();
      if (e.code === OK) {
        // Hack for pass the not valid json response.
        return this.signUpSuccessful();
      }
      console.log(e)
      this.catchError(e);
      window.scroll(0,0);
    });
  }

  /**
   * Go to success sign up page.
   * @return void
   */
  signUpSuccessful(): void {
    this.user = new User();
    this.router.navigateByUrl(this.routes.register.success.href, {
      state : {
        securedRedirection: true
      }
    });
  }

  /**
   * On destroy implementation
   */
  ngOnDestroy() {
    this.type = null;
    this.user = new User();
  }
}
