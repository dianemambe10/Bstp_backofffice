import { HttpClient, HttpHeaders } from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalComponent } from 'src/app/global-component';
import {Region} from "../models/region.model";
import {Prefecture} from "../models/prefecture.model";
import {Commune} from "../models/commune.model";



@Injectable({
  providedIn: 'root'
})
export class HelpsService {

  constructor(private http: HttpClient) { }



  /**
   * region list
   *
   */

  getRegion(): Observable<Region[]> {

    return this.http.get<Region[]>(GlobalComponent.API_URL + GlobalComponent.region, {  responseType: 'json'  });
  }

  /**
   * prefecture list
   *
   */

  getPrefecture(): Observable<Prefecture[]> {

    return this.http.get<Prefecture[]>(GlobalComponent.API_URL + GlobalComponent.prefecture, {  responseType: 'json'  });
  }

  /**
   * prefecture list
   *
   */

  getCommmune(): Observable<Commune[]> {

    return this.http.get<Commune[]>(GlobalComponent.API_URL + GlobalComponent.commune, {  responseType: 'json'  });
  }


  getLocalite(): Observable<any[]>{
    let region = this.http.get<Region[]>(GlobalComponent.API_URL + GlobalComponent.region, {  responseType: 'json'  });
    let prefecture = this.http.get<Prefecture[]>(GlobalComponent.API_URL + GlobalComponent.prefecture, {  responseType: 'json'  });
    let commune = this.http.get<Commune[]>(GlobalComponent.API_URL + GlobalComponent.commune, {  responseType: 'json'  });

    return forkJoin([commune,region, prefecture])
  }



}

