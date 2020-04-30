import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { HttpClient } from '@angular/common/http';
import { CheckRescue } from '../../../models/check-rescue';
import { PaginationResponse } from '../../commons-peygold/entities/pagination-response';

@Injectable({
  providedIn: 'root'
})
export class RescuecheckService extends HttpService {


  constructor(protected http: HttpClient) { 
    super(http);
  }

  /**
   * Get all Check Rescue
   */
  all(): Promise<Array<CheckRescue>> {
    return this.get('/checkrescues')
    .toPromise().then((options: Array<any>) => options.map((item: any) => {
        return new CheckRescue(item.checkRescueId, item.checkRescueName, item.deleted);
      })
    );
  }

  /**
   * Search Check Rescue.
   * @return Promise<Array<PaginationResponse>> the list 
   */
  search(page: number, perPage: number,word?:string): Promise<PaginationResponse> {
    const paginator = new PaginationResponse(page, perPage);
    const url = word && word!='' ? `/checkrescues/search/${page}/${perPage}/${word}` : `/checkrescues/search/${page}/${perPage}`
    return this.get(url).toPromise().then(
      (response: any) => {
        paginator.count = response.recordCount;
        paginator.data = response.checkRescues.map((item: any) => {
          const chekRescue = new CheckRescue(item.checkRescueId, item.checkRescueName, item.deleted);
          chekRescue.idCheckRescue = item.checkRescueId;
          return chekRescue;
        });

        return paginator;
      }
    ).catch(() => {
      return paginator;
    });
  }


    /**
   * update Check Rescue
   * @param chekRescue 
   */
  update(chekRescue:any): Promise<CheckRescue>{
    return this.put(`/checkrescues/${chekRescue.CheckRescueId}`,chekRescue).toPromise().then(
       (resp)=>{
         return chekRescue;
       }
     ).catch(
       (error)=>{
         return null;
       }
     );
   }


     /**
   * create at check rescue
   * @param chekRescue 
   */

  store(chekRescue:any): Promise<CheckRescue>{
    return this.post('/checkrescues',chekRescue).toPromise().then(
      (resp)=>{
        console.log(resp);
        return chekRescue;
      }
    ).catch(
      (error)=>{
        console.log(error);
        return null;
      }
    );
  }

    /**
   * get CheckRescue by id
   * @param id 
   */

  getById(id:number): Promise<CheckRescue>{
    const checkRescue = new CheckRescue();
    return this.get(`/checkrescues/${id}`).toPromise().then(
      (resp)=>{
        checkRescue.idCheckRescue = resp.checkRescueId;
        checkRescue.label = resp.checkRescueName;
        checkRescue.deleted = resp.deleted;

        return checkRescue;
      }
    ).catch(
      (error)=>{
        console.log(error);
        return null;
      }
    );
  }

}
