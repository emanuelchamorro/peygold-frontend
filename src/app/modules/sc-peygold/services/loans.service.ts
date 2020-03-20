import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Address, CheckRescue, Loan, LoanStatus, PaymentMethod, State, Transaction, TransactionType, User, LoanRequest, SelectOption, Check, Bank, Country, City, CreditDestination } from '../../../models';
import { environment } from '../../../../environments/environment';
import { PaginationResponse } from '../../commons-peygold/entities/pagination-response';
import { InsuranceLoan } from 'src/app/models/insurance-loan';
import { DataFile } from '../../../models/data-file';
import { CheckLog } from '../../../models/check-logs';
import {Response} from '../../commons-peygold/entities/response';

@Injectable({
  providedIn: 'root'
})
export class LoansService extends HttpService {



  /**
   * Search loans.
   * @return Promise<Array<PaginationResponse>> the PaginationResponse
   */
  search(type: TransactionType, word: string, page: number, perPage: number): Promise<PaginationResponse> {
    const paginator = new PaginationResponse(page, perPage);
    return this.get(`/loans/search/3/${word}/${page}/${perPage}`).toPromise().then(
      (response: any) => {
        paginator.count = response.recordCount;
        paginator.data = response.loansDTOs.map((item: any) => {
          const loan = new Loan();

          loan.id = item.idLoan;
          loan.applicant = new User();
          loan.applicant.id = item.idUser;
          loan.amount = item.amount || item.ammount;
          loan.applicant.cuit = item.cuit;
          loan.applicant.bussinessName = item.socialReason;
          loan.applicant.email = item.email;
          loan.applicant.phone = item.phone;
          loan.applicant.address = new Address();
          loan.applicant.address.street = item.street;
          loan.applicant.address.state = new State(null, item.stateName);
          loan.applicant.avatarURL = environment.api.avatarUrl + item.avatarURL;

          loan.employees = item.employees;
          loan.transactionType = new TransactionType(item.idTransactionType);
          loan.loanConcept = item.loanConcept;
          loan.status = new LoanStatus(item.loanStatus);
          loan.insuranceStatus = new LoanStatus(item.loanInsuranceStatus);
          loan.applicationDate = item.applicationDate;
          loan.responseDate = item.responseDate;
          loan.verifiedDate = item.verifiedDate;
          loan.peygoldExpirationDate = item.peygoldExpirationDate;
          loan.verifiedInformation = item.verifiedInformation;
          loan.verifiedComments = item.verifiedComments;
          loan.approveDeniedComments = item.approveDeniedComments;
          loan.comments = item.comments ? item.comments:'No hay comentarios';
          loan.checkRescue = new CheckRescue(null, item.checkRescueName);
          loan.paymentMethod = new PaymentMethod(null, item.paymentMethodName);
          loan.creditDestination = new CreditDestination(null, item.creditDestinationName);
          loan.creditDetailId = item.loanCreditDetailId;
          loan.adminStatus = new LoanStatus(item.adminStatus);
          loan.adminProcessingDate = item.adminProcessingDate;
          loan.adminComments = item.adminComments;
          loan.adminUser = new User();
          loan.adminUser.id = item.adminIdUser;
          loan.riskySituation = item.riskySituation;

          return loan;
        });

        return paginator;
      }
    ).catch(() => {
      return paginator;
    });
  }


  /**
 * get loan detail.
 * @param id
 * @return Promise<Response> credit info by id
 */

  getById(id: number): Promise<Response> {
    let responseService = null;
    let loan = null;
    return this.get(`/loans/GetLoanCreditCheck/${id}`).toPromise().then(
      (response) => {
        loan = new Loan();
        loan.id = response.idLoan;
        loan.amount = response.ammount;
        loan.checkRescue = new CheckRescue(null, response.checkRescueName);
        loan.insuranceCarrier = new SelectOption(response.insuranceCarrierId, response.insuranceSocialReason);
        loan.amountOfBeneficiary = response.amountOfBeneficiary;
        loan.verifiedInformation = response.verifiedInformation;
        loan.transactionType = new TransactionType('3');

        loan.applicant = new User();
        loan.applicant.id = response.idUser;
        loan.applicant.cuit = response.cuit;
        loan.applicant.bussinessName = response.socialReason ? response.socialReason : response.name;
        loan.applicant.email = response.email;
        loan.applicant.phone = response.phoneNumber;
        loan.applicant.avatarURL = environment.api.avatarUrl + response.avatarURL;
        loan.applicant.address = new Address();
        loan.applicant.address.street = response.street;
        loan.applicant.address.billingStreet = response.billingStreet;
        loan.applicant.address.state = new State(null, response.stateName);
        loan.applicant.address.city = new State(null, response.cityName);
        loan.insuranceLoan = null
        if (response.insuranceLoanInfo) {
          loan.insuranceLoan = new InsuranceLoan();
          loan.insuranceLoan.id = response.insuranceLoanInfo.loanInsuranceCheckId;
          loan.insuranceLoan.creationDate = response.insuranceLoanInfo.fechaCreacion;
          loan.insuranceLoan.insuranceStatus = new LoanStatus(response.insuranceLoanInfo.loanInsuranceStatus);
          loan.insuranceLoan.revisionDate = response.insuranceLoanInfo.fechaRevision;
          loan.insuranceLoan.policyNumber = response.insuranceLoanInfo.numeroPoliza;
          loan.insuranceLoan.policyPath = environment.api.avatarUrl + response.insuranceLoanInfo.pathPoliza;
          loan.insuranceLoan.comments = response.insuranceLoanInfo.comentarios;
          loan.insuranceLoan.userAdmin = new User();
          loan.insuranceLoan.userAdmin.name = response.insuranceLoanInfo.fullName;
        }

        loan.adminStatus = new LoanStatus(response.adminStatus);
        loan.adminProcessingDate = response.adminProcessingDate;
        loan.adminComments = response.adminComments ? response.adminComments : '';
        loan.adminUser = new User();
        loan.adminUser.id = response.adminIdUser;
        loan.riskySituation = response.riskySituation;


        loan.comments = response.comments ? response.comments : 'No hay comentarios';
        loan.checks = response.checkInfo.map((item: any) => {
          const check = new Check();
          check.id = item.paycheckId;
          check.frontImage = environment.api.avatarUrl + item.imgUrlFrente;
          check.backImage = environment.api.avatarUrl + item.imgUrlDorso;
          check.paymentDate = item.paymentDate;
          check.amount = item.amount;
          check.checkStatusUpdate = item.checkStatusUpdate;
          check.accountNumber = item.cuentaEmisora;
          check.number = item.numeroCheque;
          check.address = new Address();
          check.address.addressFull = item.direccionBanco;
          check.address.country = new Country(item.idCountry);
          check.address.state = new State(item.idState);
          check.address.city = new City(item.idCity);
          check.address.phone = item.telefonoBanco;

          console.log('fechaEmisionCheque',item.fechaEmisionCheque)
          console.log('fechaVencimientoCheque',item.fechaVencimientoCheque)

          const issuanceDateArray = item.fechaEmisionCheque.split("-");
          const expirationDateArray = item.fechaVencimientoCheque.split("-");

          check.issuanceDateStr = issuanceDateArray[2] + "/" + issuanceDateArray[1] + "/" + issuanceDateArray[0];
          check.expirationDateStr = expirationDateArray[2] + "/" + expirationDateArray[1] + "/" + expirationDateArray[0];

          check.issuanceDate = {
            "year": parseInt(issuanceDateArray[0]),
            "month": parseInt(issuanceDateArray[1]),
            "day": parseInt(issuanceDateArray[2])
          };
          check.expirationDate = {
            "year": parseInt(expirationDateArray[0]),
            "month": parseInt(expirationDateArray[1]),
            "day": parseInt(expirationDateArray[2]),
          };

          check.bank = new Bank(item.idBank, item.bankName);

          check.onwer = new User();
          check.onwer.bussinessName = item.cbu;
          check.onwer.cuit = item.cuit;
          check.onwer.documentNumber = item.dniFirmante;
          check.onwer.email = item.emailFirmante;
          check.onwer.fullName = item.fullNameFirmante;
          check.onwer.phone = item.telefonoFirmante;

          check.gender = item.cbu == '0' ? 1 : 2;
          check.loanCreditDetailId = item.loanCreditDetailId;
          return check;
        });
        responseService = new Response('',200,true,loan);
        return responseService;
      }
    ).catch((error) => {
      if(error.code == 404){
        responseService = new Response('Esta solicitud no existe',error.code,false,null);
        return responseService;
      }else{
        responseService = new Response('Ha ocurrido un error. No será posible ver el detalle de la solicitud.',error.code,false,null);
        return responseService;
      }
    });

  }
  /**
   * update check attr
   * @param params 
   * @returns Promise<any>
   */
  updateCheck(params: any): Promise<any> {
    return this.put(`/loans/updateloancreditCheck/${params.PaycheckId}`, params).toPromise().then(
      (resp) => {
        console.log('resp update check', resp)
        return resp;
      }
    ).catch(
      (error) => {
        console.log('error update check', error)
        return error;
      }
    );
  }

  /**
   * update Verified information loan
   * @param loan
   * @returns Promise<any>
   */
  updateLoanInformation(loan: Loan): Promise<any> {
    const params = {
      IdLoan: loan.id,
      VerifiedInformation: loan.verifiedInformation,
      VerifiedComments: loan.verifiedComments,
      riskySituation: loan.riskySituation,
      insuranceCarrierId: parseInt(loan.insuranceCarrier.value)
    }

    return this.put(`/loans/${loan.id}`, params).toPromise().then(
      (resp) => {
        console.log('resp update loan', resp)
        return resp;
      }
    ).catch(
      (error) => {
        console.log('error update loan', error)
        return error;
      }
    );
  }

  /**
 * update Verified information loan
 * @param loan
 * @returns Promise<any>
 */
  updateRiskySituation(loan: Loan): Promise<any> {
    const params = {
      IdLoan: loan.id,
      riskySituation: loan.riskySituation
    }

    return this.put(`/loans/${loan.id}`, params).toPromise().then(
      (resp) => {
        console.log('resp update loan', resp)
        return resp;
      }
    ).catch(
      (error) => {
        console.log('error update loan', error)
        return error;
      }
    );
  }

  /**
 * update admin verification loan
 * @param loan
 * @returns Promise<any>
 */
  updateAdminVerification(loan: Loan, adminStatus: number): Promise<any> {
    const params = {
      IdLoan: loan.id,
      AdminStatus: adminStatus,
      AdminComments: loan.adminComments
    }

    return this.put(`/loans/AdminVerification/${loan.id}`, params).toPromise().then(
      (resp) => {
        console.log('resp update loan', resp)
        return resp;
      }
    ).catch(
      (error) => {
        console.log('error update loan', error)
        return error;
      }
    );
  }

  /**
   * Send credit request to insurance
   * @param id is LoanCreditDetailId
   */

  sendCreditRequest(id: number): Promise<any> {
    return this.post('/loaninsurancechecks/', { LoanCreditDetailId: id }).toPromise().then(
      (resp) => {
        console.log('resp update loan', resp)
        return resp;
      }
    ).catch(
      (error) => {
        console.log('error update loan', error)
        return error;
      }
    );
  }

  /**
   * delete loan insurece by id
   * @param id from loan insurance
   */
  deleteLoanInsurance(id: string): Promise<any> {
    return this.delete(`/loaninsurancechecks/${id}`).toPromise();
  }

  /**
   * get loan request sent to insurance
   * @param id identify of loan insurance request
   */

  getLoanInsuranceById(id: string): Promise<Response> {
    let responseService = null;
    let loan = null;
    return this.get(`/loaninsurancechecks/${id}`).toPromise().then(
      (response) => {
        loan = new Loan();
        loan.id = response.idLoan;
        loan.amount = response.ammount;
        loan.checkRescue = new CheckRescue(null, response.checkRescueName);
        loan.insuranceCarrier = new SelectOption(response.insuranceCarrierId, response.insuranceSocialReason);
        loan.amountOfBeneficiary = response.amountOfBeneficiary;
        loan.verifiedInformation = response.verifiedInformation;
        loan.transactionType = new TransactionType('3');
        loan.insuranceStatus = new LoanStatus(response.insuranceLoanInfo.loanInsuranceStatus);
        loan.creditDestination = new CreditDestination(response.creditDestinationId, response.creditDestinationName);

        loan.applicant = new User();
        loan.applicant.id = response.idUser;
        loan.applicant.cuit = response.cuit;
        loan.applicant.bussinessName = response.socialReason ? response.socialReason : response.name;
        loan.applicant.email = response.email;
        loan.applicant.phone = response.phone;
        loan.applicant.avatarURL = environment.api.avatarUrl + response.avatarURL;
        loan.applicant.address = new Address();
        loan.applicant.address.street = response.street;
        loan.applicant.address.billingStreet = response.billingStreet;
        loan.applicant.address.state = new State(null, response.stateName);
        loan.applicant.address.city = new State(null, response.cityName);
        loan.applicant.address.country = new Country(response.idCountry,response.conuntryName);
        loan.insuranceLoan = null
        if (response.insuranceLoanInfo) {
          loan.insuranceLoan = new InsuranceLoan();
          loan.insuranceLoan.id = response.insuranceLoanInfo.loanInsuranceCheckId;
          loan.insuranceLoan.creationDate = response.insuranceLoanInfo.fechaCreacion;
          loan.insuranceLoan.insuranceStatus = new LoanStatus(response.insuranceLoanInfo.loanInsuranceStatus);
          loan.insuranceLoan.revisionDate = response.insuranceLoanInfo.fechaRevision;
          loan.insuranceLoan.policyNumber = response.insuranceLoanInfo.numeroPoliza ? response.insuranceLoanInfo.numeroPoliza : null;
          loan.insuranceLoan.policyPath = response.insuranceLoanInfo.pathPoliza;
          loan.insuranceLoan.comments = response.insuranceLoanInfo.comentarios;
          loan.insuranceLoan.userAdmin = new User();
          loan.insuranceLoan.userAdmin.name = response.insuranceLoanInfo.fullName;
        }

        loan.adminStatus = new LoanStatus(response.adminStatus);
        loan.adminProcessingDate = response.adminProcessingDate;
        loan.adminComments = response.adminComments ? response.adminComments : '';
        loan.adminUser = new User();
        loan.adminUser.id = response.adminIdUser;
        loan.riskySituation = response.riskySituation;
        loan.policyFile = new DataFile();


        loan.comments = response.comments ? response.comments : 'No hay comentarios';
        loan.checks = response.checkInfo.map((item: any) => {
          const check = new Check();
          check.id = item.paycheckId;
          check.frontImage = environment.api.avatarUrl + item.imgUrlFrente;
          check.backImage = environment.api.avatarUrl + item.imgUrlDorso;
          check.paymentDate = item.paymentDate;
          check.amount = item.amount;
          check.checkStatusUpdate = item.checkStatusUpdate;
          check.accountNumber = item.cuentaEmisora;
          check.number = item.numeroCheque;
          check.address = new Address();
          check.address.addressFull = item.direccionBanco;
          check.address.country = new Country(item.idCountry);
          check.address.state = new State(item.idState);
          check.address.city = new City(item.idCity);
          check.address.phone = item.telefonoBanco;

          console.log('fechaEmisionCheque',item.fechaEmisionCheque)
          console.log('fechaVencimientoCheque',item.fechaVencimientoCheque)

          const issuanceDateArray = item.fechaEmisionCheque.split("-");
          const expirationDateArray = item.fechaVencimientoCheque.split("-");

          check.issuanceDateStr = issuanceDateArray[2] + "/" + issuanceDateArray[1] + "/" + issuanceDateArray[0];
          check.expirationDateStr = expirationDateArray[2] + "/" + expirationDateArray[1] + "/" + expirationDateArray[0];

          check.issuanceDate = {
            "year": parseInt(issuanceDateArray[0]),
            "month": parseInt(issuanceDateArray[1]),
            "day": parseInt(issuanceDateArray[2])
          };
          check.expirationDate = {
            "year": parseInt(expirationDateArray[0]),
            "month": parseInt(expirationDateArray[1]),
            "day": parseInt(expirationDateArray[2]),
          };

          check.bank = new Bank(item.idBank, item.bankName);

          check.onwer = new User();
          check.onwer.bussinessName = item.cbu;
          check.onwer.cuit = item.cuit;
          check.onwer.documentNumber = item.dniFirmante;
          check.onwer.email = item.emailFirmante;
          check.onwer.fullName = item.fullNameFirmante;
          check.onwer.phone = item.telefonoFirmante;

          check.gender = item.cbu == '0' ? 1 : 2;
          check.loanCreditDetailId = item.loanCreditDetailId;
          return check;
        });
        responseService = new Response('',200,true,loan);
        return responseService;
      }
    ).catch((error) => {
      if(error.code == 404){
        responseService = new Response('Esta solicitud no existe',error.code,false,null);
        return responseService;
      }else{
        responseService = new Response('Ha ocurrido un error. No será posible ver el detalle de la solicitud.',error.code,false,null);
        return responseService;
      }
    });

  }

  /**
   * Get list loan pending
   * @param word  for filter
   * @param page number page
   * @param perPage numeber rows
   */

  getLoanPending(word: string, page: number, perPage: number):Promise<PaginationResponse>{

    const paginator = new PaginationResponse(page, perPage);

    return this.get(`/loans/GetLoansCheckPendingByWords/${word}/${page}/${perPage}`).toPromise().then(
      (response)=>{
        paginator.count = response.recordCount;
        paginator.data = response.loansDTOs.map((item:any)=>{
          const loan = new Loan();

          loan.id = item.idLoan;
          loan.applicant = new User();
          loan.applicant.id = item.idUser;
          loan.amount = item.amount || item.ammount;
          loan.applicant.cuit = item.cuit;
          loan.applicant.bussinessName = item.socialReason;
          loan.applicant.email = item.email;
          loan.applicant.phone = item.phone;
          loan.applicant.address = new Address();
          loan.applicant.address.street = item.street;
          loan.applicant.address.state = new State(null, item.stateName);
          loan.applicant.avatarURL = environment.api.avatarUrl + item.avatarURL;

          loan.employees = item.employees;
          loan.transactionType = new TransactionType(item.idTransactionType);
          loan.loanConcept = item.loanConcept;
          loan.status = new LoanStatus(item.loanStatus);
          loan.insuranceStatus = new LoanStatus(item.loanInsuranceStatus);
          loan.applicationDate = item.applicationDate;
          loan.responseDate = item.responseDate;
          loan.verifiedDate = item.verifiedDate;
          loan.peygoldExpirationDate = item.peygoldExpirationDate;
          loan.verifiedInformation = item.verifiedInformation;
          loan.verifiedComments = item.verifiedComments;
          loan.approveDeniedComments = item.approveDeniedComments;
          loan.comments = item.comments;
          loan.checkRescue = new CheckRescue(null, item.checkRescueName);
          loan.paymentMethod = new PaymentMethod(null, item.paymentMethodName);
          loan.creditDestination = new CreditDestination(null, item.creditDestinationName);
          loan.creditDetailId = item.loanCreditDetailId;
          loan.adminStatus = new LoanStatus(item.adminStatus);
          loan.adminProcessingDate = item.adminProcessingDate;
          loan.adminComments = item.adminComments;
          loan.adminUser = new User();
          loan.adminUser.id = item.adminIdUser;
          loan.riskySituation = item.riskySituation;
          return loan;

        });
        return paginator;
      }
    ).catch(
      ()=>{
        return paginator;
      }
    );

  }

  /**
   * send token to email admin
   */

  sendToken():Promise<any>{
    return this.post(`/users/SendTokenLoan`).toPromise();
  }

/**
 * 
 * @param loan is loan to liquidate
 * @param token is value by security
 * @returns Promise<any>
 */
  processLoan(loan:Loan,token:string):Promise<any>{
    const params = {
        IdLoan:loan.id,
        LoanStatus: parseInt(loan.status.value),
        ApproveDeniedComments: loan.approveDeniedComments,
        Token:token
    }
    return this.put(`/loans/ChangeLoanStatus/${loan.id}`,params).toPromise();
  }

    /**
   * Get list loan process
   * @param id is id of user
   * @param word  for filter
   * @param page number page
   * @param perPage numeber rows
   */

  getLoanProcess(id:number,word: string, page: number, perPage: number):Promise<PaginationResponse>{

    const paginator = new PaginationResponse(page, perPage);

    return this.get(`/loans/GetLoansCheckProcessAdmin/${id}/${word}/${page}/${perPage}`).toPromise().then(
      (response)=>{
        paginator.count = response.recordCount;
        paginator.data = response.loansDTOs.map((item:any)=>{
          const loan = new Loan();

          loan.id = item.idLoan;
          loan.applicant = new User();
          loan.applicant.id = item.idUser;
          loan.amount = item.amount || item.ammount;
          loan.applicant.cuit = item.cuit;
          loan.applicant.bussinessName = item.socialReason;
          loan.applicant.email = item.email;
          loan.applicant.phone = item.phone;
          loan.applicant.address = new Address();
          loan.applicant.address.street = item.street;
          loan.applicant.address.state = new State(null, item.stateName);
          loan.applicant.avatarURL = environment.api.avatarUrl + item.avatarURL;

          loan.employees = item.employees;
          loan.transactionType = new TransactionType(item.idTransactionType);
          loan.loanConcept = item.loanConcept;
          loan.status = new LoanStatus(item.loanStatus);
          loan.insuranceStatus = new LoanStatus(item.loanInsuranceStatus);
          loan.applicationDate = item.applicationDate;
          loan.responseDate = item.responseDate;
          loan.verifiedDate = item.verifiedDate;
          loan.peygoldExpirationDate = item.peygoldExpirationDate;
          loan.verifiedInformation = item.verifiedInformation;
          loan.verifiedComments = item.verifiedComments;
          loan.approveDeniedComments = item.approveDeniedComments;
          loan.comments = item.comments;
          loan.checkRescue = new CheckRescue(null, item.checkRescueName);
          loan.paymentMethod = new PaymentMethod(null, item.paymentMethodName);
          loan.creditDestination = new CreditDestination(null, item.creditDestinationName);
          loan.creditDetailId = item.loanCreditDetailId;
          loan.adminStatus = new LoanStatus(item.adminStatus);
          loan.adminProcessingDate = item.adminProcessingDate;
          loan.adminComments = item.adminComments;
          loan.adminUser = new User();
          loan.adminUser.id = item.adminIdUser;
          loan.riskySituation = item.riskySituation;
          loan.insuranceCarrier = new SelectOption(null,item.insuranceSocialReason);
          loan.policyNumber = item.loanInsuranceNumeroPoliza;
          loan.loanInsuranceComments = item.loanInsuranceComentarios;

          return loan;
        });
        return paginator;
      }
    ).catch(
      ()=>{
        return paginator;
      }
    );

  }

/**
 * get list of logs update od chech
 * @param id is id of check
 */
  getCheckLogs(id:number):Promise<Array<CheckLog>>{
    let checkLogs = new Array<CheckLog>();
    return this.get(`/loans/GetLoanCheckLogs/${id}`).toPromise().then(
      (resp)=>{
        checkLogs = resp.map((item:any)=>{
          const checkLog = new CheckLog();
          checkLog.id = item.loanCreditCheckDetailLogId;
          checkLog.idCheck = item.loanCreditCheckDetailId;
          checkLog.comments = item.comments;
          checkLog.userUpdate = new User();
          checkLog.userUpdate.id = item.idUserUpdate;
          checkLog.userUpdate.name = item.userUpdate;
          checkLog.modificationDate = item.dateUpdate;
          checkLog.oldData = item.oldData;
          checkLog.newData = item.oldData;
          return checkLog;
        });

        return checkLogs;
      }
    ).catch(
      ()=>{
        return checkLogs;
    });
  }



}
