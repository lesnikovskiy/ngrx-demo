import { Company } from '../models/company';
import * as fromCompanies from '../actions/company.actions';

class State {
    companies: Company[];
    company: Company;
    hasError: boolean;
    errMessage: string;
}

const initialState: State = {
    companies: [],
    company: null,
    hasError: false,
    errMessage: null
};

export function companyReducer(state = initialState, action: fromCompanies.Actions) {
    switch (action.type) {
        case fromCompanies.LOAD_COMPANIES_SUCCESS: {
            return state = {
                companies: action.payload,
                company: state.company,
                hasError: state.hasError,
                errMessage: state.errMessage
            };
        }
        case fromCompanies.LOAD_COMPANY_SUCCESS: {
            return state = {
                companies: state.companies,
                company: action.payload,
                hasError: state.hasError,
                errMessage: state.errMessage
            };
        }
        case fromCompanies.EDIT_COMPANY_SUCCESS: {
            return state = {
                companies: state.companies,
                company: action.payload,
                hasError: state.hasError,
                errMessage: state.errMessage
            };
        }
        case fromCompanies.ADD_COMPANY_SUCCESS: {
            return state = {
                companies: [...state.companies, action.payload],
                company: action.payload,
                hasError: state.hasError,
                errMessage: state.errMessage
            };
        }
        case fromCompanies.DELETE_COMPANY_SUCCESS: {
            return state = {
                companies: state.companies.filter(company => company.id && company.id !== action.payload),
                company: state.company,
                hasError: state.hasError,
                errMessage: state.errMessage
            };
        }
        case fromCompanies.HTTP_ERROR: {
            return state = {
                companies: state.companies,
                company: state.company,
                hasError: true,
                errMessage: action.payload
            };
        }
        default: {
            return state;
        }
    }
}
