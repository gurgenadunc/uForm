import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { User } from './user';

@Injectable()
export class AuthService {
  public currentUser: User;

  constructor(private http: Http) { }

  public login (userDetails) {
      let headers = new Headers({ 'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers});

      return this.http.post('http://localhost:2017/api/login', JSON.stringify(userDetails), options)
        .do((response: Response) => {
            if (response.json().success) {
              this.currentUser = <User>response.json().message;
              let userObj: any  = {};
              userObj.user = response.json().message;
              userObj.token = response.json().token;

              localStorage.setItem('currentUser', JSON.stringify(userObj));
            }
        response.json();
        })
      .catch(this.handleError);
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  public  isLoggedIn(): boolean {
    try {
        const theUser: any = JSON.parse(localStorage.getItem('currentUser'));
        if (theUser) {
            this.currentUser = theUser.user;
        }
    } catch (e) {
        return false;
    }
    
    return !!this.currentUser;
}

  private handleError(error: Response) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
    }

}
