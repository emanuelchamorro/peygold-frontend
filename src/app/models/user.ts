import {Address} from './address';
import {Model} from './model';
import {DocumentType} from './document-type';
import {Occupation} from './occupation';
import {Nationality} from './nationality';
import {ProfitInstitution} from './profit-institution';
import {Contact} from './contact';
import {Role} from './role';
import { IvaCondition } from './iva-condition';
import { IIBBCondition } from './iibb-condition';
import { ServiceCategory } from './service-category';
import {VerifyStatus} from './verify-status';
import {Document} from './document';
import {Card} from './card';
import { Status } from './status';

/**
 * User model
 */
export class User extends Model {
  static TYPE_PERSON      = 'person';
  static TYPE_COMPANY     = 'company';
  static TYPE_INSTITUTION = 'institution';
  static ADMIN_IDENTIFIER = 2;
  static PERSON = 1;
  static COMPANY = 2;
  static INSTITUTION = 3;

  public id: number;
  public avatarURL: string;
  public dateRegistered: string;
  public name: string;
  public lastName: string;
  public fullName: string;
  public documentType: DocumentType;
  public documentNumber: string;
  public phone: string;
  public prefixPhone:string;
  public email: string;
  public confirmEmail:string;
  public password: string;
  public idUserType: number;
  public idAspNetUser: string;
  public tac: boolean;
  public description: string;
  public newsLetter: boolean;
  public peygoldCommission: number;
  public token: string;
  public accessToken: string;
  public bussinessName: string;
  public cuit: string;
  public website: string;
  public volunteerQuantity: number;
  public commission: number;
  public employeeQuantity: number;
  public bankAccounts: Array<any>;
  public annualIncome: number;
  public instagram: string;
  public youtube: string;
  public linkedIn: string;
  public twitter: string;
  public facebook: string;
  public roles: Array<Role>;
  public rolesTemp: Array<Role>;
  public primaryActivityName: string;
  public documents: Array<Document>;
  public locals: Array<any>;
  public contact: Contact;
  public profitInstitution: ProfitInstitution;
  public occupation: Occupation;
  public nationality: Nationality;
  public address: Address = new Address();
  public billingAddress: Address;
  public idPrimaryActivity: number;
  public systemUserTypeId: number;
  public canChargePeygold: boolean;
  public rememberMe: boolean;
  public active: boolean;
  public deviceIsValid: boolean;
  public alias:string;
  public activity:string;
  public ivaCondition: IvaCondition;
  public iibbCondition: IIBBCondition;
  public serviceCategory:ServiceCategory;
  public iibbNumber:string;
  public mision:string;
  public phoneNumberConfirmedStatus:VerifyStatus;
  public identityVerified:VerifyStatus;
  public isLoadAlldocuemnts:boolean;
  public cards: Array<Card>;


  /**
   * Get the user complete Name
   * @return string the complete name
   */
  get completeName(): string {
    if (this.systemUserTypeId == 1) {
      if (this.cuit) {
        return this.fullName || this.bussinessName;
      }else{
        return this.fullName || this.name + ' ' + this.lastName;
      }

    }else{
      return this.fullName || this.name + ' ' + this.lastName;
    }


    
  }

  /**
   * Get the user initials name
   * @return string the initials name
   */
  get initials(): string {
    const completeName = this.completeName;

    if (!completeName) {
      return '';
    }

    let initials = '';

    completeName.split(' ').map((name) => initials += name.charAt(0));

    return initials;
  }

  /**
   * Add new role.
   * @param name role name.
   */
  addRole(name: string) {
    if (! this.roles) {
      this.roles = new Array<Role>();
      this.rolesTemp = new Array<Role>();
    }
    this.roles.push(new Role(name, name));
    this.rolesTemp.push(new Role(name, name));
  }

  /**
   * Get
   */
  get isAdmin(): boolean {
    if (! this.systemUserTypeId) {
      return false;
    }

    return this.systemUserTypeId === User.ADMIN_IDENTIFIER;
  }

  /**
   * Returns the object to send the payload to update the user.
   */
  get dataForUpdate(): object {
    const data: any = {};

    
    if(this.isPerson){
      data.IdNacionalidad = parseInt(this.nationality.id);
    }

    data.phone = this.prefixPhone+''+this.phone;

    if(this.isCompany){
      data.AliasInstitucion = this.alias;
      data.IdCategoriaComercio = parseInt(this.serviceCategory.id);
      data.IdCondicionIB = parseInt(this.iibbCondition.id);
      data.IdCondicionIva = parseInt(this.ivaCondition.id);
      data.Actividad = this.activity;
      data.NumeroIB =this.iibbNumber;
    }

    if(this.isInstitution){
      data.InstitutionWebSite = this.website;
     data.AliasInstitucion = this.alias; 
      data.MisionInstitucion = this.mision;
    }
  
    if (this.profitInstitution) {
      data.idInstitution = parseInt(this.profitInstitution.value);
    }

    data.facebook = this.facebook;
    data.instagram = this.instagram;
    data.linkedin = this.linkedIn;   
    data.twitter = this.twitter;
    data.youtube = this.youtube;

    data.address = {
      idCountry: this.address.country.value,
      idState: this.address.state.value,
      idCity: this.address.city.value,
      floor: this.address.buildingFloor,
      houseNumber: this.address.houseNumber,
      postalCode: this.address.zipCode,
      street: this.address.street,
    }

    data.billingAddress = {
      idBillingCountry: this.billingAddress.country.value,
      idBillingState: this.billingAddress.state.value,
      idBillingCity: this.billingAddress.city.value,
      billingFloor: this.billingAddress.buildingFloor,
      billingHouseNumber: this.billingAddress.houseNumber,
      billingPostalCode: this.billingAddress.zipCode,
      billingStreet: this.billingAddress.street,
    }

    if(!this.isPerson){
      data.contactPerson = {
        ContactName: this.contact.name,
        ContactLastName: this.contact.lastName,
        ContactTipoDocumento: this.contact.documentType.id,
        ContactNumeroDocumento: this.contact.documentNumber,
        ContactPhone: this.contact.phone,
        ContactEmail: this.contact.email
      }
    }

    if (this.password) {
      data.userSignIn	= {
        password: this.password,
        confirmPassword: this.password,
      };
    }

    data.idUser = this.id;

    return data;
  }

      /**
   * Get
   */
  get isPerson(): boolean {
    if (! this.idUserType) {
      return false;
    }

    return this.idUserType != User.COMPANY && this.idUserType != User.INSTITUTION;
  }

    /**
   * Get
   */
  get isCompany(): boolean {
    if (! this.idUserType) {
      return false;
    }

    return this.idUserType === User.COMPANY;
  }


      /**
   * Get
   */
  get isInstitution(): boolean {
    if (! this.idUserType) {
      return false;
    }

    return this.idUserType === User.INSTITUTION;
  }

  /**
   * get veirfied account user
   */
  get isVerifiedAccount(): boolean{
    return this.phoneNumberConfirmedStatus.verified && this.identityVerified.verified;
  }

  get currentCard():Card{
    const card =  new Card();
    card.id = 1;
    card.number = '3456 0987 7564 0009'
    card.status = new Status('2','Activa');
    card.dueDate = '01/2040'
    card.amount = 5600;
    card.pin = '4321'
    return card;
    //return null;
  }
}

