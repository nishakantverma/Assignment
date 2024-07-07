import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import { ReportConfirmationComponent } from '../report-confirmation/report-confirmation.component';
@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss'],
  // standalone:true,
  // imports:[ReactiveFormsModule,MatFormFieldModule,MatNativeDateModule,MatAutocompleteModule,MatDatepickerModule
  //   ,CurrencyPipe,AsyncPipe,CommonModule,FormsModule,MatInputModule],
})
export class ReportFormComponent implements OnInit {
  reportForm!: FormGroup;
  filteredOptions!: Observable<string[]>;
  options: string[] = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
 
  constructor(private fb: FormBuilder, private dialog:MatDialog) {}
 
  ngOnInit(): void {
this.reportForm = this.fb.group({
      date: ['', Validators.required],
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      baggageCount: ['', [Validators.required, Validators.min(1)]],
      valuables: this.fb.array([])
    });
 
    this.filteredOptions = this.reportForm.get('origin')?.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    )??of([])
 
    this.addValuable(); // Add initial valuable input
  }
 
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
 
  get valuables(): FormArray {
    return this.reportForm.get('valuables') as FormArray;
  }
 
  addValuable(): void {
this.valuables.push(this.fb.group({
      name: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]]
    }));
  }
 
  get totalClaimAmount(): number {
    return this.valuables.controls.reduce((total, control:any) => {
      const quantity = control.get('quantity').value;
      const price = control.get('price').value;
      return total + (quantity * price);
    }, 0);
  }
 
  onSubmit(): void {
    if (this.reportForm.valid) {
      // console.log(this.reportForm.value);
      // Handle form submission logic here
      this.openDialog();
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(ReportConfirmationComponent, {data: {
      valuables: this.reportForm.value,
    }, height: '400px', width: '600px', });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
}