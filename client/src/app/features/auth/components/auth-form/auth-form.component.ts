import { Component, signal } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";

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
    private authService: AuthService,
    private buildForm: FormBuilder){}

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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      ...(!this.isLoginMode() ? {}: { passwordConfirm: ['', [Validators.required, Validators.minLength(3)] ]})
    },
    { validators: this.isLoginMode() ? null : this.passwordMatchValidator }
  )
  }

  onSubmit(){
    if(this.authFormField.invalid){
      return;
    }
    if (this.isLoginMode()) {
      this.authService.login(this.authFormField.value).subscribe();
    } else {
      this.authService.signup(this.authFormField.value).subscribe();
    }
  }

  switchAuthMod(){
    this.isLoginMode.update((currentValue) => !currentValue);
  }
}
