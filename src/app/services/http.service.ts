import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { CodeChallengeService } from './code-challenge.service';
import { interval, map } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { TokenResponse } from '../models/token-response.model';

@Injectable({providedIn: 'root'})

export class HttpService {

  private http = inject(HttpClient);
  private codeChallenge = inject(CodeChallengeService);
  private userService = inject(UserService);
  private hashedStr: string;
  // url: string;

  login(){
      return this.codeChallenge.hashedStr().pipe(
        map(
          (digest)=>{
            this.hashedStr = digest;
            localStorage.setItem('code_verifier', this.codeChallenge.code_verifier);
            return `${environment.authUrl}?client_id=${environment.clientId}&response_type=code&redirect_uri=${environment.redirectUri}&code_challenge_method=S256&code_challenge=${this.hashedStr}&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-state streaming app-remote-control`;
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
    this.http.post<TokenResponse>(environment.tokenUrl,
      `grant_type=authorization_code&code=${code}&redirect_uri=${environment.redirectUri}&client_id=${environment.clientId}&code_verifier=${localStorage.getItem('code_verifier')}`
      ,
    {
      headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'}),
    }).subscribe({
      next:(response)=>{
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
      },
      error: (err) => console.log(err)
    })
  }

  getRefreshToken(){
    this.http.post<TokenResponse>(environment.tokenUrl,
      `grant_type=refresh_token&refresh_token=${localStorage.getItem('refresh_token')}&client_id=${environment.clientId}`,
      {
        headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'}), 
      }
    ).subscribe(
      response => {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
      }
    )
  }

  getUser(){
    this.http.get<User>(`${environment.apiUrl}`, {
      // headers: new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('access_token')}`})
    }).subscribe({
      next: user => {
        console.log(user);
        this.userService.user = user;
      },
      error: (error)=>{
        console.log(error);
      }
    })
  }

  getDevices(){
    this.http.get(`${environment.apiUrl}/player/devices`).subscribe(
      (response)=>{
        console.log(response);
      }
    )
  }

  transferPlayback(deviceId: string){
    this.http.put(`${environment.apiUrl}/player`, {
      device_ids: [deviceId],
      play: true,
    } ).subscribe({
        next: (response)=>{
          console.log('Transfered Succesfully', response);
        },
        error: (err)=> console.log(err),
  })
  }
}
