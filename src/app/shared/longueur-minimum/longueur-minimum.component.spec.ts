import { AbstractControl } from "@angular/forms";
import { VerifierCaracteresValidator } from "./longueur-minimum.component";

describe('longueur zone Validator', () => {
    it(' #7 | une chaine avec 10 espaces est invalide', () => {
        let validator = VerifierCaracteresValidator.longueurMinimum(2)
        let control = {value: '          '}
        let result = validator(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
    });

    it(' #8 | une phrase avec des mots est valide', () => {
        let validator = VerifierCaracteresValidator.longueurMinimum(2)
        let control = {value: 'Vive angular'}
        let result = validator(control as AbstractControl);
        expect(result==null).toBe(true);
    });

    it(' #9 | une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide', () => {
        let validator = VerifierCaracteresValidator.longueurMinimum(2)
        let control = {value: '   je le veux   '}
        let result = validator(control as AbstractControl);
        expect(result==null).toBe(true);
    });
    it(' #10 | Une phrase avec 1 espace et 2 caracteres est invalide', () => {
        let validator = VerifierCaracteresValidator.longueurMinimum(2)
        let control = {value: ' xx'}
        let result = validator(control as AbstractControl);
        expect(result==null).toBe(true);
    });
    it(' #11 | une phrase avec 2 espaces et 1 caractere est invalide', () => {
        let validator = VerifierCaracteresValidator.longueurMinimum(2)
        let control = {value: '  x'}
        let result = validator(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
    });
    it(' #12 | Une phrase avec 3 espaces et 3 caracteres est valide', () => {
        let validator = VerifierCaracteresValidator.longueurMinimum(2)
        let control = {value: '   xxx'}
        let result = validator(control as AbstractControl);
        expect(result==null).toBe(true);
    });
    it(' #13 | Une phrase avec 5 espaces, 5 caracteres et 5 espaces est valide', () => {
        let validator = VerifierCaracteresValidator.longueurMinimum(2)
        let control = {value: '     xxxxx     '}
        let result = validator(control as AbstractControl);
        expect(result==null).toBe(true);
    });
    it(' #14 | Une chaine nulle est invalide', () => {
        let validator = VerifierCaracteresValidator.longueurMinimum(2)
        let control = {}
        let result = validator(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
    });

});