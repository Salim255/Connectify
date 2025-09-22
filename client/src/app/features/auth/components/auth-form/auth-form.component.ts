import { Component, signal } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { SocketCoreService } from "src/app/socket/services/socket-presence.service";

@Component({
  selector: "app-auth-form",
  templateUrl: "./auth-form.component.html",
  styleUrls: ["./auth-form.component.scss"],
  standalone: false,
})

export class AuthFormComponent {
  authFormField!: FormGroup;
  isLoginMode = signal<boolean>(true);

  constructor(
    private socketCoreService:  SocketCoreService,
    private router: Router,
    private authService: AuthService,
    private buildForm: FormBuilder,
  ){}

  ngOnInit(){
    this.buildAuthForm();
  }

  private passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('passwordConfirm')?.value;
    return password && confirm && password !== confirm
      ? { passwordMismatch: true }
      : null;
  }

  buildAuthForm(){

    this.authFormField = this.buildForm.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(3)]],
      passwordConfirm: [null], // always present
    },
    { validators: this.isLoginMode() ? null : this.passwordMatchValidator },
    );
  }

  onSubmit(){
    console.log(this.authFormField.value, this.isLoginMode(), this.authFormField.valid);
    if(this.authFormField.invalid){
      return;
    }
    if (this.isLoginMode()) {

      this.authService.login(this.authFormField.value).subscribe({
        next: (response) => {

          this.socketCoreService.initialize();
          this.router.navigate(['/browse']);
        },
        error: () => {}
      });
    } else {
      this.authService.signup(this.authFormField.value).subscribe({
        next: (response) => {
          console.log(response)
          //this.socketCoreService.initialize();
          this.router.navigate(['/browse']);
        },
        error: (err) => {
          console.log(err)
        }
      });
    }
  }

  switchAuthMod(){
    this.isLoginMode.update((currentValue) => !currentValue);
  }
}
