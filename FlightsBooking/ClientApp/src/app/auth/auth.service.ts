import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  currentUser?: User;

  loginUser(user: User): boolean{
    if(user.email==null || user.email == ""){
      console.log("empty email address provided, can't login")
      return false;
    }
    console.log("Logging in with email: ", user.email);
    this.currentUser = user;
    return true;
  }
}

interface User{
  email: string;
}
