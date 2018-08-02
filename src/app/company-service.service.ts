import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Company } from './models/company';

const API_BASE = 'http://firebootcamp-crm-api.azurewebsites.net/api';

@Injectable({
  providedIn: 'root'
})
export class CompanyServiceService {

  constructor(private readonly http: HttpClient) { }

  getCompany(companyId: number): Observable<Company> {
    return this.http.get<Company>(`${API_BASE}/company/${companyId}`).pipe(catchError(this.handleError));
  }

  loadCompanies() {
    return this.http.get(`${API_BASE}/company`).pipe(catchError(this.handleError));
  }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${API_BASE}/company`).pipe(catchError(this.handleError));
  }

  deleteCompany(companyId: number) {
    return this.http.delete(`${API_BASE}/company/${companyId}`).pipe(catchError(this.handleError));
  }

  addCompany(company: Company) {
    return this.http.post(`${API_BASE}/company`, company).pipe(catchError(this.handleError));
  }

  updateCompany(company: Company) {
    return this.http.put(`${API_BASE}/company/${company.id}`, company).pipe(catchError(this.handleError));
  }

  handleError(e: HttpErrorResponse) {
    return throwError(e);
  }
}
