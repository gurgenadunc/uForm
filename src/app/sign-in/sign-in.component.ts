import { Component, OnInit } from '@angular/core';
import {
    FormGroup, 
    FormControl,
    Validators 
} from '@angular/forms';

import { FormFunctions } from './../generics/form-functions.service';
import { UserService } from "app/user/user.service";
import { AuthService } from "app/user/auth.service";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
    public signInForm: FormGroup;
    public signUpForm: FormGroup;
    private emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    public signInFormErrors: Object;
    public signUpFormErrors: Object;
    
    private signInFormObject: Object = {
        email: {},
        password: {}
    };
    
    private signUpFormObject: Object = {
        fullName: {},
        email: {},
        password: {},
        retypePassword: {}
    };

    constructor(
        private formFunctions: FormFunctions,
        private userService:UserService,
        private authService: AuthService
    ) {
        this.buildForms();
    }

    ngOnInit() {
    }
    
    private buildForms(): void {
        this.signInForm = this.formFunctions.buildForm(this.signInFormObject);
        this.signUpForm = this.formFunctions.buildForm(this.signUpFormObject);
    }

    public signin() {
        this.signInForm.get('email')
            .setValidators([Validators.required, Validators.pattern(this.emailRegex)]);
        this.signInForm.get('password')
            .setValidators([Validators.required]);
        this.formFunctions.updateValueAndValidity(this.signInForm);
        this.signInFormErrors = this.formFunctions.getErrors(this.signInForm);
        if (this.signInForm.valid) {
            console.log('Valid');
            this.authService.login(this.signInForm.value)
                .subscribe((data) => {
                    if (data.json().success === false) {
                        console.log(data.json().message);
                    }
                    else {
                        console.log(data.json().message);
                    }
                })
        }
        else {
            console.log(this.signInForm.valid);
        }
        console.log(this.signInForm.controls);
    }

    public signup() {
        this.signUpForm.get('email')
            .setValidators([Validators.required, Validators.pattern(this.emailRegex)]);
        this.signUpForm.get('password')
            .setValidators([Validators.required]);
        let passwordPattern = this.signUpForm.get('password').value;
        this.signUpForm.get('retypePassword')
            .setValidators([Validators.required, Validators.pattern(passwordPattern)]);
        this.formFunctions.updateValueAndValidity(this.signUpForm);
        this.signUpFormErrors = this.formFunctions.getErrors(this.signUpForm);
        if (this.signUpForm.valid) {
            console.log(this.signUpForm.value);
            this.userService.register(this.signUpForm.value)
                .subscribe((data) => {
                    if(data.success === false) {
                        alert(data.message);
                    }
                    else {
                        alert(data.message);
                    }
                })                
        }
        else {
            console.log('doNothing');
        }
    }

}
