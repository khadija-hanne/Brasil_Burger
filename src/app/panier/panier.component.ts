import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { map, take } from 'rxjs';
import { Menu } from '../model/menu';
import { Zone } from '../model/zone';
import { Produits } from '../model/produits';
import { CatalogueDetailComponent } from '../produits/catalogue/catalogue-detail/catalogue-detail.component';
import { PanierService } from '../services/panier.service';
import { CommandeService } from 'src/app/services/commande.service';
import { Commande } from 'src/app/model/commande';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  tab:Produits[] | Menu[] = [];
  zones:Zone[] = [];
  disabled = false;
  tabCommandes : {quantite : number,produit : {id:number}}[] = [];

  
  constructor(private servicePanier : PanierService, private sanitizer:DomSanitizer,private serviceCommande:CommandeService) { }
  items$ = this.servicePanier.items$
  ngOnInit(): void {
    this.items$.subscribe(
      resultat => {
        this.tab = resultat;
      }
    );
    
    this.serviceCommande.getZones().subscribe(resultat =>
        {
          console.log(resultat);
          this.zones = resultat;
          
        }
      )

    
  }

  productFormat(){
    this.items$.subscribe(
      resultat => {
        resultat.forEach(element => {
            this.tabCommandes.push(
              {
                "quantite" : element.quantite,
                "produit" : {
                  "id" : element.id
                }
              }
            )
            
        });
        
      }

    );

  }
  commander(){
    
  }

  transform(img:string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(img);
}

deleteCart(product : Menu | Produits){
  this.servicePanier.deleteToCart(product);
  console.log(product);
  
}

totalPrice():number{
  let prix = 0;
  this.tab.forEach(element => {
    
    prix += element.prix*element.quantite;
  });
  return prix;
}

totalPriceProduct(product:Menu | Produits):number{
  return product.prix * product.quantite;
}

quantite(product:any, operateur:string){
  this.servicePanier.add(product,operateur);
}
 
/* choisirZone(){
  this.disabled = true;
} */
}
