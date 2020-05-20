import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Address, City, Country, DocumentType, Institution, ProfitInstitution, State, User} from '../../../../models';
import {AuthService} from '../../../auth-peygold/services/auth.service';
import {UserService} from '../../../../services/user.service';
import {InMemoryService, InstitutionService, LocationService} from '../../../../services';
import {BaseComponent} from '../base-component.component';
import {ErrorResponse} from '../../entities/error-response';
import {environment} from '../../../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-ui-pey-user-form',
  templateUrl: './ui-pey-user-form.component.html',
  styleUrls: ['./ui-pey-user-form.component.scss']
})
export class UIPeyUserFormComponent extends BaseComponent implements OnInit {

  @ViewChild('savePersonalDataButton',  { static: false }) savePersonalDataButton: any;
  @ViewChild('saveAddressButton',  { static: false }) saveAddressButton: any;
  @ViewChild('saveBillingAddressButton',  { static: false }) saveBillingAddressButton: any;

  @Input()
  protected user: User;

  private editableUser: User;

  private useSameAddress = false;
  protected address: Address;
  protected billingAddress: Address;
  private completeName: string;
  private activeView: string;
  private environment = environment;
  private institutions: Array<ProfitInstitution>;

  protected documentTypes: Array<DocumentType>;

  constructor(
    private inMemoryService: InMemoryService,
    private authService: AuthService,
    private userService: UserService,
    private institutionService: InstitutionService,
    private spinnerService:NgxSpinnerService
  ) {
    super();
  }

  ngOnInit() {
    console.log(this.user);
    this.editableUser = this.user;
    // Get the list of institutions
    this.institutionService.all().then((institutions: Array<Institution>) => {
      this.institutions = institutions.map((institution: Institution) => {
        return institution.toProfitInstitution();
      });

      let intitutionUser = this.institutions.filter(x => x.value == this.user.profitInstitution.value)[0];
      if(intitutionUser){
        this.editableUser.profitInstitution = new ProfitInstitution(intitutionUser.value, intitutionUser.label);
      }      
      
    });

    this.completeName = this.user.completeName;
    this.documentTypes = this.inMemoryService.documentTypes;
    this.useSameAddress = JSON.stringify(this.editableUser.address) === JSON.stringify(this.editableUser.billingAddress);
  }

  /**
   * Update the user image
   * @param file the File object
   */
  private updateImage(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result: string = reader.result as string;
      let data = '';

      if (result.includes(',')) {
        data = result.split(',')[1] || '';
      }

      this.userService.updateAvatar(this.editableUser, data, file.type, file.name).then(() => {
        this.scrollToTop();
        this.setDefaultSuccess();
        this.authService.reloadUser().then( (user: User) => this.editableUser = user);
      });
    };
    reader.onerror = (error) => {
      console.log(error);
    };
  }

  /**
   *
   */
  public save(): void {
    // Manual validation to present error message for each section
    console.log('entra')
    if (this.validatePersonalData(this.editableUser)) {
      this.activeView = 'personalData';
      this.savePersonalDataButton.nativeElement.click();
      return;
    }

    if (this.validateAddress(this.editableUser.address)) {
      this.activeView = 'address';
      this.saveAddressButton.nativeElement.click();
      return;
    }

    if (!this.useSameAddress && this.validateAddress(this.editableUser.billingAddress)) {
      this.activeView = 'billingAddress';
      this.saveBillingAddressButton.nativeElement.click();
      return;
    }

    console.log('update user',this.editableUser);
    this.spinnerService.show();
    this.userService.update(this.editableUser).then(() => {
      this.completeName = this.editableUser.completeName;
      this.spinnerService.hide();
      this.setDefaultSuccess();
      this.authService.reloadUser().then( (user: User) =>{ 
        console.log('reload user',user);
        this.editableUser = user
        let intitutionUser = this.institutions.filter(x => x.value == user.profitInstitution.value)[0];
        this.editableUser.profitInstitution = new ProfitInstitution(intitutionUser.value, intitutionUser.label);
        
      })
    }).catch(this.catchError)
      .finally(() => {
        this.spinnerService.hide();
      this.scrollToTop();
      this.editableUser.password = null;
    });
  }

  /**
   * Save the address data
   * @param address The address object
   * @return void
   */
  private saveAddress(address: Address): void {
    if (this.useSameAddress) {
      this.setBillingAddress(address);
    }
    this.setAddress(address);
    this.save();
  }

  /**
   * Set the address
   * @param address The address object
   */
  private setAddress(address: Address): void {
    this.editableUser.address = address;
  }

  /**
   * Set the address
   * @param address The address object
   */
  private setBillingAddress(address: Address): void {
    this.editableUser.billingAddress = address;
  }

  /**
   * Save the address data
   * @param address The address object
   * @return void
   */
  private saveBillingAddress(address: Address): void {
    this.setBillingAddress(address);
    this.save();
  }

  /**
   * Save the password
   */
  private savePassword() {
    this.save();
  }

  /**
   * Valida the required attributes in the user object
   * @param user the User object
   * @return boolean
   */
  private validatePersonalData(user: User): boolean {
    if(user.idUserType == 1){
      return !user.name
      || !user.lastName
      || !user.documentType
      || !user.documentNumber
      || !user.phone
      || !user.profitInstitution
      || !user.profitInstitution.value;
    }else{
      return !user.bussinessName
      || !user.cuit
      || !user.phone
      || !user.profitInstitution
      || !user.profitInstitution.value;
    }

  }

  /**
   * Valida the required attributes in the address object
   * @param address the Address object
   * @return boolean
   */
  private validateAddress(address: Address): boolean {
    return !address.street
          || !address.houseNumber
          || !address.buildingFloor
          || !address.zipCode
          || !address.city
          || !address.city.value
          || !address.state
          || !address.state.value
          || !address.country
          || !address.country.value;
  }
}
