import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../models/user';
import {Person} from '../../../models/person';
import {Company} from '../../../models/company';
import {Institution} from '../../../models/institution';
import {LocationService} from '../../../services/location.service';

@Component({
  selector: 'app-pey-register',
  templateUrl: './pey-register.component.html',
  styleUrls: ['./pey-register.component.scss']
})
export class PeyRegisterComponent implements OnInit {

  constructor(private route: ActivatedRoute, private locationService: LocationService) { }

  private type: string;
  private user: User;
  private step = 2;

  ngOnInit() {
    this.locationService.getCountries();
    this.type = this.route.snapshot.data[`type`];

    switch (this.type) {
      case 'person':
        this.user = new Person();
        break;
      case 'company':
        this.user = new Company();
        break;
      case 'institution':
        this.user = new Institution();
        break;
      default:
        this.user = null;
    }
  }

  /**
   * Checks if the register form is able to continue with the next step.
   */
  nextStep(): void {
    window.scroll(0,0);
    this.step++;
  }

  /**
   * Checks if the register form is able to continue with the next step.
   */
  previoustStep(): void {
    this.step--;
  }

  /**
   * Checks if the register form is able to continue with the next step.
   */
  isValidForm(): boolean {
    let valid = false;

    if (this.step === 1) {
      valid = true;
    }

    return valid;
  }
}
