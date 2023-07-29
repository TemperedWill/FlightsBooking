import { Injectable } from '@angular/core';
import {LoginRm} from "../api/models/login-rm";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  currentUser?: User;

  // TODO: implement correct token authentication
  // TODO: implement Get; method for token
  private token = "";
  public getToken = () => this.token;

  loginUser(loginRm : LoginRm): boolean{
    if(loginRm.passengerRm!.email==null || loginRm.passengerRm!.email == ""){
      console.log("empty email address provided, can't login")
      return false;
    }
    if(loginRm.jwtToken==null || loginRm.jwtToken == ""){
      console.log("token is empty, can't login");
      return false;
    }
    console.log("Logging in with email: ", loginRm.passengerRm?.email, "And token: ", loginRm.jwtToken);
    this.currentUser = {email: loginRm.passengerRm?.email!}; // TODO: replcae User with more detailed info
    this.token = loginRm.jwtToken;
    return true;
  }
}

interface User{
  email: string;
}
