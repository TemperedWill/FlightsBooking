import { Component, OnInit } from '@angular/core';
import {PassengerService} from "../api/services/passenger.service";
import {FormBuilder, FormControl} from "@angular/forms";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-register-passenger',
  templateUrl: './register-passenger.component.html',
  styleUrls: ['./register-passenger.component.css']
})
export class RegisterPassengerComponent implements OnInit {

  constructor(private passengerService: PassengerService,
              private fb: FormBuilder, private authService: AuthService) { }

  form = this.fb.group({
    email: new FormControl("", {nonNullable: true}),
    firstName: new FormControl("", {nonNullable: true}),
    lastName: new FormControl("", {nonNullable: true}),
    isFemale: new FormControl(true, {nonNullable: true}),
  })
  ngOnInit(): void {
  }

  register(){
    console.log("Form Values: ", this.form.value);
    this.passengerService.RegisterPassenger(this.form.value).subscribe(_ => this.authService.loginUser( {email: this.form.get('email')!.value}));
  }

}
