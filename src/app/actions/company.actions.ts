import { Action } from '@ngrx/store';
import { Company } from './../models/company';

export const LOAD_COMPANIES = 'LOAD_COMPANIES';
export const LOAD_COMPANIES_SUCCESS = 'LOAD_COMPANIES_SUCCESS';
export const DELETE_COMPANY = 'DELETE_COMPANY';
export const DELETE_COMPANY_SUCCESS = 'DELETE_COMPANY_SUCCESS';
export const LOAD_COMPANY = 'LOAD_COMPANY';
export const LOAD_COMPANY_SUCCESS = 'LOAD_COMPANY_SUCCESS';
export const EDIT_COMPANY = 'EDIT_COMPANY';
export const EDIT_COMPANY_SUCCESS = 'EDIT_COMPANY_SUCCESS';
export const ADD_COMPANY = 'ADD_COMPANY';
export const ADD_COMPANY_SUCCESS = 'ADD_COMPANY_SUCCESS';
export const HTTP_ERROR = 'HTTP_ERROR';

export class LoadCompaniesAction implements Action {
    readonly type = LOAD_COMPANIES;

    constructor() { }
}

export class LoadCompaniesSuccessAction implements Action {
    readonly type = LOAD_COMPANIES_SUCCESS;

    constructor(public payload: Company[]) { }
}

export class LoadCompanyAction implements Action {
    readonly type = LOAD_COMPANY;

    constructor(public payload: number) { }
}

export class LoadCompanySuccessAction implements Action {
    readonly type = LOAD_COMPANY_SUCCESS;

    constructor(public payload: Company) { }
}

export class EditCompanyAction implements Action {
    readonly type = EDIT_COMPANY;

    constructor(public payload: Company) { }
}

export class EditCompanySuccessAction implements Action {
    readonly type = EDIT_COMPANY_SUCCESS;

    constructor(public payload: Company) { }
}

export class AddCompanyAction implements Action {
    readonly type = ADD_COMPANY;

    constructor(public payload: Company) { }
}

export class AddCompanySuccessAction implements Action {
    readonly type = ADD_COMPANY_SUCCESS;

    constructor(public payload: Company) { }
}

export class DeleteCompanyAction implements Action {
    readonly type = DELETE_COMPANY;

    constructor(public payload: number) { }
}

export class DeleteCompanySuccessAction implements Action {
    readonly type = DELETE_COMPANY_SUCCESS;

    constructor(public payload: number) { }
}

export class HttpErrorAction implements Action {
    readonly type = HTTP_ERROR;

    constructor(public payload: string) { }
}

export type Actions = LoadCompaniesAction | LoadCompaniesSuccessAction | DeleteCompanyAction | DeleteCompanySuccessAction
    | LoadCompanyAction | LoadCompanySuccessAction | EditCompanyAction | EditCompanySuccessAction
    | AddCompanyAction | AddCompanySuccessAction | HttpErrorAction;
