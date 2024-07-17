import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private _loaderSignal = signal<boolean>(false);

  fetching(): void{
    this._loaderSignal.set(true)
  }

  complete(): void{
    this._loaderSignal.set(false)
  }

  get loading(): Signal<boolean>{
    return this._loaderSignal.asReadonly()
  }

}
