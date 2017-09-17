import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class UserService {

  constructor(private http: Http) { }

  public register(newUser) {
    let headers = new Headers( { 'Content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.post('http://localhost:2017/register', JSON.stringify(newUser), options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

   private handleError(error: Response) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
   }
}

