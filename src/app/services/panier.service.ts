import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Produits } from '../model/produits';
import { take, map } from 'rxjs/operators';
import { Menu } from '../model/menu';
import { HttpClient } from '@angular/common/http';
import { CommandeService } from './commande.service';
import { Commande } from '../model/commande';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  private itemsSubject = new BehaviorSubject<Produits[] | Menu[] >([]);
  commandeUrl = "http://localhost:8000/api/commandes";


  items$ = this.itemsSubject.asObservable();
  constructor(private http:HttpClient) {
    let existingCartItems = JSON.parse(localStorage.getItem('products') || '[]');
    if (!existingCartItems) {
      existingCartItems = [];
    }
    this.itemsSubject.next(existingCartItems);
  }

  addToCart(product: Menu | Produits){
    let trouve=false;
        let index = 0;
    this.items$.pipe(
      take(1),
      map((products:Produits[]) => {
        
        products.forEach((prod, i) => {
          if (prod.id === product.id) {
              trouve = true;
              index =i;
          }
         })
          if (trouve) {

              product.quantite++;
              // console.log(product.typeProduit);
              
              products[index] = product;
          }else{
  
            product.quantite = 1
            products.push(product)
  
          }
          
        // console.log(products);
        
        this.itemsSubject.next(products);
        localStorage.setItem('products', JSON.stringify(products));
      }),
    ).subscribe();
}

  deleteToCart(product: Produits){
    this.items$.pipe(
      take(1),
      map((products:Produits[]) => {
        products.splice(products.indexOf(product),1);
        this.itemsSubject.next(products);
        localStorage.setItem('products', JSON.stringify(products));
      }),
    ).subscribe();
}

add(product:Menu | Produits,operateur:string){
  this.items$.pipe(
    take(1),
    map((products:Produits[]) => {
      console.log(product.quantite);
      if (operateur === "+") {
        product.quantite++;
        
      }else{
        if (product.quantite === 0) {
          // console.log("ok");
        }else{
          product.quantite--;
          // console.log(product);
        }
      }
          }),
  ).subscribe();
 }
 commande(commande:Commande):Observable<Commande>{
      return this.http.post<Commande>(this.commandeUrl,commande);
 }
}
 

      