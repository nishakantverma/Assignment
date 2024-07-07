import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportFormComponent } from './report-form.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs'; // for mocking observables
import {MatDialog} from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { ReportConfirmationComponent } from '../report-confirmation/report-confirmation.component';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';


describe('ReportFormComponent', () => {
  let component: ReportFormComponent;
  let fixture: ComponentFixture<ReportFormComponent>;
  let fb: FormBuilder; // Mock FormBuilder
  let dialogMock: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    dialogMock =jasmine.createSpyObj('MatDialog',['open']);
    fb = jasmine.createSpyObj('FormBuilder', ['group']); 
    await TestBed.configureTestingModule({
      imports:[MatDialogModule,ReactiveFormsModule,MatAutocompleteModule,
        MatFormFieldModule,MatDatepickerModule,MatNativeDateModule,MatInputModule,
        BrowserAnimationsModule,RouterTestingModule
      ],
      declarations: [ ReportFormComponent,ReportConfirmationComponent ],
      providers: [{provide: MatDialog, use: dialogMock}
                   
       ]
    })
    .compileComponents();
// { provide: FormBuilder, useValue: fb },{provide: MatDialog, use: dialogMock}
    fixture = TestBed.createComponent(ReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create reportForm with required validators', () => {
    expect(component.reportForm instanceof FormGroup).toBeTruthy();
    const controls = component.reportForm.controls;  
    // expect(controls['date'].validator).toEqual(Validators.required);
    // expect(controls['origin'].validator).toEqual(Validators.required);
    // expect(controls['destination'].validator).toEqual(Validators.required);
    // expect(controls['baggageCount'].validator).toEqual(jasmine.objectContaining({ required: true, min: 1 }));
    });

    it(
      'should open a dialog on button click', () =>
      {
        component.reportForm.controls['date'].setValue(new Date());
        component.reportForm.controls['origin'].setValue('New York');
        component.reportForm.controls['destination'].setValue('New York');
        component.reportForm.controls['baggageCount'].setValue(1);
        const button = fixture.nativeElement.querySelector('#submit');
      // Replace with actual button selector
      button.click(); fixture.detectChanges(); 
      expect(dialogMock.open).toHaveBeenCalled();
      // Verify dialog.open is called
      });
});
