import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CompanyServiceService } from './../company-service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from './../models/appState';
import * as companyActions from './../actions/company.actions';

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
    private readonly companyService: CompanyServiceService,
    private readonly fb: FormBuilder
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
    this.companyService.getCompany(+this.companyId).subscribe(company => this.companyForm.patchValue(company));
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
      this.companyService.addCompany(this.companyForm.value).subscribe(() => this.router.navigate([`/company/list`]));
    } else {
      const companyToUpdate = { ...this.companyForm.value, id: this.companyId };
      this.companyService.updateCompany(companyToUpdate).subscribe(() => this.router.navigate([`/company/list`]));
    }
  }

  cancel() {
    this.router.navigate(['/company/list']);
  }
}
