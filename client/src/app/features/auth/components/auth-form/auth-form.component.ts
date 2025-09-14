import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-auth-form",
  templateUrl: "./auth-form.component.html",
  styleUrls: ["./auth-form.component.scss"],
  standalone: false,
})

export class AuthFormComponent {
  authFormField!: FormGroup;

  constructor(private buildForm: FormBuilder){}



  ngOnInit(){
    this.buildAuthForm();
  }

  buildAuthForm(){
    this.authFormField = this.buildForm.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.minLength(6)],
      passwordConfirm: ['', Validators.required, Validators.minLength(6)],
    })
  }

  onSubmit(){
    if(this.authFormField.valid){
      console.log(this.authFormField.value);
    } else {
      console.log("Form is not valid");
    }
  }
}
