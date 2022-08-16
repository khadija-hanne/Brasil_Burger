import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Commande } from '../model/commande';
import { Menu } from '../model/menu';
import { Zone } from '../model/zone';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private zoneUrl = "http://localhost:8000/api/"
  constructor(private http : HttpClient) { }

  commander(){
    console.log("ok");
    
  }

  getZones():Observable<Zone[]>{
    return this.http.get<Zone[]>(this.zoneUrl+"zones");
  }
}
