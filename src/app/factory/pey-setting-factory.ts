import { PeySetting } from "../models/pey-setting";


export class PeySettingFactory{

    static make(setting:PeySetting): any{

        return {
            IdConfiguration: setting.idConfiguration,
            InstitutionCommissionPercentaje: parseFloat(setting.institutionCommission) / 100,
            PeygoldCommissionPercentaje: parseFloat(setting.peygoldCommission) / 100,
            IVAPercentaje: parseFloat(setting.iva) / 100,
            ResalePeygoldCommissionPercentaje: parseFloat(setting.peygoldPointOfSaleCommission) / 100,
            AmmountResalePeyGold: parseFloat(setting.minimumAmountOfPeygoldPointOfSale),
            MontoMinimoCredito: parseFloat(setting.minimumAmountOfPeygoldCredit),
            MontoMaximoCredito: parseFloat(setting.maximumAmountOfPeygoldCredit),
            MontoMaximoLiquidacionCredito: parseFloat(setting.maximumSettlementAmount),
        }


    }
    
}