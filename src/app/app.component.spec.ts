import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AddLaboratoryComponent } from './Components/add-laboratory/add-laboratory.component';
import { LaboratoireService } from './Services/Laboratory-service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AddLaboratoryComponent
      ],
      imports: [HttpClientTestingModule], 
      providers: [LaboratoireService]  
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});