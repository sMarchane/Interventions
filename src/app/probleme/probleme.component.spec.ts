import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';
import { TypeProblemeService } from './type-probleme.service';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ ProblemeComponent ],
      providers:[TypeProblemeService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('champ prénom du problème doit comporter au moins 3 caractères', () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy();
  });
  it('#1 | Zone PRENOM invalide avec 2 caracteres', () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(2));
    let errors = zone.errors || {};
    expect(errors['minlength']).toBeFalsy();
  });
  it('#2 | Zone PRENOM valide avec 3 caracteres', () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(3));
    let errors = zone.errors || {};
    expect(errors['minlength']).toBeFalsy();
  });
  it('#3 | Zone PRENOM valide avec 200 caracteres', () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(200));
    let errors = zone.errors || {};
    expect(errors['minlength']).toBeFalsy();
  });
  it('#4 | Zone PRENOM invalide avec aucune valeur', () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(null);
    let errors = zone.errors || {};
    expect(errors['minlength']).toBeFalsy();
  });
  it('#5 | Zone PRENOM valide avec 10 espaces', () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(10));
    let errors = zone.errors || {};
    expect(errors['minlength']).toBeFalsy();
  });
  it('#6 | Zone PRENOM valide avec 2 espaces et 1 caractere', () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(3));
    let errors = zone.errors || {};
    expect(errors['minlength']).toBeFalsy();
  });
  it('#15 | Zone TELEPHONE est desactivée quand ne pas me notifier', () =>{
    component.appliquerNotification("ne pas me notifier");

    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });
  it('#16 | Zone TELEPHONE est vide quand ne pas me notifier', () =>{
    component.appliquerNotification("ne pas me notifier");

    let zone = component.problemeForm.get('telephone');
    expect(zone.value).toBeNull();
  });
  it('#17 | Zone ADRESSE COURRIEL est desactivée quand ne pas me notifier', () =>{
    component.appliquerNotification("ne pas me notifier");

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  });
  it('#18 | Zone CONFIRMER COURRIEL est desactivée quand ne pas me notifier', () =>{
    component.appliquerNotification("ne pas me notifier");

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');
  });
  it('#19 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
    component.appliquerNotification('ne pas me notifier');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED'); 
  });
  it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotification('courriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.enable).toBeTruthy(); 
  });
  it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotification('courrielConfirmation');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.enable).toBeTruthy(); 
  });
  it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotification('courriel');
    let error= {};
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('');
    error = zone.errors || {}; 
    expect(error['required']).toBeTruthy(); 
  });
  it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotification('courriel');
    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone.setValue('');
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy(); 
  });
  it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
    component.appliquerNotification('courriel');
    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone.setValue('aaaa');
    errors = zone.errors || {};
    expect(errors['pattern']).toBeTruthy(); 
  });
  it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
    component.appliquerNotification('courriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let groupe = component.problemeForm.get('courrielGroup');
    let errors = {};
    zone.setValue('');
    courrielConfirmation.setValue('aaa@asd.com');
    errors = groupe.errors || {};
    expect(errors['match']).toBeUndefined(); 
  });
  it('#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
    component.appliquerNotification('courriel');
    let courriel = component.problemeForm.get('courrielGroup.courriel');
    let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let groupe = component.problemeForm.get('courrielGroup');
    let errors = {};
    courriel.setValue('dsads@dsd.com');
    courrielConfirmation.setValue('');
    errors = groupe.errors || {};
    expect(errors['match']).toBeUndefined(); 
  });
  it("#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel", () =>{

    component.appliquerNotification("courriel");
    let courriel = component.problemeForm.get('courrielGroup.courriel');
    let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let groupe = component.problemeForm.get('courrielGroup');
    let erreurs= {};
    courriel.setValue('dsdsdaaa@dad.comdsads@dsd.com');
    courrielConfirmation.setValue('dsads@dsd.com');
    erreurs = groupe.errors || {};
    expect(erreurs['match']).toBeTruthy();
    });
    it("#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel", () =>{

      component.appliquerNotification("courriel");
      let courriel = component.problemeForm.get('courrielGroup.courriel');
      
      let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
      
      let groupe = component.problemeForm.get('courrielGroup');
      courriel.setValue('dsads@dsd.com');
      
      courrielConfirmation.setValue('dsads@dsd.com');
      let errors= {};     
      errors = groupe.errors || {};
       expect(errors['match']).toBeUndefined();
      });

      it(" #29 | Zone TELEPHONE est activée quand notifier par messagerie texte", () =>{
        component.appliquerNotification('messageTexte');
        let zone = component.problemeForm.get('telephone');
        expect(zone.enable).toBeTruthy(); 
      })
      it(" #30 | Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte", () =>{
        component.appliquerNotification("messageTexte");

        let zone = component.problemeForm.get('courrielGroup.courriel');
        expect(zone.status).toEqual('DISABLED');
    
      })
      it('#31 | Zone CONFIRMER COURRIEL est desactivée quand notifier par messagerie texte', () =>{
        component.appliquerNotification("messageTexte");
    
        let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
        expect(zone.status).toEqual('DISABLED');
      });
      it('#32 | Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte', () => {
        component.appliquerNotification('messageTexte');
        let error= {};
        let zone = component.problemeForm.get('telephone');
        zone.setValue('');
        error = zone.errors || {}; 
        expect(error['required']).toBeTruthy(); 
      });
      it("#33 | Zones TELEPHONE est invalides avec des caractères non-numériques quand notifier par messagerie texte", () =>{

        component.appliquerNotification("messageTexte");
        let error= {};
        let zone = component.problemeForm.get('telephone');
        zone.setValue('wsdrfv');
        error = zone.errors || {}; 
        expect(error['pattern']).toBeTruthy(); 

        });
        it("#34 | Zones TELEPHONE est invalides avec 9 chiffres consécutifs quand me notifier par messagerie texte", () =>{

          component.appliquerNotification("messageTexte");
          let error= {};
          let zone = component.problemeForm.get('telephone');
          zone.setValue('123456789');
          error = zone.errors || {}; 
          expect(error['minlength']).toBeTruthy(); 
  
          });
          it("#35 | Zones TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par message texte", () =>{

            component.appliquerNotification("messageTexte");
            let error= {};
            let zone = component.problemeForm.get('telephone');
            zone.setValue('12345678912');
            error = zone.errors || {}; 
            expect(error['maxlength']).toBeTruthy(); 
    
            });
            it("#36 | Zones TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par message texte", () =>{

              component.appliquerNotification("messageTexte");
              let error= {};
              let zone = component.problemeForm.get('telephone');
              zone.setValue('1234567891');
              error = zone.errors || {}; 
              expect(zone.valid).toBeTruthy();
      
              });
          
});
