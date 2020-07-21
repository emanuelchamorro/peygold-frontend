import {Component, Input, OnInit, ViewChild, ViewChildren, QueryList, ElementRef, SimpleChanges} from '@angular/core';
import {Address, City, Country, DocumentType, Institution, ProfitInstitution, State, User, Nationality} from '../../../../models';
import {AuthService} from '../../../auth-peygold/services/auth.service';
import {UserService} from '../../../../services/user.service';
import {InMemoryService, InstitutionService, LocationService} from '../../../../services';
import {BaseComponent} from '../base-component.component';
import {ErrorResponse} from '../../entities/error-response';
import {environment} from '../../../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { IvaCondition } from '../../../../models/iva-condition';
import { IIBBCondition } from '../../../../models/iibb-condition';
import { ServiceCategory } from '../../../../models/service-category';
import { ServiceCategoryService } from 'src/app/services/service-category.service';
import { IvaConditionService } from '../../../../services/iva-condition.service';
import { IibbConditionService } from '../../../../services/iibb-condition.service';
import { concat } from 'rxjs';
import { NgModel } from '@angular/forms';
import {routes} from '../../../eu-peygold/routes';
import {Document} from '../../../../models/document';

@Component({
  selector: 'app-ui-pey-user-form',
  templateUrl: './ui-pey-user-form.component.html',
  styleUrls: ['./ui-pey-user-form.component.scss']
})
export class UIPeyUserFormComponent extends BaseComponent implements OnInit {

  @ViewChild('savePersonalDataButton',  { static: false }) savePersonalDataButton: any;
  @ViewChild('saveAddressButton',  { static: false }) saveAddressButton: any;
  @ViewChild('saveBillingAddressButton',  { static: false }) saveBillingAddressButton: any;
  @ViewChild('saveContactInfoButton',  { static: false }) saveContactInfoButton: any;

  @ViewChildren('inputFile') inputFile: QueryList<ElementRef>;
  
  public routes = routes;
  @Input()
  protected user: User;
  @Input()
  public aView:string;

  public editableUser: User;

  private useSameAddress = false;
  protected address: Address;
  protected billingAddress: Address;
  private completeName: string;
  private activeView: string;
  private environment = environment;
  private institutions: Array<ProfitInstitution>;

  private nationalities: Array<Nationality>;
  private ivaConditions : Array<IvaCondition>;
  private iibbConditions : Array<IIBBCondition>;
  private serviceCategories : Array<ServiceCategory>;

  protected documentTypes: Array<DocumentType>;

  public step:number=0;

  private title:string;
  private message:string;
  private showImageBottom:boolean;
  private sendType:number;
  private routeTo: string;
  private buttonLabel:string;

  private identityDocuments: Array<any>;

  constructor(
    private inMemoryService: InMemoryService,
    private authService: AuthService,
    private userService: UserService,
    private institutionService: InstitutionService,
    private spinnerService:NgxSpinnerService,
    private iibbConditionService:IibbConditionService,
    private ivaConditionService: IvaConditionService,
    private serviceCategoryService:ServiceCategoryService,
    private locationService: LocationService,
  ) {
    super();
  }

  ngOnInit() {

    if(this.aView){
      this.activeView = this.aView;
    }

    console.log('aView',this.aView);
    console.log('activeView',this.activeView);


    this.editableUser = this.user;
    this.identityDocuments = new Array<any>();
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

    // Get the countries.
    this.locationService.getCountries().then((countries: Array<Country>) => {
      this.nationalities = countries;
    });

    this.completeName = this.user.completeName;
    this.documentTypes = this.inMemoryService.documentTypes;
    this.useSameAddress = JSON.stringify(this.editableUser.address) === JSON.stringify(this.editableUser.billingAddress);

    this.iibbConditionService.all().then((items: Array<IIBBCondition>) => {
      this.iibbConditions = items;
    });

    this.ivaConditionService.all().then((items: Array<IvaCondition>) => {
      this.ivaConditions = items;
    });

    this.serviceCategoryService.all().then((items: Array<ServiceCategory>) => {
      this.serviceCategories = items;
    });
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

    if (this.validateAddress(this.editableUser.address,this.editableUser,false)) {
      this.activeView = 'address';
      this.saveAddressButton.nativeElement.click();
      return;
    }

    if (!this.useSameAddress && this.validateAddress(this.editableUser.billingAddress,this.editableUser,true)) {
      this.activeView = 'billingAddress';
      this.saveBillingAddressButton.nativeElement.click();
      return;
    }

    if (!this.editableUser.isPerson && this.validateCantactInfo(this.editableUser)) {
      this.activeView = 'contactInfo';
      this.saveContactInfoButton.nativeElement.click();
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
    if(user.isPerson){
      return !user.name
      || !user.lastName
      || !user.documentType
      || !user.documentNumber
      || !user.nationality
      || !user.profitInstitution
      || !user.profitInstitution.value;
    }else if(user.isCompany){
      return !user.alias
      || !user.bussinessName
      || !user.cuit
      || !user.activity
      || !user.iibbCondition
      || !user.ivaCondition
      || !user.iibbNumber
      || !user.serviceCategory
      || !user.profitInstitution
      || !user.profitInstitution.value;
    }else{
      return !user.alias
      || !user.bussinessName
      || !user.cuit
      || !user.website
      || !user.mision
    }

  }

  /**
   * Valida the required attributes in the address object
   * @param address the Address object
   * @return boolean
   */
  private validateAddress(address: Address, user:User, isBillingAddress:boolean): boolean {

    if(!isBillingAddress){
      return !address.street
      || !address.houseNumber
      || !address.buildingFloor
      || !address.zipCode
      || !address.city
      || !address.city.value
      || !address.state
      || !address.state.value
      || !address.country
      || !address.country.value
      || !user.phone;
    }else{
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


    /**
   * Valida the required attributes in the user object
   * @param user the User object
   * @return boolean
   */
  private validateCantactInfo(user: User): boolean {
    return !user.contact.name
    || !user.contact.lastName
    || !user.contact.documentType
    || !user.contact.documentNumber
    || !user.contact.phone

  }

  /**
   * Send token security to phone
   */
  sendToken(){
    this.spinnerService.show();
    this.authService.sendToken(this.user.email,0).then((resp)=>{
      this.spinnerService.hide();
      if(resp.success){
        this.step++;
      }else{
        this.setError('Ha ocurrido un error enviando código de seguridad. No es posible completar el proceso de verificación.');
      }
    }).catch(
      (error)=>{
        this.spinnerService.hide();
        if(error.message.includes('is not a valid phone number')){
          this.setError('Ha ocurrido un error enviando código de seguridad. No es posible completar el proceso de verificación.');
        }else{
          this.setError('Ha ocurrido un error enviando código de seguridad. No es posible completar el proceso de verificación.');
        }
      }
    );
    
  }

    /**
   * Validate the form models
   */
  validateModels(validators: Array<NgModel>) : boolean{
    const valid = this.isValidFormModels(validators);

    return valid;
  }

    /**
   * Check the token
   */
  validateToken(validators: Array<NgModel>) {
    const valid = this.validateModels(validators);

    if (!valid) {
      return;
    }

    this.title = "¡Tu teléfono ya está verificado!";
    this.message = "Tu cuenta ya es más segura, gracias por ayudarnos a hacer que Peygold sea una plataforma confiable.";
    this.showImageBottom = false;
    this.buttonLabel = "Cerrar";

    this.step++;

    //TODO: DESCOMNETAR    
   /* this.spinnerService.show();
    this.authService.phoneNumberVerify(this.editableUser.prefixPhone+''+this.editableUser.phone, this.editableUser.token).then((response) => {
        setTimeout(()=>{
          this.authService.reloadUser().then( (user: User) =>{ 
            console.log('reload user',user);
            this.spinnerService.hide();
            this.editableUser = user
            let intitutionUser = this.institutions.filter(x => x.value == user.profitInstitution.value)[0];
            this.editableUser.profitInstitution = new ProfitInstitution(intitutionUser.value, intitutionUser.label);
            
          })
        },500)
      
    }).catch(() => {
      this.spinnerService.hide();
      this.setInputError('Código inválido. Vuelve a intentarlo');      
    });*/
  }

  /**
   * Clicked this for try eevent click
   * @param i 
   */

  clickedThis(i:number):void{
    let inputFieldArray = this.inputFile.filter((element,index) => element.nativeElement.id == 'doc-'+i );
    let inputElement = inputFieldArray[0];
    inputElement.nativeElement.click();
  }

  /**
   * Upload identity document
   */
  uploadImage($event:any, document:Document):void{
    let file:File =  $event.target[`files`][0];
    if(file){
      if(this.editableUser.isPerson){
        if(file.type != "image/jpeg"){
          this.setModalError("Debe adjuntar archivos con extensión 'jpeg', 'jpg' o 'png'.");
          file = null;
          return;
        }

      }else{
        if(file.type != "application/pdf"){
          this.setModalError("Debe adjuntar archivos con extensión 'pdf'.");
          file = null;
          return;
        }

      }     
      
    }

    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result: string = reader.result as string;
 
      if (result.includes(',')) {
        document.name = file.name;
        document.documentoPath = file.name;
        document.data = result.split(',')[1] || '';        
        document.mimeType = "image/jpeg";
        this.identityDocuments.push({
          name:document.name,
          data:document.data,
          mimeType:document.mimeType,
          IdTipoDocumento:parseInt(document.documentType.value)
        });
      }
    };
    reader.onerror = (error) => {
      console.log(error);
    }; 
  }

  sendDocument():void{
    if(this.editableUser.isPerson || this.editableUser.isCompany){
      if(!this.identityDocuments || this.identityDocuments.length < 3){
        this.setModalError("Debe adjuntar todos los documentos solicitados para continuar con el proceso de verificacón de identidad.");
        return;
      }
    }else{
      if(!this.identityDocuments || this.identityDocuments.length < 2){
        this.setModalError("Debe adjuntar todos los documentos solicitados para continuar con el proceso de verificacón de identidad.");
        return;
      }
    }
    console.log(this.identityDocuments);

    this.spinnerService.show();
    this.userService.addDocuments(this.identityDocuments).then(
      (resp)=>{
        
        console.log(resp);
        this.setModalSuccess("Los documentos de identidad se han enviado satisfactoriamente.");

        setTimeout(()=>{
          this.authService.reloadUser().then( (user: User) =>{ 
            console.log('reload user',user);
            this.spinnerService.hide();
            this.editableUser = user
            let intitutionUser = this.institutions.filter(x => x.value == user.profitInstitution.value)[0];
            this.editableUser.profitInstitution = new ProfitInstitution(intitutionUser.value, intitutionUser.label);
            
          })
        },500)
      }
    ).catch(
      (error)=>{
        this.spinnerService.hide();
        console.log(error);
        this.setModalError("Ha ocurrido un error enviando los documentos de identidad.");
      }
    )
  }

}
