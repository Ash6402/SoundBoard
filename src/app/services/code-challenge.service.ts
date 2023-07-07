import { Injectable } from '@angular/core';
import { from, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CodeChallengeService {

  private randomStr: string;

  generateRandomString(length: number) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  hashedStr(){
    //if this function is accidently called multiple times in one instance. This is to prevent two different code
    if(!this.randomStr)
      this.randomStr = this.generateRandomString(43);
    const encoder = new TextEncoder();
    const data = encoder.encode(this.randomStr);
    const digest$ = from(window.crypto.subtle.digest('SHA-256', data));
    return digest$.pipe(
      map(
        (digest)=> this.base64encode(digest)
      )
    );
  }

  get code_verifier(){
    return this.randomStr;
  }

  base64encode(string: ArrayBuffer) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
}
