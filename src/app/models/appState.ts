import { Company } from './company';

export interface AppState {
    companies: {
        companies: Company[];
        company: Company;
        hasError: boolean;
        errMessage: string;
    };
}
