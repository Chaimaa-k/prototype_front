import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLaboratoryComponent } from './add-laboratory.component';
import { LaboratoireService } from '../../Services/Laboratory-service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('AddLaboratoryComponent', () => {
  let component: AddLaboratoryComponent;
  let fixture: ComponentFixture<AddLaboratoryComponent>;
  let laboratoireService: LaboratoireService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [AddLaboratoryComponent],
      providers: [LaboratoireService],
    }).compileComponents();

    fixture = TestBed.createComponent(AddLaboratoryComponent);
    component = fixture.componentInstance;
    laboratoireService = TestBed.inject(LaboratoireService);
    fixture.detectChanges();
  });

  it('should create the form with default values', () => {
    expect(component.labForm).toBeTruthy(); 
    expect(component.labForm.get('name')!.value).toBe(''); 
    expect(component.labForm.get('logo')!.value).toBe(''); 
    expect(component.labForm.get('nrc')!.value).toBe(''); 
    expect(component.labForm.get('active')!.value).toBe(true); 
    expect(component.labForm.get('dateActivation')!.value).toBe(''); 
  });
  
  it('should be invalid when required fields are empty', () => {
    const form = component.labForm;
  
    expect(form.get('name')!.value).toBe('');
    expect(form.get('logo')!.value).toBe('');
    expect(form.get('nrc')!.value).toBe('');
    expect(form.get('dateActivation')!.value).toBe('');
  
    expect(form.valid).toBeFalsy();  
  
    expect(form.get('name')!.valid).toBeFalsy();  
    expect(form.get('nrc')!.valid).toBeFalsy();   
  
    const nameErrors = form.get('name')!.errors || {};
    expect(nameErrors['required']).toBeTruthy();  
  
    const nrcErrors = form.get('nrc')!.errors || {};
    expect(nrcErrors['required']).toBeTruthy();   
  });
  
  it('should submit the form and create a laboratory', () => {
    const laboratoireData = {
        name: 'Test Laboratory',
        logo: 'http://example.com/logo.png',
        nrc: '123456',
        active: true,  
        dateActivation: new Date(),
    };

    spyOn(laboratoireService, 'createLaboratoire').and.returnValue(of(laboratoireData));

    component.labForm.setValue(laboratoireData);

    component.onSubmit();

    expect(laboratoireService.createLaboratoire).toHaveBeenCalledWith(laboratoireData);
});

it('should handle error on form submission', () => {
  
  spyOn(laboratoireService, 'createLaboratoire').and.returnValue(throwError({ message: 'Error occurred' }));

  const consoleErrorSpy = spyOn(console, 'error');

  component.labForm.setValue({
      name: 'Test Laboratory',
      logo: 'http://example.com/logo.png',
      nrc: '123456',
      active: true,
      dateActivation: new Date(),
  });


  component.onSubmit();

  expect(consoleErrorSpy).toHaveBeenCalledWith('Erreur lors de la création du laboratoire:', jasmine.any(String)); 
  expect(consoleErrorSpy.calls.mostRecent().args[1]).toEqual('Error occurred'); 
});

  
});


