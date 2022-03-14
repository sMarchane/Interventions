import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { TypeProblemeService } from './type-probleme.service';
import { ITypeProbleme } from './typeProbleme';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  typesprobleme: ITypeProbleme[];
  errorMessage: string;
  
  

  constructor(private fb: FormBuilder, private typeproblemeService: TypeProblemeService) { }

  ngOnInit(): void {
    this.problemeForm = this.fb.group({
        prenom: ['',[VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],
        noTypeProbleme: ['', [Validators.required]]
    });

    this.typeproblemeService.obtenirTypesprobleme()
    .subscribe(tp => this.typesprobleme = tp,
    error => this.errorMessage = <any>error);
  }
  save(): void{ 

  }

}
