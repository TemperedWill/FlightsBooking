import {Component, OnInit} from '@angular/core';
import {PassengerService} from "../api/services/passenger.service";
import {FormBuilder, FormControl, NonNullableFormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../auth/auth.service";
import {Router, ActivatedRoute} from "@angular/router";
import {BookFlightComponent} from "../book-flight/book-flight.component";
import {LoginRm} from "../api/models/login-rm";

@Component({
  selector: 'app-register-passenger',
  templateUrl: './register-passenger.component.html',
  styleUrls: ['./register-passenger.component.css']
})
export class RegisterPassengerComponent implements OnInit {

  constructor(private passengerService: PassengerService,
              private fb: FormBuilder, private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  form = this.fb.group({
    email: new FormControl("", {
      nonNullable: true, validators: [Validators.required,
        Validators.email,
        Validators.min(3),
        Validators.max(100)]
    }),
    firstName: new FormControl("", {
      nonNullable: true, validators: [Validators.required,
        Validators.minLength(2),
        Validators.maxLength(35)]
    }),
    lastName: new FormControl("", {
      nonNullable: true, validators: [Validators.required,
        Validators.minLength(2),
        Validators.maxLength(35)]
    }),
    isFemale: new FormControl(true, {nonNullable: true, validators: [Validators.required]})
  })

  loginAlerts: boolean = false; //turn on alerts //TODO: alert fires twice in a row, let's turn it off for now
  requestedUrl?: string = undefined;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({next: p => this.requestedUrl = p['requestedUrl']});
    //this.login()
  }

  // checkPassenger(): void { //TODO: Надо бы разобраться во внутренней кухне тута
  //   if (this.form.invalid) return;
  //   const params = {email: this.form.get('email')!.value} // TODO: set pass here
  //
  //   this.passengerService.FindPassenger(params.email).subscribe({
  //     next: this.login, error: e => {
  //       if (e.status != 404) console.error(e);
  //     }
  //   });
  // }


  register() { // Метод для регистрации пользователя  // TODO: Нужно будет полностью переделать регистрацию, вынести ее отдельно от логина, добавить пароль на форму.
    if (this.form.invalid) return; // TODO: Натянуть Identity на систему
    console.log("Form Values: ", this.form.value);
    this.passengerService.RegisterPassenger(this.form.value)
      .subscribe({
        next: this.login,
        error: console.error
      });
  }

  private alertLogin = () => {
  }

  login = () => {
    if (this.form.invalid) return;
    this.passengerService.LoginPassenger(this.form.value?.email!).subscribe({next: loginRm => this.asyncLogin(loginRm)})
  }

  asyncLogin = (loginRm :LoginRm) => {
    let loginStatus = this.authService.loginUser(loginRm);
    if (this.loginAlerts && loginStatus) alert("Login is successful rerouting to the main page");
    this.router.navigate([this.requestedUrl ?? '/search-flights']);
  }


}
