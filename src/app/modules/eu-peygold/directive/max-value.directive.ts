import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormGroup, FormControl } from '@angular/forms';

@Directive({
  selector: '[max-value][formControlName],[max-value][formControl],[max-value][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MaxValueDirective, multi: true }]
})
export class MaxValueDirective implements Validator {

  @Input('max-value') max: number;

  constructor() { }

  validate(c: FormControl): { [key: string]: any } {
    let v = c.value;
    return (v > this.max) ? { "max": true } : null;
  }

}

