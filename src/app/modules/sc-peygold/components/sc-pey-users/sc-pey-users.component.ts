import { Component, OnInit } from '@angular/core';
import { User, UserStatus } from '../../../../models';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { BaseComponent } from '../base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../../environments/environment';
import { PaginationResponse } from '../../../commons-peygold/entities/pagination-response';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

@Component({
  selector: 'app-sc-pey-users',
  templateUrl: './sc-pey-users.component.html',
  styleUrls: ['./sc-pey-users.component.scss']
})
export class ScPeyUsersComponent extends BaseComponent implements OnInit {

  private users: PaginationResponse;

  private detailedUser: User;
  public totalItems: number;
  public page: number;
  public previousPage: number;
  public showPagination: boolean;
  public filter: string;
  private exportAsConfig: ExportAsConfig;
  /**
   * ScPeyDashboardComponent
   */
  constructor(
    private usersService: UsersService,
    protected router: Router,
    private spinnerService: NgxSpinnerService,
    private exportAsService: ExportAsService,
  ) {
    super();
  }

  /**
   * On init implementation
   */
  ngOnInit() {

    this.spinnerService.show();
    this.usersService.searchAll('@', 1, environment.paginator.per_page).then((response: PaginationResponse) => {
      this.users = response;
      console.log('users',this.users.data )
      if (this.users.data.length > 0) {
        this.page = response.page;
        this.previousPage = 1;
        this.totalItems = response.count;
        this.showPagination = true;
      } else {
        this.page = 1;
        this.previousPage = 1;
        this.totalItems = 0;
        this.showPagination = false;
      }
      this.spinnerService.hide();
    }).catch(
      (erro) => {
        this.page = 1;
        this.previousPage = 1;
        this.totalItems = 0;
        this.showPagination = false;
        this.spinnerService.hide();
        this.setError("Ha ocurrido un error. No será posible listar los usuarios del sistema.");
      }
    );

  }

  /**
   * Export the data to document.
   * @param type Exporting type
   * @return void
   */
  export(typeExport: any): void {
    console.log(typeExport);
    this.exportAsConfig = {
      type: typeExport, // the type you want to download
      elementIdOrContent: 'tableUsers', // the id of html/table element
    }
    this.exportAsService.save(this.exportAsConfig, 'Usuarios').subscribe(
      () => {},// save started
      (error) => {
        this.setError("No es posible exportar el reporte en el formato seleccionado.");
      }
      );
  }

  /**
   * Show the user detail
   * @param user The user to show
   * @return void
   */
  showUser(user: User): void {
    this.detailedUser = user;
  }

  /**
   * Activate the user
   * @param user The user to be activated.
   * @return void
   */
  activateUser(user: User): void {
    this.spinnerService.show();
    this.usersService.changeActive(user.id, true).then(
      (resp)=>{
        this.spinnerService.hide();
        console.log('resp active user',resp);
        user.active = true;
      }     
    ).catch(
      (error)=>{
        this.spinnerService.hide();
        console.log('error active user',error);
        user.active = false;
      }
    );
  }

  /**
   * Deactivate the user
   * @param user The user to be deactivated.
   * @return void
   */
  deactivateUser(user: User): void {
    this.spinnerService.show();
    this.usersService.changeActive(user.id, false).then(
      (resp)=>{
        this.spinnerService.hide();
        console.log('resp active user',resp);
        user.active = false;
      }     
    ).catch(
      (error)=>{
        this.spinnerService.hide();
        console.log('error active user',error);
        user.active = true;
      }
    );
  }


  /**
   * Filter the user list by
   * @param filter filter value
   * @return void
   */
  filterUsers(filter: string): void {

  }

  /**
   * Filter the user list by the selected User Status model.
   * @param userStatus the selected user status.
   * @return void
   */
  filterByStatus(userStatus: UserStatus): void {

  }

  loadPage(page: number) {
    let word = (this.filter && this.filter != '') ? this.filter : '@';
    //let word = (this.selectFilter && this.selectFilter != '') ? this.selectFilter : (this.filter && this.filter != '') ? this.filter : '@';
    console.log('word', word);
    this.previousPage = page - 1;
    this.spinnerService.show();
    this.usersService.searchAll(word, page, environment.paginator.per_page).then((response: PaginationResponse) => {

      this.users = response;
      if (this.users.data.length) {
        this.page = response.page;
        this.previousPage = 1;
        this.totalItems = response.count;
        console.log('count record', this.totalItems);
        this.showPagination = true;
      } else {
        this.page = 1;
        this.previousPage = 1;
        this.totalItems = 0;
        this.showPagination = false;
      }
      this.spinnerService.hide();
    }).catch(
      (erro) => {
        this.page = 1;
        this.previousPage = 1;
        this.totalItems = 0;
        this.showPagination = false;
        this.spinnerService.hide();
        this.setError("Ha ocurrido un error. No será posible listar los usuarios del sistema.");
      }
    );
  }

  /**
   * search loans by word
   * @param filter 
   */

  search(filter: string) {
    console.log('filter', this.filter);
   // this.selectFilter = '';
    if (this.filter.length > 3) {
      this.loadPage(1);
    } else if (this.filter.length == 0) {
      this.filter = '';
     // this.selectFilter = '';
      this.loadPage(1);
    }
  }

}
