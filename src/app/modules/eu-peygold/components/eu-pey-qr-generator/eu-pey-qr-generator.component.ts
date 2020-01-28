import { Component, OnInit } from '@angular/core';
import {Transaction} from '../../../../models';
import {BaseComponent} from '../base.component';
import {AuthService} from '../../../auth-peygold/services/auth.service';

@Component({
  selector: 'app-eu-pey-qr-generator',
  templateUrl: './eu-pey-qr-generator.component.html',
  styleUrls: ['./eu-pey-qr-generator.component.scss']
})
export class EuPeyQrGeneratorComponent extends BaseComponent implements OnInit {

  private transaction: Transaction;

  constructor(
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit() {
  }

  setTransaction(transaction: Transaction) {
    transaction.receiver = this.authService.user();
    this.transaction = transaction;
    console.log(transaction.toQR)
  }
}
