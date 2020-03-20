import { Injectable } from '@angular/core';
import {Bank, User, Address, Country, State, City} from '../../../models';
import {map} from 'rxjs/operators';
import { HttpService } from '../../../services/http.service';
import { PaginationResponse } from '../../commons-peygold/entities/pagination-response';
import {HttpClient} from '@angular/common/http';
import { LocationService } from '../../../services/location.service';

@Injectable({
  providedIn: 'root'
})
export class BanksService extends HttpService {

  public banks: Array<Bank>;

  constructor(protected http: HttpClient,
    protected locationService:LocationService) {
    super(http);
  }

  /**
   * Get all banks
   */
  all(): Promise<Array<Bank>> {
    return this.get('/bank')
      .pipe(
        map((banks: Array<any>) => banks.map((item: any) => {
            return new Bank(item.value, item.label);
          })
        )
      ).toPromise();
  }

  /**
   * Search Banks.
   * @return Promise<Array<PaginationResponse>> the list of transaction
   */
  search(page: number, perPage: number,word?:string): Promise<PaginationResponse> {
    const paginator = new PaginationResponse(page, perPage);
    const url = word && word!='' ? `/bank/search/${page}/${perPage}/${word}` : `/bank/search/${page}/${perPage}`
    return this.get(url).toPromise().then(
      (response: any) => {
        paginator.count = response.recordCount;
        paginator.data = response.banksDTOs.map((item: any) => {
          const bank = new Bank();

          bank.idBank = item.idBank;
          bank.socialReason = item.bankName;
          bank.cuit = item.bankCUIT;
          bank.contactUser = new User();
          bank.contactUser.phone = item.bankPhone;
          bank.contactUser.email = item.bankEmail;
          bank.address = new Address();
          bank.address.street = item.street;
          bank.address.houseNumber = item.streetNumber;
          bank.address.floor = item.floor;
          bank.address.zipCode = item.postalCode;
          bank.address.country = new Country(item.idCountry);
          bank.address.state = new State(item.idState);
          bank.address.city = new City(item.idCity);
          bank.deleted = item.deleted;

          return bank;
        });

        return paginator;
      }
    ).catch(() => {
      return paginator;
    });
  }

  /**
   * update bank
   * @param bank 
   */
  update(bank:any): Promise<Bank>{
    return this.put(`/bank/${bank.idBank}`,bank).toPromise().then(
       (resp)=>{
         return bank;
       }
     ).catch(
       (error)=>{
         return null;
       }
     );
   }


  /**
   * create at bank
   * @param bank 
   */

  store(bank:any): Promise<Bank>{
    return this.post('/bank',bank).toPromise().then(
      (resp)=>{
        console.log(resp);
        return bank;
      }
    ).catch(
      (error)=>{
        console.log(error);
        return null;
      }
    );
  }

  getById(id:number): Promise<Bank>{
    const bank = new Bank();
    return this.get(`/bank/${id}`).toPromise().then(
      (resp)=>{
        bank.idBank = resp.idBank;
        bank.socialReason = resp.bankName;
        bank.cuit = resp.bankCUIT;
        bank.contactUser = new User();
        bank.contactUser.phone = resp.bankPhone;
        bank.contactUser.email = resp.bankEmail;
        bank.address = new Address();
        bank.address.street = resp.street;
        bank.address.houseNumber = resp.streetNumber;
        bank.address.floor = resp.floor;
        bank.address.zipCode = resp.postalCode;
        const country = this.locationService.countryList.filter(x => Number(x.value)==resp.idCountry)[0];
        console.log('in service country',country);
        bank.address.country = new Country(country.value,country.label);
        bank.address.state = new State(resp.idState);
        bank.address.city = new City(resp.idCity);
        bank.deleted = resp.deleted;

        return bank;
      }
    ).catch(
      (error)=>{
        console.log(error);
        return null;
      }
    );
  }



}
