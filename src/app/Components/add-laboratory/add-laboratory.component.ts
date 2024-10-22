import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Laboratoire } from '../../models/laboratoire.model';
import { LaboratoireService } from '../../Services/Laboratory-service';

@Component({
  selector: 'app-add-laboratory',
  templateUrl: './add-laboratory.component.html',
  styleUrl: './add-laboratory.component.css'
})
export class AddLaboratoryComponent  implements OnInit{

  labForm!: FormGroup;

  constructor(private fb: FormBuilder, private laboratoireService: LaboratoireService) {}

  ngOnInit(): void {
    this.labForm = this.fb.group({
      name: ['', Validators.required],
      logo: ['', Validators.required],
      nrc: ['', Validators.required],
      active: [true],
      dateActivation: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.labForm.valid) {
        const laboratoireData: Omit<Laboratoire, 'id'> = { 
            name: this.labForm.value.name,
            logo: this.labForm.value.logo,
            nrc: this.labForm.value.nrc,
            active: this.labForm.value.active === true,
            dateActivation: new Date(this.labForm.value.dateActivation) 
        };

        this.laboratoireService.createLaboratoire(laboratoireData).subscribe({
            next: (response) => {
                console.log('Laboratoire créé avec succès', response);
            },
            error: (error) => {
                console.error('Erreur lors de la création du laboratoire:', error.message || error);
                if (error.error && error.error.message) {
                    console.error('Détails de l\'erreur:', error.error.message);
                }
            }
        });
    }
}

}

