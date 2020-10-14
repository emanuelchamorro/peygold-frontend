import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormGroup, FormControl } from '@angular/forms';

@Directive({
  selector: '[min-value][formControlName],[min-value][formControl],[min-value][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MinValueDirective, multi: true }]
})
export class MinValueDirective implements Validator {

  @Input('min-value') min: number;

  constructor() { }

  validate(c: FormControl): { [key: string]: any } {
    let v = c.value;
    return (v < this.min) ? { "min": true } : null;
  }



}

