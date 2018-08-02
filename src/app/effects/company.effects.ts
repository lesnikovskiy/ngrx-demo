import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Company } from './../models/company';
import { CompanyServiceService } from './../company-service.service';
import * as companyActions from './../actions/company.actions';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CompanyEffects {
    constructor(
        private readonly actions$: Actions,
        private companyService: CompanyServiceService
    ) { }

    @Effect()
    loadCompanies$ = this.actions$
        .ofType(companyActions.LOAD_COMPANIES)
        .pipe(
            switchMap(() => {
                return this.companyService.getCompanies().pipe(
                    map(companies => {
                        return new companyActions.LoadCompaniesSuccessAction(companies);
                    }),
                    catchError((err: HttpErrorResponse) => {
                        return of(new companyActions.HttpErrorAction(`${err.status} ${err.statusText}`));
                    })
                );
            })
        );

    @Effect()
    loadCompany$ = this.actions$
        .ofType(companyActions.LOAD_COMPANY)
        .pipe(
            switchMap((action: companyActions.LoadCompanyAction) => {
                return this.companyService.getCompany(action.payload).pipe(
                    map(company => new companyActions.LoadCompanySuccessAction(company)),
                    catchError((err: HttpErrorResponse) => of(new companyActions.HttpErrorAction(`${err.status} ${err.statusText}`)))
                );
            })
        );

    @Effect()
    deleteCompany$ = this.actions$
        .ofType(companyActions.DELETE_COMPANY)
        .pipe(
            switchMap((action: companyActions.DeleteCompanyAction) => {
                return this.companyService.deleteCompany(action.payload).pipe(
                    map((company: Company) => {
                        return new companyActions.DeleteCompanySuccessAction(company.id);
                    }),
                    catchError((err: HttpErrorResponse) => {
                        return of(new companyActions.HttpErrorAction(`${err.status} ${err.statusText}`));
                    })
                );
            })
        );
}
