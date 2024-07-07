import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-report-confirmation',
  templateUrl: './report-confirmation.component.html',
  styleUrls: ['./report-confirmation.component.scss']
})
export class ReportConfirmationComponent implements OnInit {
  displayedColumns: string[] = ['name', 'quantity', 'price'];
  dataSource!: MatTableDataSource<any>;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data.valuables.valuables);
  }

}
