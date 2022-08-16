import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Catalogue } from '../model/catalogue';
import { Produits } from '../model/produits';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  private catalogueUrl = "http://localhost:8000/api/catalogues"
  
  constructor(private http : HttpClient) { }


  getCatalogue() : Observable<Catalogue>{
    return this.http.get<Catalogue>(this.catalogueUrl);
  }


}
