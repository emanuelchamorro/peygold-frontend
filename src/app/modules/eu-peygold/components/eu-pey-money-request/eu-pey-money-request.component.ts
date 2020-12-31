import {Component, OnInit} from '@angular/core';
import {Transaction, User} from '../../../../models';
import {BaseComponent} from '../base.component';
import {AuthService} from '../../../auth-peygold/services/auth.service';
import {RequestTransactionsService} from '../../services/request-transactions.service';
import {Message} from '../../../commons-peygold/entities/message';
import {Router} from '@angular/router';
import {ErrorResponse} from '../../../commons-peygold/entities/error-response';
import { NgxSpinnerService } from 'ngx-spinner';
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-eu-pey-money-request',
  templateUrl: './eu-pey-money-request.component.html',
  styleUrls: ['./eu-pey-money-request.component.scss']
})
export class EuPeyMoneyRequestComponent extends BaseComponent implements OnInit {

  private user: User;

  private suggestedUsers: Array<User>;

  /**
   * EuPeyMoneyRequestComponent
   * @param router Router provider
   * @param authService AuthService provider
   * @param requestTransactionsService RequestTransactionsService provider
   */
  constructor(
    protected router: Router,
    private authService: AuthService,
    private transactionsService: TransactionsService,
    private requestTransactionsService: RequestTransactionsService,
    private spinnerService:NgxSpinnerService
  ) {
    super();
  }

  /**
   * On init implementation
   */
  ngOnInit() {
    this.user = this.authService.user();
    this.transactionsService.getSuggestedContacts(6).then(
      (resp:Array<User>)=>{
        this.suggestedUsers = resp;
      }
    );
  }

  /**
   * Send the request transaction
   * @param transaction the transaction
   * @return void;
   */
  send(transaction: Transaction) {
    this.submitted = true;
    if (! transaction.isValidToStart) {
        this.setError('No es posible realizar la transacción');
        this.submitted = false;
        return;
    }
    this.spinnerService.show();
    this.requestTransactionsService.create(transaction).then((resp) => {
      this.spinnerService.hide();
      console.log('resp create request transaction',resp)
      this.showSuccessFeedback(new Message(
        '¡Tu solicitud fue enviada!',
        `Hemos enviado una solicitud de pago a <b> ${transaction.sender.completeName}</b> <br>` +
        'Te avisaremos en cuanto el cobro haya sido efectuado de forma exitosa'
      )); 
    }).catch((e: ErrorResponse) => {
      console.log('Error create request transaction', e)
      this.spinnerService.hide();
      this.submitted = false;
      const message = e.message || 'No es posible realizar la transacción';
      this.setError(message);
    });
  }
}
