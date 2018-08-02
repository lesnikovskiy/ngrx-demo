import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from './../models/appState';
import * as companyActions from './../actions/company.actions';
import { filter } from 'rxjs/operators';
import { CompanyEffects } from './../effects/company.effects';
import { Company } from './../models/company';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  companyForm: FormGroup;
  isNewCompany: boolean;
  companyId: any;

  constructor(
    private readonly store: Store<AppState>,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly companyEffects: CompanyEffects
  ) { }

  ngOnInit() {
    this.companyId = this.activatedRoute.snapshot.params['id'];
    this.isNewCompany = this.companyId === 'new';
    this.buildForm();
    if (!this.isNewCompany) {
      this.getCompany();
    }
  }

  getCompany() {
    this.store.dispatch(new companyActions.LoadCompanyAction(+this.companyId));
    this.store.select(state => state).pipe(
      filter(state => state.companies.company != null)
    ).subscribe((state => this.companyForm.patchValue(state.companies.company)));
  }

  buildForm() {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      email: [''],
      phone: ['']
    });
  }

  saveCompany() {
    if (this.isNewCompany) {
      this.store.dispatch(new companyActions.AddCompanyAction(this.companyForm.value));
      this.companyEffects.addCompany$.pipe(filter(action => action.type === companyActions.ADD_COMPANY_SUCCESS)).subscribe(() => {
        this.router.navigate([`/company/list`]);
      });
    } else {
      const companyToUpdate = { ...this.companyForm.value, id: this.companyId };
      this.store.dispatch(new companyActions.EditCompanyAction(companyToUpdate));
      this.companyEffects.editCompany$.pipe(filter(action => action.type === companyActions.EDIT_COMPANY_SUCCESS)).subscribe(() => {
        this.router.navigate([`/company/list`]);
      });
    }
  }

  cancel() {
    this.router.navigate(['/company/list']);
  }
}
