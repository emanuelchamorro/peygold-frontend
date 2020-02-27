import { Injectable } from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {HttpClient} from '@angular/common/http';
import {PaginationResponse} from '../../commons-peygold/entities/pagination-response';
import {InsuranceCarrier} from '../../../models/insurance-carrier';
import { User } from '../../../models/user';
import { Address } from '../../../models/address';
import { Country } from '../../../models/country';
import { State } from '../../../models/state';
import { City } from '../../../models/city';
import { Bank } from '../../../models/bank';
import { BanksService } from '../../../services/banks.service';
import { LocationService } from '../../../services/location.service';

@Injectable({
  providedIn: 'root'
})

export class InsuranceCarrierService extends HttpService {

  constructor(protected http: HttpClient, protected banksService:BanksService,
    protected locationService:LocationService) {
    super(http);
  }

  search(page:number, perPage:number, word?:string): Promise<PaginationResponse>{
    const paginator = new PaginationResponse(page, perPage);
    const url = word && word!='' ? `/insurancecarriers/search/${page}/${perPage}/${word}` : `/insurancecarriers/search/${page}/${perPage}`
    return this.get(url).toPromise().then(
      (response)=>{
        paginator.count = response.recordCount;
        paginator.data = response.insurancesDTOs.map((item:any)=>{
          const insurancecarrier = new InsuranceCarrier();
          insurancecarrier.id = item.insuranceCarrierId;
          insurancecarrier.socialReason = item.insuranceSocialReason;
          insurancecarrier.cuit = item.insuranceCUIT;
          insurancecarrier.contactUser = new User();
          insurancecarrier.contactUser.name = item.contactName;
          insurancecarrier.contactUser.phone = item.contactPhone;
          insurancecarrier.contactUser.email = item.contactEmail;
          insurancecarrier.address = new Address();
          insurancecarrier.address.street = item.street;
          insurancecarrier.address.houseNumber = item.houseNumber;
          insurancecarrier.address.floor = item.floor;
          insurancecarrier.address.zipCode = item.postalCode;          
          insurancecarrier.address.country = new Country(item.idCountry);
          insurancecarrier.address.state = new State(item.idState);
          insurancecarrier.address.city = new City(item.idCity);
          insurancecarrier.bank = new Bank(item.idBank);
          insurancecarrier.cbu = item.cbu;
          insurancecarrier.currentAccount = item.cuentaCorriente;
          insurancecarrier.deleted = item.deleted;
          return insurancecarrier; 

        });
        return paginator;
      }
    ).catch(
      ()=>{
        return paginator;
      }
      
    )
  }

  update(insuranceCarrier:any): Promise<InsuranceCarrier>{
   return this.put(`/insurancecarriers/${insuranceCarrier.insuranceCarrierId}`,insuranceCarrier).toPromise().then(
      (resp)=>{
        return insuranceCarrier;
      }
    ).catch(
      (error)=>{
        return null;
      }
    );
  }

  store(insuranceCarrier:any): Promise<InsuranceCarrier>{
    return this.post('/insurancecarriers',insuranceCarrier).toPromise().then(
      (resp)=>{
        console.log(resp);
        return insuranceCarrier;
      }
    ).catch(
      (error)=>{
        console.log(error);
        return null;
      }
    );
  }

  getById(id:number): Promise<InsuranceCarrier>{
    const insurancecarrier = new InsuranceCarrier();
    return this.get(`/insurancecarriers/${id}`).toPromise().then(
      (resp)=>{
        console.log(resp);
        insurancecarrier.id = resp.insuranceCarrierId;
        insurancecarrier.socialReason = resp.insuranceSocialReason;
        insurancecarrier.cuit = resp.insuranceCUIT;
        insurancecarrier.contactUser = new User();
        insurancecarrier.contactUser.name = resp.contactName;
        insurancecarrier.contactUser.phone = resp.contactPhone.substring(1);
        insurancecarrier.contactUser.email = resp.contactEmail;
        insurancecarrier.address = new Address();
        insurancecarrier.address.street = resp.street;
        insurancecarrier.address.houseNumber = resp.houseNumber;
        insurancecarrier.address.floor = resp.floor;
        insurancecarrier.address.zipCode = resp.postalCode;
        const country = this.locationService.countryList.filter(x => Number(x.value)==resp.idCountry)[0];
        insurancecarrier.address.country = new Country(country.value,country.label);
        insurancecarrier.address.state = new State(resp.idState);
        insurancecarrier.address.city = new City(resp.idCity);
        const bank = this.banksService.banksList.filter(x => Number(x.value) == resp.idBank)[0];
        console.log('in service',bank);
        insurancecarrier.bank = new Bank(bank.value,bank.label);
        insurancecarrier.cbu = resp.cbu;
        insurancecarrier.currentAccount = resp.cuentaCorriente;
        insurancecarrier.deleted = resp.deleted;
        return insurancecarrier;
      }
    ).catch(
      (error)=>{
        console.log(error);
        return null;
      }
    );
  }


}
