import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../model/menu';
import { Produits } from '../model/produits';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private productUrl = "http://localhost:8000/api/produits"
  constructor(private http : HttpClient) { }

  getProduct(id:number):Observable<Menu>{
    return this.http.get<Menu>(this.productUrl+"/"+id);
  }
}
