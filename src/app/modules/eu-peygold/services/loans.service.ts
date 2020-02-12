import { Injectable } from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {Address, CheckRescue, Loan, LoanStatus, PaymentMethod, State, Transaction, TransactionType, User, LoanRequest, SelectOption, Check, Bank, Country, City} from '../../../models';
import {environment} from '../../../../environments/environment';
import {PaginationResponse} from '../../commons-peygold/entities/pagination-response';

@Injectable({
  providedIn: 'root'
})
export class LoansService extends HttpService {



  /**
   * Search loans.
   * @return Promise<Array<Transaction>> the list of transaction
   */
  search(type: TransactionType, word:string, page: number, perPage: number): Promise<PaginationResponse> {
    const paginator = new PaginationResponse(page, perPage);
    return this.get(`/loans/searchbyuser/3/${word}/${page}/${perPage}`).toPromise().then(
      (response: any) => {
        paginator.count = response.recordCount;
        paginator.data = response.loansDTOs.map((item: any) => {
          const loan = new Loan();

          loan.id = item.idLoan;
          loan.creditDetailId = item.loanCreditDetailId;
          loan.amount = item.amount || item.ammount;
          loan.employees = item.employees;
          loan.transactionType = new TransactionType(item.idTransactionType);
          console.log(loan.transactionType);
          loan.loanConcept = item.loanConcept;
          loan.status = new LoanStatus(item.loanStatus);
          loan.insuranceStatus = new LoanStatus(item.loanInsuranceStatus);
          loan.verifiedInformation = item.verifiedInformation;
          loan.verifiedComments = item.verifiedComments;
          loan.approveDeniedComments = item.approveDeniedComments;
          loan.checkRescue = new CheckRescue(null, item.checkRescueName);
          loan.paymentMethod = new PaymentMethod(null, item.paymentMethodName);
          loan.creditDestination = new PaymentMethod(null, item.creditDestinationName);
          loan.applicationDate = item.applicationDate;
          loan.responseDate = item.responseDate;
          loan.verifiedDate = item.verifiedDate;
          loan.peygoldExpirationDate = item.peygoldExpirationDate;

          loan.applicant = new User();
          loan.applicant.id = item.idUser;
          loan.applicant.cuit = item.cuit;
          loan.applicant.bussinessName = item.socialReason;
          loan.applicant.email = item.email;
          loan.applicant.phone = item.phone;
          loan.applicant.avatarURL = environment.api.avatarUrl + item.avatarURL;
          loan.applicant.address = new Address();
          loan.applicant.address.street = item.street;
          loan.applicant.address.state = new State(null, item.stateName);
          loan.comments = 'No hay notas'

          return loan;
        });

        return paginator;
      }
    ).catch(() => {
      return paginator;
    });
  }


    /**
   * Create loans.
   * 
   */
  createLoan(params:any){
    return this.post('/loans/CreateLoanCreditCheck',params).toPromise();
  }

    /**
   * get loan detail.
   * @param id
   * @return Promise<Loan> credit info by id
   */

  getById(id:number):Promise<Loan>{
    const loan = new Loan();
    return this.get(`/loans/GetLoanCreditCheck/${id}`).toPromise().then(
      (response)=>{
        loan.id = response.idLoan;
        loan.amount = response.ammount;
        loan.checkRescue = new CheckRescue(null, response.checkRescueName);
        loan.insuranceCarrier = new SelectOption(response.insuranceCarrierId, response.insuranceLoanInfo);
        loan.amountOfBeneficiary = response.amountOfBeneficiary;
        loan.verifiedInformation = response.verifiedInformation;

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
        loan.comments = response.comments ?response.comments : 'No hay comentarios';
        loan.checks = response.checkInfo.map((item:any)=>{
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

          check.issuanceDateStr = item.fechaEmisionCheque;
          check.expirationDateStr = item.fechaVencimientoCheque;
          check.bank = new Bank(item.idBank, item.bankName);

          check.onwer = new User();
          check.onwer.bussinessName = item.cbu;
          check.onwer.cuit = item.cuit;
          check.onwer.documentNumber = item.dniFirmante;
          check.onwer.email = item.emailFirmante;
          check.onwer.fullName = item.fullNameFirmante;
          check.onwer.phone = item.telefonoFirmante;
          return check;
         });
        return loan;
      }
    ).catch(() => {
      return loan;
    });

  }

}
