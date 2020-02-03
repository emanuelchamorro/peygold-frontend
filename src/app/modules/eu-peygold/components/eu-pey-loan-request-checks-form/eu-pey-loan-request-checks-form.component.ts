import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {InMemoryService, LocationService} from '../../../../services';
import {LoanOption, Check, Bank, State, City, Country, LoanRequest} from '../../../../models';
import {BanksService} from '../../services/banks.service';
import {environment} from '../../../../../environments/environment';



@Component({
  selector: 'app-eu-pey-loan-request-checks-form',
  templateUrl: './eu-pey-loan-request-checks-form.component.html',
  styleUrls: ['./eu-pey-loan-request-checks-form.component.scss']
})
export class EuPeyLoanRequestChecksFormComponent implements OnInit {


  @Input('loanRequest') loanRequest:LoanRequest;
  @Output()
  public onContinue: EventEmitter<LoanOption> = new EventEmitter<LoanOption>();
  private loanOptions: Array<LoanOption>;
  private loanOption: LoanOption;
  private check: Check;
  private banks: Array<Bank>;
  private states: Array<State>;
  private cities: Array<City>;
  private allChecksComplete:boolean;


  constructor(
    private inMemoryService: InMemoryService,
    private bankService: BanksService,
    private locationService: LocationService
  ) { }

  /**
   * On Init implementation
   */
  ngOnInit() {
    this.loanOptions = this.inMemoryService.loanOptions(this.loanRequest.amount);
    this.bankService.all().then((banks) => this.banks = banks);
    const country = new Country(environment.locations.default.id, environment.locations.default.label);
    this.locationService.getStates(country).then((states) => this.states = states);
  }

  /**
   * Select the loan option
   * @param option The selected loan option
   */
  selectOption(option: LoanOption): void {
    this.loanOption = option;
    this.check = option.checks[0];
  }

  /**
   * Set the current check to be updated.
   * @param check The check object
   */
  setCheck(check: Check, index:number): void {
    if(index!=0){
      let previous = this.loanOption.checks[index-1];
      if(previous.isComplete){
        this.check = check;
      }
    }else{
      this.check = check;
    }    
  }
  

  /**
   * Get the cities by the selected  state
   * @return void
   */
  protected getCities(state: State): void {
    if (!state) {
      return;
    }
    this.requestCities(state).then();
  }
 
  /**
   * Request the states by the selected country
   * @param country The selected country
   */
  protected requestCities(state: State): Promise<Array<City>> {
    return this.locationService.getCities(state).then((cities: Array<City>) => {
      this.cities = cities;
      return cities;
    });
  }

  saveContinue(check:Check,index:number):boolean{
    let isValid:boolean;
    if(check.isComplete){
        console.log('check',check);
        isValid = true;
    }else{
        console.log('check','not');
        isValid = true;
    }    false

    if(this.loanOption.checks.length == index+1){
      let isValid = true;
      this.loanOption.checks.forEach(check => {
        if(!check.isValid){
          isValid = false;
          return;
        } 
      });
      this.allChecksComplete = isValid;
    }else{
      if(isValid){
        const nextCheck = this.loanOption.checks[index+1];
        this.setCheck(nextCheck,index+1);
      }
    }

    return false;
  }

  public uploadImage($event: Event,check:Check,type:number): void {
   let file:File =  $event.target[`files`][0]

   const reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = () => {
     const result: string = reader.result as string;
     let data = '';

     if (result.includes(',')) {
       data = result.split(',')[1] || '';
      if(type == 1){
        check.frontImage = data;
      }else{
        check.backImage = data;
      }
     }
   };
   reader.onerror = (error) => {
     console.log(error);
   };    
  }

  checkCopy(currentCheck:Check, index:number):boolean{
    const checkFrom = this.loanOption.checks[index - 1];
    currentCheck.checkCopy(checkFrom);
    return false;
  }


  continue(){
    this.onContinue.emit(this.loanOption);
  }

}
