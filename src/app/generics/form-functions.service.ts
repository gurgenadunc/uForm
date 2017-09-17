import { Injectable } from '@angular/core';
import {
    FormControl,
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms'

@Injectable()
export class FormFunctions {

    private currentPath: string;

    constructor(private formBuilder: FormBuilder) {}

    private findControls(form, cb) {
        if (form instanceof FormControl) {
            cb(form);
        }
        else {
            for (let control in form.controls) {
                let currentControl = form.get(control);
                if (currentControl instanceof FormControl) {
                    cb(currentControl);
                }
                else {
                    this.findControls(currentControl, cb);
                }
            }
        }
    }
    
    private getPath(formControl, path: string = ''): string {
        this.currentPath = path;
        for (let control in formControl.parent.controls) {
            if (formControl === formControl.parent.get(control)) {
                if (this.currentPath) {
                    this.currentPath = control + '_' + path;
                }
                else {
                    this.currentPath = control; 
                }
            }
        }
        if ((formControl.parent.parent)) {
            this.getPath(formControl.parent, this.currentPath);
        }
        return this.currentPath;
    }

    public updateValueAndValidity(form): void {
        this.findControls(form, (control: FormControl) => {
            control.updateValueAndValidity();
        })
    }

    public getErrors(form, onlyKeys: boolean = true): Object {
        let errorsObject: Object = {}; 
        this.findControls(form, (control: FormControl) => {
            if (control.errors) {
                errorsObject[this.getPath(control)] = control.errors;
            }
        });
        return errorsObject;
    }
    
    public obj: Object = {
        main: {
            default: 'hell',
            validators: [Validators.required],
        },
        secondary: [
            { another: {default: 'antoher', validators: []} },
            { second: {default: 'second', validators: []} }
        ]
    }

    private form: FormGroup = this.formBuilder.group({});
    
    public buildForm(obj: Object = this.obj, form: FormGroup = this.form) {
        for (let key of Object.keys(obj)) {
            if (obj[key] instanceof Array) {
                let newForm = this.formBuilder.group({});
                for (let object of obj[key]) {
                    this.buildForm(object, newForm);
                }
                form.addControl(key, newForm);
            }
            else {
                let defualtValue: string = '';
                let validators: Array<any> = [];
                if (obj[key]['validators']) {
                    validators = obj[key]['validators'];
                }
                if (obj[key]['default']) {
                    defualtValue = obj[key]['default']; 
                }
                let formControl = new FormControl(defualtValue, validators);
                form.addControl(key, formControl);
            }
        }
        return form;
    }
}
