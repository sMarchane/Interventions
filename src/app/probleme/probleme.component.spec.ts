import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ProblemeComponent ]
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
    expect(errors['minlength']).toBeTruthy();
  });
  it('#2 | Zone PRENOM valide avec 3 caracteres', () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(3));
    let errors = zone.errors || {};
    expect(errors['minlength']).toBeTruthy();
  });
  it('#3 | Zone PRENOM valide avec 200 caracteres', () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(200));
    let errors = zone.errors || {};
    expect(errors['minlength']).toBeTruthy();
  });
  it('#4 | Zone PRENOM invalide avec aucune valeur', () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(null);
    let errors = zone.errors || {};
    expect(errors['minlength']).toBeTruthy();
  });
  it('#5 | Zone PRENOM valide avec 10 espaces', () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(10));
    let errors = zone.errors || {};
    expect(errors['minlength']).toBeTruthy();
  });
  it('#6 | Zone PRENOM valide avec 2 espaces et 1 caractere', () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(3));
    let errors = zone.errors || {};
    expect(errors['minlength']).toBeTruthy();
  });

});
