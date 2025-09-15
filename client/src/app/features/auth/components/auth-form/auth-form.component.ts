import { Component, signal } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";

@Component({
  selector: "app-auth-form",
  templateUrl: "./auth-form.component.html",
  styleUrls: ["./auth-form.component.scss"],
  standalone: false,
})

export class AuthFormComponent {
  authFormField!: FormGroup;
  isLoginMode = signal<boolean>(true);
  constructor(private buildForm: FormBuilder){}

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

  buildAuthForm(isLogin: boolean = true){
    this.authFormField = this.buildForm.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.minLength(6)],
      ...(isLogin ? {}: { passwordConfirm: ['', Validators.required, Validators.minLength(6) ]})
    },
    { Validators: isLogin ? null : this.passwordMatchValidator }
  )
  }

  onSubmit(){
    if(this.authFormField.valid){
      console.log(this.authFormField.value);
    } else {
      console.log("Form is not valid");
    }
  }

  switchAuthMod(){
    this.isLoginMode.update((currentValue) => !currentValue);
  }
}
