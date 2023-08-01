import {Injectable} from '@angular/core';
import {LoginRm} from "../api/models/login-rm";

// Service for storing user's auth data like their userdata (username, email) or their active token
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  // TODO: implement correct token authentication
  // Variable storing User's data. (Make it private and give out data only through Get methods?)
  currentUser?: User;
  private token = "";
  public getToken = () => this.token;

  // Method to attempt setting user's token and data variables <br>
  // Returns true if successful, false in any other situation
  loginUser(loginRm: LoginRm): boolean {
    // Checks for correctness of given info
    if (loginRm.passengerRm!.email == null || loginRm.passengerRm!.email == "") {
      console.log("empty email address provided, can't login");
      return false;
    }
    if (loginRm.jwtToken == null || loginRm.jwtToken == "") {
      console.log("token is empty, can't login");
      return false;
    }
    // Login user if info is correct
    console.log("Logging in with email: ", loginRm.passengerRm?.email, "And token: ", loginRm.jwtToken);
    this.currentUser = {email: loginRm.passengerRm?.email!}; // TODO: replcae User with more detailed info?
    this.token = loginRm.jwtToken;
    return true;
  }
}

// Interface used in authService for storing user data
interface User {
  email: string;
}
