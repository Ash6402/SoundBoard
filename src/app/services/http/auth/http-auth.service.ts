import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { CodeChallengeService } from './code-challenge.service';
import { Subject, map } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { TokenResponse } from 'src/app/models/token-response.model';

@Injectable({providedIn: 'root'})

export class HttpAuthService {

  private http = inject(HttpClient);
  private codeChallenge = inject(CodeChallengeService);
  private hashedStr: string;
  tokenArrived$ = new Subject<null>();

  login(){
      return this.codeChallenge.hashedStr().pipe(
        map(
          (digest)=>{
            this.hashedStr = digest;
            localStorage.setItem('code_verifier', this.codeChallenge.code_verifier);
            return `${environment.authUrl}?client_id=${environment.clientId}&response_type=code&redirect_uri=${environment.redirectUri}&code_challenge_method=S256&code_challenge=${this.hashedStr}&scope=user-read-private user-library-read user-read-private user-read-email user-modify-playback-state user-read-playback-state streaming app-remote-control`;
          }
        )
      )

      //The authorization POST request is reject by the spotify server but it works as as the url of
      //anchor tag thus this login function return the url observable and the get-started page subscribes
      //to and sends the request to the spotify's authorize endpoint. If this error hadn't existed then 
      //the usual post request is commented as follows :)
     
      //  this.http.post('environment.authUrl', {}, {
      //    params: new HttpParams().set('client_id', this.clientId)
      //    .set('response_type', 'code')
      //    .set('redirect_uri', 'http://localhost:4200')
      //    .set('code_challenge_method', 'S256')
      //    .set('code_challenge', this.hashedStr)
      //    .set('scope', 'user-read-private user-read-email'),
      //    headers: new HttpHeaders().set('Access-Control-Allow-Origin','*')
      //  }).subscribe()
  }

  getAccessToken(code: string){
    return this.http.post<TokenResponse>(environment.tokenUrl,
      `grant_type=authorization_code&code=${code}&redirect_uri=${environment.redirectUri}&client_id=${environment.clientId}&code_verifier=${localStorage.getItem('code_verifier')}`
      ,
    {
      headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'}),
    })
  }

  getRefreshToken(){
    this.http.post<TokenResponse>(environment.tokenUrl,
      `grant_type=refresh_token&refresh_token=${localStorage.getItem('refresh_token')}&client_id=${environment.clientId}`,
      {
        headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'}), 
      }
    )
    .subscribe(
      response => {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
      }
    )
  }

  getUser(){
    return this.http.get<User>(`${environment.apiUrl}`);
  }
}
