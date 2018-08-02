import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import { Company } from './../models/company';
import { CompanyServiceService } from './../company-service.service';
import * as companyActions from './../actions/company.actions';

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
                    })
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
                    })
                );
            })
        );
}
