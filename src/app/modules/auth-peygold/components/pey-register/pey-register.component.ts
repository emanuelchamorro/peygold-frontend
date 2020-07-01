import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {City, Company, Country, DocumentType, Institution, Occupation, Person, ProfitInstitution, State, User, Nationality, Contact} from '../../../../models';
import {LocationService, InstitutionService, OccupationService, InMemoryService} from '../../../../services';
import {AuthService} from '../../services/auth.service';
import {environment} from '../../../../../environments/environment';
import {NgModel} from '@angular/forms';
import {BaseComponent} from '../../components/base.component';;
import {ErrorResponse} from '../../../commons-peygold/entities/error-response';
import {OK} from 'http-status-codes';
import { NgxSpinnerService } from 'ngx-spinner';
import { IvaCondition } from '../../../../models/iva-condition';
import { IIBBCondition } from '../../../../models/iibb-condition';
import { ServiceCategory } from '../../../../models/service-category';
import {IibbConditionService} from '../../../../services/iibb-condition.service';
import {IvaConditionService} from '../../../../services/iva-condition.service';
import {ServiceCategoryService} from '../../../../services/service-category.service';

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
    private spinnerService:NgxSpinnerService,
    private iibbConditionService:IibbConditionService,
    private ivaConditionService: IvaConditionService,
    private serviceCategoryService:ServiceCategoryService
  ) {
    super();
  }

  public type: string;
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
  private nationalities: Array<Nationality>;
  private ivaConditions : Array<IvaCondition>;
  private iibbConditions : Array<IIBBCondition>;
  private serviceCategories : Array<ServiceCategory>;

  /**
   * On init implementation
   */
  ngOnInit() {
    this.step = 1;
    this.type = this.route.snapshot.data[`type`];
    console.log('type',this.type);
    // Get the countries.
    this.locationService.getCountries().then((countries: Array<Country>) => {
      this.countries = countries;
      this.nationalities = countries;
    });

    // Get the list of institutions
    this.institutionService.all().then((institutions: Array<Institution>) => {
      this.institutions = institutions.map((institution: Institution) => {
        return institution.toProfitInstitution();
      });
    });
    this.documentTypes = this.inMemoryService.documentTypes;
    switch (this.type) {
      case User.TYPE_PERSON:
      //TODO: REMPLAZAR POR CONSULTAR CATEGORIAS
        this.user = new Person();
        break;
      case User.TYPE_COMPANY:
      //TODO:CONSULTAR LAS LISTAS DESPLEGABLES
        this.user = new Company();
        this.user.contact = new Contact();

        this.iibbConditionService.all().then((items: Array<IIBBCondition>) => {
          this.iibbConditions = items;
        });

        this.ivaConditionService.all().then((items: Array<IvaCondition>) => {
          this.ivaConditions = items;
        });

        this.serviceCategoryService.all().then((items: Array<ServiceCategory>) => {
          this.serviceCategories = items;
        });
        break;
      case User.TYPE_INSTITUTION:
        this.user = new Institution();
        this.user.contact = new Contact();
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
      this.user.prefixPhone = this.user.address.country.numericPrefix;
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
