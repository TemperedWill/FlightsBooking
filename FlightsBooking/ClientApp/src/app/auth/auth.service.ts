import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  currentUser?: User;

  loginUser(user: User){
    if(user.email==null){
      console.log("empty email address provided, can't login")
      return;
    }
    console.log("Logging in with email: ", user.email);
    this.currentUser = user;
  }
}

interface User{
  email: string;
}
