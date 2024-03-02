import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ISafeAny } from '@sharedModule/models/ISafeAny';
import { AuthService } from '@sharedModule/service/auth.service';
import { ErrorHandlerService } from '@sharedModule/service/errorHandler.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  public hidePassword = true;
  public hideConfirmPassword = true;
  public formRegister!: FormGroup ;

  constructor(
    private formBuilder: FormBuilder,
    public readonly errorHandlerService: ErrorHandlerService,
    private auth: AuthService
  ) {  }

  ngOnInit(): void {
    this.buildFormRegister();
  }

  private buildFormRegister() {
    this.formRegister = this.formBuilder.group({
      emailUser: new FormControl<string>('', [
        Validators.required, 
        Validators.minLength(5), 
        Validators.maxLength(120),
        Validators.email
      ]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        this.matchPasswordValidator()
      ]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]),
      namesUser: new FormControl<string>('', [Validators.required]),
      lastNamesUser: new FormControl<string>('', [Validators.required]),
    });
  }

  // Función de validación personalizada para verificar si las contraseñas coinciden
  private matchPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: ISafeAny } | null => {
      const password = this.formRegister?.get('password')?.value;
      const confirmPassword = control.value;

      return password === confirmPassword ? null : { notSame: true };
    };
  }


  // Método para facilitar el acceso a los controles del formulario
  get f() { return this.formRegister.controls; }

  public registerUser({valid}:{valid:boolean}) {
    if (!valid) {
      this.formRegister.markAllAsTouched();
      return;
    }
  }

}
