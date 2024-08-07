Лістинг коду: app.modul
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MyReactiveFormComponent } from './my-reactive-form/my-reactive-form.component';

@NgModule({
  declarations: [MyReactiveFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [MyReactiveFormComponent]
})
export class MyReactiveFormModule { }
Лістинг коду:  my-reactive-form.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-reactive-form',
  templateUrl: './my-reactive-form.component.html',
  styleUrls: ['./my-reactive-form.component.css']
})
export class MyReactiveFormComponent implements OnInit {
  myReactiveForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.myReactiveForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(5)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      address: this.formBuilder.group({
        street: ['', [Validators.required, Validators.minLength(5)]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        postalCode: ['', [Validators.required, Validators.minLength(5)]]
      })
    });
  }

  onSubmit() {
    if (this.myReactiveForm.valid) {
      console.log(this.myReactiveForm.value);
    } else {
      console.log('Please fill out the form correctly.');
    }
  }
}
Лістинг коду: Html
<form [formGroup]="myReactiveForm" (ngSubmit)="onSubmit()">
    <label for="firstName">First Name:</label>
    <input type="text" id="firstName" formControlName="firstName">
    <div *ngIf="myReactiveForm.get('firstName').invalid && (myReactiveForm.get('firstName').dirty || myReactiveForm.get('firstName').touched)">
      <div *ngIf="myReactiveForm.get('firstName').errors?.required">First name is required.</div>
      <div *ngIf="myReactiveForm.get('firstName').errors?.minlength">First name must be at least 5 characters long.</div>
    </div>
    <br>
  
    <label for="lastName">Last Name:</label>
    <input type="text" id="lastName" formControlName="lastName">
    <div *ngIf="myReactiveForm.get('lastName').invalid && (myReactiveForm.get('lastName').dirty || myReactiveForm.get('lastName').touched)">
      <div *ngIf="myReactiveForm.get('lastName').errors?.required">Last name is required.</div>
      <div *ngIf="myReactiveForm.get('lastName').errors?.minlength">Last name must be at least 5 characters long.</div>
    </div>
    <br>
  
    <div formGroupName="address">
      <h2>Address</h2>
      <label for="street">Street:</label>
      <input type="text" id="street" formControlName="street">
      <div *ngIf="myReactiveForm.get('address.street').invalid && (myReactiveForm.get('address.street').dirty || myReactiveForm.get('address.street').touched)">
        <div *ngIf="myReactiveForm.get('address.street').errors?.required">Street is required.</div>
        <div *ngIf="myReactiveForm.get('address.street').errors?.minlength">Street must be at least 5 characters long.</div>
      </div>
      <br>
  
      <label for="city">City:</label>
      <input type="text" id="city" formControlName="city"><br>
  
      <label for="state">State:</label>
      <input type="text" id="state" formControlName="state"><br>
  
      <label for="postalCode">Postal Code:</label>
      <input type="text" id="postalCode" formControlName="postalCode">
      <div *ngIf="myReactiveForm.get('address.postalCode').invalid && (myReactiveForm.get('address.postalCode').dirty || myReactiveForm.get('address.postalCode').touched)">
        <div *ngIf="myReactiveForm.get('address.postalCode').errors?.required">Postal code is required.</div>
        <div *ngIf="myReactiveForm.get('address.postalCode').errors?.minlength">Postal code must be at least 5 characters long.</div>
      </div>
      <br>
    </div>
  
    <label for="email">Email:</label>
    <input type="email" id="email" formControlName="email">
    <div *ngIf="myReactiveForm.get('email').invalid && (myReactiveForm.get('email').dirty || myReactiveForm.get('email').touched)">
      <div *ngIf="myReactiveForm.get('email').errors?.required">Email is required.</div>
      <div *ngIf="myReactiveForm.get('email').errors?.email">Please enter a valid email address.</div>
    </div>
    <br>
  
    <label for="password">Password:</label>
    <input type="password" id="password" formControlName="password">
    <div *ngIf="myReactiveForm.get('password').invalid && (myReactiveForm.get('password').dirty || myReactiveForm.get('password').touched)">
      <div *ngIf="myReactiveForm.get('password').errors?.required">Password is required.</div>
      <div *ngIf="myReactiveForm.get('password').errors?.minlength">Password must be at least 6 characters long.</div>
    </div>
    <br>
  
    <label for="confirmPassword">Confirm Password:</label>
    <input type="password" id="confirmPassword" formControlName="confirmPassword">
    <div *ngIf="myReactiveForm.get('confirmPassword').invalid && (myReactiveForm.get('confirmPassword').dirty || myReactiveForm.get('confirmPassword').touched)">
      <div *ngIf="myReactiveForm.get('confirmPassword').errors?.required">Confirm password is required.</div>
    </div>
    <br>
  
    <button type="submit" [disabled]="myReactiveForm.invalid">Submit</button>
  </form>

