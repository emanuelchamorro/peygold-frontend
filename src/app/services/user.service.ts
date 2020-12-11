import { Injectable } from '@angular/core';
import { Address, City, Contact, Country, ProfitInstitution, State, User, Nationality, DocumentType } from '../models';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { InMemoryService } from './in-memory.service';
import { config } from 'rxjs';
import { IIBBCondition } from '../models/iibb-condition';
import { IvaCondition } from '../models/iva-condition';
import { ServiceCategory } from '../models/service-category';
import { VerifyStatus } from '../models/verify-status';
import { Document } from '../models/document';
import { Card } from '../models/card';
import { Status } from '../models/status';
import { CardType } from '../models/card-type';
import { CommonsService } from './commons.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpService {

  constructor( 
    protected http: HttpClient,
    protected inMemoryService: InMemoryService
    
  ) {
    super(http);
  }

  /**
   * Get user by the identifier.
   * @param id identifier
   */
  one(id: number): Promise<User> {
    const resourceUrl = '/users/' + id;
    console.log(resourceUrl);
    return this.get(resourceUrl).toPromise().then((response: any) => {
      console.log(response);
      const user = new User();
      user.id = response.idUser;
      user.idAspNetUser = response.idAspNetUser;
      this.getImage(environment.api.avatarUrl + response.avatarURL).then(
        (resp)=>{
          user.avatarURL = resp;
        }
      );
      
      user.dateRegistered = response.dateRegistered;
      user.name = response.firstName;
      user.lastName = response.lastName;
      user.fullName = response.fullName;

      if (response.phone.includes('+')) {
        user.prefixPhone = response.phone.substr(0, 3);
        user.phone = response.phone.replace(user.prefixPhone, '');
      } else {
        user.phone = response.phone;
      }

      user.email = response.email;
      user.idUserType = response.idUserType;
      user.cuit = response.cuit;
      user.documentType = this.inMemoryService.documentTypeByValue(response.cardId ? response.cardId : 'DNI');
      user.documentNumber = response.dni;
      user.bussinessName = response.socialReason;
      user.profitInstitution = new ProfitInstitution(response.idInstitution);
      user.newsLetter = response.newsLetter;
      user.website = response.institutionWebSite;
      user.employeeQuantity = response.employeeQuantity;
      user.bankAccounts = response.bankAccounts;
      user.annualIncome = response.annualIncome;
      user.instagram = response.instagram;
      user.youtube = response.youtube;
      user.linkedIn = response.linkedIn;
      user.twitter = response.twitter;
      user.facebook = response.facebook;
      user.systemUserTypeId = response.systemUserTypeId;
      if (response.roles) {
        response.roles.map((role: any) => {
          user.addRole(role);
        });
      }

      user.primaryActivityName = response.primaryActivityName;
      user.isLoadAlldocuemnts = false;

      //response.documents = null;

      if (response.documents && response.documents.length > 0) {
        user.documents = response.documents.map((item: any) => {
          const document = new Document();
          document.idDocument = item.idDocument;
          document.name = item.documentoPath.split("/")[3];
          document.documentoPath = environment.api.avatarUrl + item.documentoPath;
          document.documentType = new DocumentType(item.idTipoDocumento);
           
          if (user.isPerson) {

            switch (item.idTipoDocumento) {
              case 1:
                document.spanLabel = "Imagen del frente del DNI";
                break;
              case 2:
                document.spanLabel = "Imagen del dorso del DNI";
                break;
              case 3:
                document.spanLabel = "Selfie con tu DNI";
                break;
            }
          } else if (user.isCompany) {

            switch (item.idTipoDocumento) {
              case 4:
                document.spanLabel = "Constancia de CUIT";
                break;
              case 5:
                document.spanLabel = "Constancia de Ingresos Brutos";
                break;
              case 6:
                document.spanLabel = "Acta de designación de autoridades o poder del firmante";
                break;
            }
          } else if (user.isInstitution) {
            switch (item.idTipoDocumento) {
              case 4:
                document.spanLabel = "Constancia de CUIT";
                break;
              case 7:
                document.spanLabel = "Estatuto de la institucion";
                break;
            }
          }
          return document;
        });

        if (user.isPerson || user.isCompany) {
          if (user.documents.length == 3) {
            user.isLoadAlldocuemnts = true;
          }
        }else{
          if (user.documents.length == 2) {
            user.isLoadAlldocuemnts = true;
          }
        }


      } else {
        user.documents = new Array<Document>();
        if (user.isPerson) {
          user.documents.push(new Document(new DocumentType('1'), "Imagen del frente del DNI"));
          user.documents.push(new Document(new DocumentType('2'), "Imagen del dorso del DNI"));
          user.documents.push(new Document(new DocumentType('3'), "Selfie con tu DNI"));
        } else if (user.isCompany) {
          user.documents.push(new Document(new DocumentType('4'), "Constancia de CUIT"));
          user.documents.push(new Document(new DocumentType('5'), "Constancia de Ingresos Brutos"));
          user.documents.push(new Document(new DocumentType('6'), "Acta de designación de autoridades o poder del firmante"));
        } else if (user.isInstitution) {
          user.documents.push(new Document(new DocumentType('4'), "Constancia de CUIT"));
          user.documents.push(new Document(new DocumentType('7'), "Estatuto de la institucion"));
        }

      }

      user.locals = response.locals;

      const address = new Address();
      address.street = response.street;
      address.houseNumber = response.houseNumber;
      address.buildingFloor = response.floor;
      address.zipCode = response.postalCode;
      address.city = new City(response.idCity, response.cityName);
      address.state = new State(response.idState, response.stateName);
      address.country = new Country(response.idCountry, response.countryName);
      user.address = address;

      const billingAddress = new Address();
      billingAddress.street = response.billingStreet;
      billingAddress.houseNumber = response.billingHouseNumber;
      billingAddress.buildingFloor = response.billingFloor;
      billingAddress.zipCode = response.billingPostalCode;
      billingAddress.city = new City(response.idBillingCity);
      billingAddress.state = new State(response.idBillingState);
      billingAddress.country = new Country(response.idBillingCountry);
      user.billingAddress = billingAddress;

      const contact = new Contact();
      contact.email = response.contactEmail;
      contact.name = response.contactName;
      contact.lastName = response.contactLastName;
      contact.phone = response.contactPhone;
      if (response.contactTipoDocumento) {
        contact.documentType = new DocumentType(response.contactTipoDocumento, response.contactTipoDocumento);
      }
      contact.documentNumber = response.contactNumeroDocumento;


      user.contact = contact;

      if (response.nacionalidad) {
        user.nationality = new Nationality(response.nacionalidad.idNacionalidad, response.nacionalidad.nombreNacionalidad, response.nacionalidad.prefijoTelefonico);
      }

      user.alias = response.aliasInstitucion;
      user.mision = response.misionInstitucion;

      user.activity = response.actividad;
      user.iibbNumber = response.numeroIB;
      if (response.idCondicionIB) {
        user.iibbCondition = new IIBBCondition(response.idCondicionIB, response.nombreCondicionIB);
      }

      if (response.idCondicionIva) {
        user.ivaCondition = new IvaCondition(response.idCondicionIva, response.nombreCondicionIva);
      }

      if (response.idCategoriaComercio) {
        user.serviceCategory = new ServiceCategory(response.idCategoriaComercio, response.nombreCategoriaComercio);
      }

     //user.phoneNumberConfirmedStatus = new VerifyStatus(response.phoneNumberConfirmed);
     //user.identityVerified = new VerifyStatus(response.identityVerified);

      user.phoneNumberConfirmedStatus = new VerifyStatus(true);
      user.identityVerified = new VerifyStatus(true);

      user.prepaidCards = response.tarjetasPrepagas.map( (c:any) =>{
          let card = new Card();
          card.id = c.idTarjetaPrepaga;
          card.creationDate = c.creationDate;
          card.number = c.number;
          card.status = new Status(String(c.status));
          card.securityCode = c.securityCode;
          card.amount = c.amount;
          card.pin = c.pin;
          card.yearExpiration = c.yearExpiration;
          card.monthExpiration = c.monthExpiration;
          card.user = new User();
          card.user.id = c.id;
          card.creditCardType = new CardType(c.creditCardType);
          return card;
      })

      //qr image
      //user.qrImage = 'qr';

      return user;
    });
  }

  /**
   * Get the user by a keyword. Filtered by the user name or user email
   */
  search(keyword: string): Promise<Array<User>> {
    return this.get(`/users/search/${keyword}/1/30`)
      .pipe(
        map((result: any) => result.userDTOs.map(
          (user) => this.castUser(user))
        )
      )
      .toPromise().catch(() => []);
  }

  /**
   * Cast the user response to a User model.
   * @param user from the response
   */
  private castUser(user: any): User {
    const mUser = new User();
    mUser.id = user.idUser;
    mUser.idAspNetUser = user.idAspNetUser;
    mUser.name = user.firstName;
    mUser.lastName = user.lastName;
    mUser.email = user.email;
    mUser.phone = user.phone;
    mUser.avatarURL = environment.api.avatarUrl + user.avatarURL;
    mUser.dateRegistered = user.dateRegistered;
    mUser.fullName = user.fullName;
    mUser.idUserType = user.idUserType;
    mUser.active = user.active;
    return mUser;
  }

  /**
   * Update the user's avatar
   * @param user user object
   * @param data image source in base64
   * @param mimeType image mime-type
   * @param name image name
   */
  public updateAvatar(user: User, data: any, mimeType: string, name: string): Promise<any> {
    return this.put(`/users/update-avatar/${user.id}`, {
      avatar: {
        data,
        mimeType,
        name
      },
      userId: user.id
    }, {
        responseType: 'text'
      }).toPromise();
  }

  /**
   * Update the user
   * @param user The user data to update
   */
  public update(user: User): Promise<any> {
    return this.put(`/users/${user.id}`, user.dataForUpdate).toPromise();
  }

  /**
   * Adjustment document identity.
   * @param documents 
   */
  public addDocuments(documents: Array<any>): Promise<any> {
    return this.post('/users/AddDocuments', { Documents: documents }).toPromise();
  }

  getImage(url:string):Promise<string>{
    return this.get(url).toPromise().then(
      (resp)=>{
        return url;
      }
    ).catch(
      (error)=>{
        return null;
      }
    )
  }
}
