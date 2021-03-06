import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Company } from '../models/company';
import { AppState } from '../models/appState';
import * as companyActions from '../actions/company.actions';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  companies$: Observable<Company[]>;
  hasError$: Observable<boolean>;
  errMessage$: Observable<string>;

  constructor(private readonly store: Store<AppState>) { }

  ngOnInit() {
    this.loadCompanies();

    this.companies$ = this.store.select(state => state.companies.companies);
    this.hasError$ = this.store.select(state => state.companies.hasError);
    this.errMessage$ = this.store.select(state => state.companies.errMessage);
  }

  loadCompanies() {
    this.store.dispatch(new companyActions.LoadCompaniesAction());
  }

  deleteCompany(companyId: number) {
    this.store.dispatch(new companyActions.DeleteCompanyAction(companyId));
  }
}
