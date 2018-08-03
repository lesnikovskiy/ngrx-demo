import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Company } from '../models/company';

@Component({
  selector: 'app-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.css']
})
export class CompanyTableComponent {

  @Input() companies: Company[];
  @Output() deleteCompany = new EventEmitter<number>();

}
