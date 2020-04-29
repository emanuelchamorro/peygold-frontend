import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { HttpClient } from '@angular/common/http';
import { GeneralChargeCredit } from '../../../models/general-charge-credit';
import { PaginationResponse } from '../../commons-peygold/entities/pagination-response';
import { EffectType } from '../../../models/effect-type';
import { EffectApplicationType } from '../../../models/effect-application-type';
import { State } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class ChargecreditService extends HttpService {

  constructor(protected http: HttpClient) { 
    super(http);
  }


  /**
   * Return all option charge and credits
   * @param type 
   */
  all(type:number): Promise<Array<GeneralChargeCredit>>{
    if(type==1){//general
      return this.get('/generalchargecredits').toPromise().then((options: Array<any>)=> options.map((item:any)=>{
        return new GeneralChargeCredit(item.value, item.label);
      }))
    }else{ // provincia
      return this.get('/generalchargecredits').toPromise().then((options: Array<any>)=> options.map((item:any)=>{
        return new GeneralChargeCredit(item.value, item.label);
      }))
    }
  }

  /**
   * search chargecredits by word paginate
   * @param page 
   * @param perPage 
   * @param word 
   */

  search(type: number, page: number, perPage: number,word?:string): Promise<PaginationResponse> {
    const paginator = new PaginationResponse(page, perPage);
    if(type==1){
      const url = word && word!='' ? `/generalchargecredits/search/${page}/${perPage}/${word}` : `/generalchargecredits/search/${page}/${perPage}`
      return this.get(url).toPromise().then(
        (response: any) => {
          paginator.count = response.recordCount;
          paginator.data = response.conceptoCargoAbonoGenerals.map((item: any) => {
            const chargeCredit = new GeneralChargeCredit();
            chargeCredit.idChargeCredit = item.idConceptoCargoAbono;
            chargeCredit.label = item.nombreCargoAbono;
            if(item.signo == 1){
              chargeCredit.effect = new EffectType('1','Abono');
            }else{
              chargeCredit.effect = new EffectType('-1','Cargo');
            }
  
            if(item.obtenerDeBase){
              chargeCredit.effectApplication = new EffectApplicationType('1','Monto base')
            }
  
            if(item.obtenerDeComision){
              chargeCredit.effectApplication = new EffectApplicationType('2','Comisión')
            }
            chargeCredit.amount = item.porcentaje * 100;
            chargeCredit.amountStr = Intl.NumberFormat("es-AR").format(chargeCredit.amount);
            chargeCredit.deleted = item.deleted;
  
            return chargeCredit;
          });
  
          return paginator;
        }
      ).catch(() => {
        return paginator;
      });
    }else{
      const url = word && word!='' ? `/provincechargecredits/search/${page}/${perPage}/${word}` : `/provincechargecredits/search/${page}/${perPage}`
      return this.get(url).toPromise().then(
        (response: any) => {
          paginator.count = response.recordCount;
          paginator.data = response.conceptoCargoAbonoProvinces.map((item: any) => {
            const chargeCredit = new GeneralChargeCredit();
            chargeCredit.idChargeCredit = item.idConceptoCargoAbonoProvincia;
            chargeCredit.label = item.nombreCargoAbono;
            if(item.signo == 1){
              chargeCredit.effect = new EffectType('1','Abono');
            }else{
              chargeCredit.effect = new EffectType('-1','Cargo');
            }
  
            if(item.obtenerDeBase){
              chargeCredit.effectApplication = new EffectApplicationType('1','Monto base')
            }
  
            if(item.obtenerDeComision){
              chargeCredit.effectApplication = new EffectApplicationType('2','Comisión')
            }
            chargeCredit.amount = item.porcentaje * 100;
            chargeCredit.amountStr = Intl.NumberFormat("es-AR").format(chargeCredit.amount);
            chargeCredit.deleted = item.deleted;

            chargeCredit.state = new State(item.idState, item.stateName);
  
            return chargeCredit;
          });
  
          return paginator;
        }
      ).catch(() => {
        return paginator;
      });
    }

  }

/**
 * update charge credit
 * @param chargeCredit 
 */
  update(chargeCredit:any, type: number): Promise<GeneralChargeCredit>{
    if(type==1){
      return this.put(`/generalchargecredits/${chargeCredit.IdConceptoCargoAbono}`,chargeCredit).toPromise().then(
        (resp)=>{
          return chargeCredit;
        }
      ).catch(
        (error)=>{
          return null;
        }
      );
    }else{
      return this.put(`/provincechargecredits/${chargeCredit.IdConceptoCargoAbonoProvincia}`,chargeCredit).toPromise().then(
        (resp)=>{
          return chargeCredit;
        }
      ).catch(
        (error)=>{
          return null;
        }
      );
    }

   }

   /**
    * create charge credit
    * @param chargeCredit 
    */
   store(chargeCredit:any, type: number): Promise<GeneralChargeCredit>{
    if(type==1){
      return this.post('/generalchargecredits',chargeCredit).toPromise().then(
        (resp)=>{
          console.log(resp);
          return chargeCredit;
        }
      ).catch(
        (error)=>{
          console.log(error);
          return null;
        }
      );
    }else{
      return this.post('/provincechargecredits',chargeCredit).toPromise().then(
        (resp)=>{
          console.log(resp);
          return chargeCredit;
        }
      ).catch(
        (error)=>{
          console.log(error);
          return null;
        }
      );
    }

  }

  /**
   * get chargeCredit by id
   * @param id 
   */

  getById(id:number, type: number): Promise<GeneralChargeCredit>{
    const chargeCredit = new GeneralChargeCredit();
    if(type==1){
      return this.get(`/generalchargecredits/${id}`).toPromise().then(
        (resp)=>{
          chargeCredit.idChargeCredit = resp.idConceptoCargoAbono;
          chargeCredit.label = resp.nombreCargoAbono;
          chargeCredit.deleted = resp.deleted;
          if(resp.signo == 1){
            chargeCredit.effect = new EffectType('1','Abono');
          }else{
            chargeCredit.effect = new EffectType('-1','Cargo');
          }
  
          if(resp.obtenerDeBase){
            chargeCredit.effectApplication = new EffectApplicationType('1','Monto base')
          }
  
          if(resp.obtenerDeComision){
            chargeCredit.effectApplication = new EffectApplicationType('2','Comisión')
          }
          chargeCredit.amount = resp.porcentaje * 100;
          chargeCredit.amountStr = Intl.NumberFormat("es-AR").format(chargeCredit.amount);
          return chargeCredit;
        }
      ).catch(
        (error)=>{
          console.log(error);
          return null;
        }
      );
    }else{
      return this.get(`/provincechargecredits/${id}`).toPromise().then(
        (resp)=>{
          chargeCredit.idChargeCredit = resp.idConceptoCargoAbonoProvincia;
          chargeCredit.label = resp.nombreCargoAbono;
          chargeCredit.deleted = resp.deleted;
          if(resp.signo == 1){
            chargeCredit.effect = new EffectType('1','Abono');
          }else{
            chargeCredit.effect = new EffectType('-1','Cargo');
          }
  
          if(resp.obtenerDeBase){
            chargeCredit.effectApplication = new EffectApplicationType('1','Monto base')
          }
  
          if(resp.obtenerDeComision){
            chargeCredit.effectApplication = new EffectApplicationType('2','Comisión')
          }
          chargeCredit.amount = resp.porcentaje * 100;
          chargeCredit.amountStr = Intl.NumberFormat("es-AR").format(chargeCredit.amount);
          chargeCredit.state = new State(resp.idState, resp.stateName);
  
          return chargeCredit;
        }
      ).catch(
        (error)=>{
          console.log(error);
          return null;
        }
      );
    }
    

  } 


}
