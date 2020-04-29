import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { PeySetting } from '../../../models/pey-setting';

@Injectable({
  providedIn: 'root'
})
export class PeySettingService extends HttpService {

  getSetting(): Promise<PeySetting>{

    const peySetting = new PeySetting();

    return this.get('/Configurations').toPromise().then(
      (resp:any) => {
        peySetting.idConfiguration = resp.idConfiguration;
        peySetting.institutionCommission = Intl.NumberFormat("es-AR").format(resp.institutionCommissionPercentaje * 100);
        peySetting.peygoldCommission = Intl.NumberFormat("es-AR").format(resp.peygoldCommissionPercentaje * 100);
        peySetting.peygoldPointOfSaleCommission = Intl.NumberFormat("es-AR").format(resp.resalePeygoldCommissionPercentaje * 100);
        peySetting.iva = Intl.NumberFormat("es-AR").format(resp.ivaPercentaje * 100);
        peySetting.minimumAmountOfPeygoldPointOfSale = Intl.NumberFormat("es-AR").format(resp.ammountResalePeyGold);
        peySetting.minimumAmountOfPeygoldCredit = Intl.NumberFormat("es-AR").format(resp.montoMinimoCredito);
        peySetting.maximumAmountOfPeygoldCredit = Intl.NumberFormat("es-AR").format(resp.montoMaximoCredito);
        peySetting.maximumSettlementAmount = Intl.NumberFormat("es-AR").format(resp.montoMaximoLiquidacionCredito);

        return peySetting;
      }
    ).catch(
      (error)=>{
        return null
      }
    ) 
  }

  update(setting:any):Promise<any>{

    return this.put(`/Configurations/${setting.IdConfiguration}`,setting).toPromise().then(
      (resp)=>{
        console.log('resp',resp)
        return resp;
      }
    ).catch(
      (error)=>{
        console.log('error',error)
        return error;
      }
    );

  }


}
