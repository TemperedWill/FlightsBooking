import { Component, OnInit } from '@angular/core';
import {PassengerService} from "../api/services/passenger.service";
import {FormBuilder, FormControl, NonNullableFormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../auth/auth.service";
import {Router, ActivatedRoute} from "@angular/router";
import {BookFlightComponent} from "../book-flight/book-flight.component";

@Component({
  selector: 'app-register-passenger',
  templateUrl: './register-passenger.component.html',
  styleUrls: ['./register-passenger.component.css']
})
export class RegisterPassengerComponent implements OnInit {

  constructor(private passengerService: PassengerService,
              private fb: FormBuilder, private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  requestedUrl?: string = undefined;

  form = this.fb.group({
    email: new FormControl("", {nonNullable:true, validators: [Validators.required,
                                                                          Validators.email,
                                                                          Validators.min(3),
                                                                          Validators.max(100)]}),
    firstName: new FormControl("", {nonNullable: true, validators: [Validators.required,
                                                                              Validators.minLength(2),
                                                                              Validators.maxLength(35)]}),
    lastName: new FormControl("", {nonNullable: true, validators: [Validators.required,
                                                                              Validators.minLength(2),
                                                                              Validators.maxLength(35)]}),
    isFemale: new FormControl(true, {nonNullable: true, validators: [Validators.required]})
  })

  loginAlerts: boolean = false; //turn on alerts //TODO: alert fires twice in a row, let's turn it off for now
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({next: p=> this.requestedUrl = p['requestedUrl']});
    //this.login()
  }

  checkPassenger(): void{
    if (this.form.invalid) return;
    const params = {email: this.form.get('email')!.value}

    this.passengerService.FindPassenger(params.email).subscribe({next: this.login, error: e=> {if(e.status!=404 ) console.error(e);}});
  }


  register(){
    if (this.form.invalid) return;
    console.log("Form Values: ", this.form.value);
    this.passengerService.RegisterPassenger(this.form.value)
      .subscribe({next: this.login,
       error: console.error });
  }

  private alertLogin = () => {
  }

  private login = () => {
    if(this.form.invalid) return;
    let loginStatus = this.authService.loginUser({email: this.form.get('email')!.value});
    if (this.loginAlerts && loginStatus) alert("Login is successful rerouting to the main page");
    this.router.navigate([this.requestedUrl ?? '/search-flights' ]);
  }


}
