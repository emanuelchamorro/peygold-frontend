import { Injectable } from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {Address, CheckRescue, Loan, LoanStatus, PaymentMethod, State, Transaction, TransactionType, User, LoanRequest} from '../../../models';
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
  search(type: TransactionType, word = '@', page = 1, perPage = environment.paginator.per_page): Promise<PaginationResponse> {
    const paginator = new PaginationResponse(page, perPage);
    return this.getTest(`https://api.peygold.com/api/loans/searchbyuser/3/${word}/${page}/${perPage}`).toPromise().then(
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
          loan.globalStatus = (loan.status.value=='2' && loan.insuranceStatus.value=='2') ? new LoanStatus('2') : 
          (loan.status.value=='3' ||  loan.insuranceStatus.value=='3') ? new LoanStatus('3') :  new LoanStatus('1');
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

  createLoan(params:any){
    return this.postTest('https://api.peygold.com/api/loans/CreateLoanCreditCheck',params).toPromise();
  }

}
