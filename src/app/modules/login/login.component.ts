import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '@sharedModule/service/auth.service';
import { ErrorHandlerService } from '@sharedModule/service/errorHandler.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {

  public hide = true;
  public formLogin!: FormGroup ;

  constructor(
    private formBuilder: FormBuilder,
    public readonly errorHandlerService: ErrorHandlerService,
    private auth: AuthService
  ) {  }

  ngOnInit(): void {
    this.buildFormLogin();
    this.auth.getAllUsers().pipe(
      tap( (data) => {
        console.log("Usuarios...", data);
      }),
      // catchError(() => {
      //   // console.error("error...", error);
        
      // })
    ).subscribe();
  }

  buildFormLogin(): void {
    this.formLogin = this.formBuilder.group({
      correo: new FormControl<string>('', [
        Validators.required, 
        Validators.minLength(5), 
        Validators.maxLength(120),
        Validators.email
      ]
      ),
      contrasenia: new FormControl('', [
        Validators.required,
        // Validators.pattern(StrongPasswordRegx)
      ])
    });
  }

  public loginUser({valid}:{valid:boolean}) {
    if (!valid) {
      this.formLogin.markAllAsTouched();
      return;
    }
  }
  
  // public cancelAction() {
    
  // }

}
