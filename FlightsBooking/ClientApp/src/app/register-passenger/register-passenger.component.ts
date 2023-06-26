import { Component, OnInit } from '@angular/core';
import {PassengerService} from "../api/services/passenger.service";
import {FormBuilder, FormControl} from "@angular/forms";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {BookFlightComponent} from "../book-flight/book-flight.component";

@Component({
  selector: 'app-register-passenger',
  templateUrl: './register-passenger.component.html',
  styleUrls: ['./register-passenger.component.css']
})
export class RegisterPassengerComponent implements OnInit {

  constructor(private passengerService: PassengerService,
              private fb: FormBuilder, private authService: AuthService,
              private router: Router) { }

  form = this.fb.group({
    email: new FormControl("", {nonNullable: true}),
    firstName: new FormControl("", {nonNullable: true}),
    lastName: new FormControl("", {nonNullable: true}),
    isFemale: new FormControl(true, {nonNullable: true}),
  })

  loginAlerts: boolean = false; //turn on alerts //TODO: alert fires twice in a row, let's turn it off for now
  ngOnInit(): void {
    //this.login()
  }

  checkPassenger(): void{
    const params = {email: this.form.get('email')!.value}

    this.passengerService.FindPassenger(params.email).subscribe(this.login, e=> {if(e.status!=404) console.error(e);});
  }


  register(){
    console.log("Form Values: ", this.form.value);
    this.passengerService.RegisterPassenger(this.form.value)
      .subscribe(this.login,
        console.error);
  }

  private alertLogin = () => {

  }

  private login = () => {
    let loginStatus = this.authService.loginUser({email: this.form.get('email')!.value});
    if (this.loginAlerts && loginStatus) alert("Login is successful rerouting to the main page");
    this.router.navigate(['/search-flights']);
  }


}
