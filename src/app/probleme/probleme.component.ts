import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { emailMatcherValidator } from '../shared/longueur-minimum/email-matcher/email-matcher.component.spec';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { IProbleme } from './probleme';
import { TypeProblemeService } from './type-probleme.service';
import { ITypeProbleme } from './TypeProbleme';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  typesprobleme: ITypeProbleme[];
  errorMessage: string;
  probleme: IProbleme;
  problemeService: any;
  route: any;
  
  

  constructor(private fb: FormBuilder, private typeproblemeService: TypeProblemeService) { }

  ngOnInit(): void {
    this.problemeForm = this.fb.group({
        prenom: ['',[VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],
        nom: ['', [Validators.maxLength(50), Validators.required]],
        noTypeProbleme: ['', [Validators.required]],
        courrielGroup: this.fb.group({
          courriel: [{value: '', disabled: true}],
          courrielConfirmation: [{value: '', disabled: true}],
        }),
      notification:['pasnotification'],  
      telephone: [{value: '', disabled: true}],
      descriptionProbleme: ['', [Validators.required, Validators.minLength(5)]],
      noUnite: '',
      dateProbleme: {value: Date(), disabled: true}
    });
    this.problemeForm.get('notification').valueChanges¬† ¬† .subscribe(value => this.appliquerNotification(value));
    this.typeproblemeService.obtenirTypesprobleme()
    .subscribe(tp => this.typesprobleme = tp,
    error => this.errorMessage = <any>error);
  }
  save(): void {
    if (this.problemeForm.dirty && this.problemeForm.valid) {
        // Copy the form values over the problem object values
        this.probleme = this.problemeForm.value;
        this.probleme.id = 0;
        this.probleme.courriel = this.problemeForm.get('courrielGroup.courriel').value;
        //this.probleme.dateProbleme = new Date();
        this.typeproblemeService.saveProbleme(this.probleme)
            .subscribe( // on s'abonne car on a un retour du serveur √† un moment donn√© avec la callback fonction
                () => this.onSaveComplete(),  // Fonction callback
                (error: any) => this.errorMessage = <any>error
            );
    } else if (!this.problemeForm.dirty) {
        this.onSaveComplete();
    }
  }


  onSaveComplete(): void { 
    // Reset the form to clear the flags
    this.problemeForm.reset();  // Pour remettre Dirty √† false.  Autrement le Route Guard va dire que le formulaire n'est pas sauvegard√©
    this.route.navigate(['/accueil']);
  }

  appliquerNotification(notifyVia: string): void {
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');   
    const telephoneControl = this.problemeForm.get('telephone');      
    const courrielGroupControl = this.problemeForm.get('courrielGroup');

    // Tous remettre √† z√©ro
    courrielControl.clearValidators();
    courrielControl.reset();  // Pour enlever les messages d'erreur si le controle contenait des donn√©es invaldides
    courrielControl.disable();  

    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();    
    courrielConfirmationControl.disable();

    telephoneControl.clearValidators();
    telephoneControl.reset();    
    telephoneControl.disable();
    telephoneControl.updateValueAndValidity();
    courrielControl.updateValueAndValidity();
    courrielConfirmationControl.updateValueAndValidity();
    if (notifyVia === 'courriel') {   
      courrielGroupControl.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])]);      
      courrielControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);  
      courrielConfirmationControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);              
      courrielControl.enable(); 
      courrielConfirmationControl.enable();                       
}   
else
{
  if(notifyVia === 'messageTexte')
  {
    telephoneControl.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]+')]);
    telephoneControl.enable();           
  }
}
courrielControl.updateValueAndValidity();   
courrielConfirmationControl.updateValueAndValidity();         
}    
}
