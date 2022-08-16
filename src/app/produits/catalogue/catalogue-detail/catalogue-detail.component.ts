import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Menu } from 'src/app/model/menu';
import { Produits } from 'src/app/model/produits';
import { PanierService } from 'src/app/services/panier.service';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-catalogue-detail',
  templateUrl: './catalogue-detail.component.html',
  styleUrls: ['./catalogue-detail.component.css']
})
export class CatalogueDetailComponent implements OnInit {
  product!: Menu;
  tab:any[]=[];
  disabled=false;

  constructor(private route:ActivatedRoute, private serviceProduit:ProduitService,private sanitizer : DomSanitizer, private servicePanier:PanierService) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.params['id'];
    this.serviceProduit.getProduct(productId).subscribe(resultat => 
      {
        this.product = resultat;
        this.product.Boissons.forEach(element => {
          element.tailleBoisson.qte = 0;
        });
        // console.log(resultat);
        
        
      }
    );
    
    
  }

  transform(img:string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(img);
  }

  quantite(boisson:any,input:any,quantite:number){
    boisson.qte= +input.value
    
    console.log("qty",boisson.qte);
    
    // boisson.qty=0
        let trouve=false;
        let index = 0;
        let somme = 0;
    this.tab.forEach((element,i) => {
      somme += element.qte;
      if (element.id === boisson.id) {
        trouve =true;
        index=i;
      }
    });

    // console.log(trouve);
    
    if (trouve) {
      // console.log(somme, quantite);   
      if (quantite > somme) {

        boisson.qte = +input.value;
        // console.log(boisson , input.value);
        this.tab[index] = boisson;
      }else{
        this.disabled=true;
        this.tab[index] = boisson;
       }
      if (+input.value === 0) {
        this.tab.splice(index,1);
      }
    }else{
      if (quantite > somme) {
        
        boisson.qte = 1;
        this.tab.push(boisson);
      }
    }
    if (quantite === somme) {
      console.log("ok");
      
      this.disabled=true;
      // console.log(quantite == somme);
      // this.tab[index] = boisson;
    }else{
      this.disabled=false;

    }
    /* console.log(somme,quantite);   
    console.log(this.tab); */

  }

  addCart(product : Menu | Produits){
    this.servicePanier.addToCart(product);
    // console.log(product);
    
  }

  /* augmenter(boisson:any,quantite:number){
      boisson.qte=1;
      let trouve=false;
        let index = 0;
        let somme = 1;
        // console.log(this.tab);
        console.log(boisson);
        
    this.tab.forEach((element,i) => {
      somme += element.qte;
      if (element.id === boisson.id) {
        trouve =true;
        index=i;
      }
    });
    if (trouve) {
      console.log(boisson.qte);
      if (quantite > somme) {

        boisson.qte++;
        this.tab[index] = boisson;
      }else{
        this.disabled=true;
        this.tab[index] = boisson;
       }
      
    }else{
      if (quantite >= somme) {
        
        boisson.qte = 1;
        this.tab.push(boisson);
      }
    }
    if (quantite === somme) {
      
      this.disabled=true;
    }else{
      this.disabled=false;

    }
    
    
  }
 */
  augmenter(boisson:any,quantite:number){
    console.log(boisson.qte);
    let trouve=false;
    let index = 0;
    let somme :number=0;
    if (boisson.qte == undefined) {
      
      boisson.qte++
    }
    
   
        if (this.tab.length>0) {
          this.tab.forEach((element,i) => {
            somme += element.qte;
            console.log("som"+somme);
            
            if (element.id === boisson.id) {
              trouve =true;
              index=i;
            }
          });

          if (trouve) {            
            if (quantite > somme) {
              console.log("avant",boisson.qte);

              ++boisson.qte;
            console.log("trouve>sommeqte",boisson.qte);
              this.tab[index] = boisson;
            }else{
            console.log("trouve<sommeqte",boisson.qte);
              this.tab[index] = boisson;
             }

          }else{
            boisson.qte=1
            console.log("not found",boisson.qte);
            this.tab.push(boisson)
          }

        }else{
          boisson.qte=1
      

          this.tab.push(boisson)
        }

   
    if (quantite === somme) {

      this.disabled=true;
    }else{
      this.disabled=false;

    } 
    console.log(somme, quantite);   
    console.log(this.tab);   


  }

  diminuer(boisson:any,quantite:number){
    console.log(boisson.qte);
    
    // if (boisson.qte > 0) {
    //   boisson.qte--;
    // }
        let trouve=false;
        let index = 0;
        let somme = -1;
    this.tab.forEach((element,i) => {
      somme += element.qte;
      if (element.id === boisson.id) {
        trouve =true;
        index=i;
      }
    });
    console.log("quantite",boisson.qte);
    
    if (trouve) {
      if (boisson.qte > 0) {

        boisson.qte--;
        // console.log(boisson , input.value);
        this.tab[index] = boisson;
      }else if (boisson.qte === 0){
          this.tab.splice(index,1);
      
       }
      
    }else{
      if (boisson.qte > 0) {
        
        boisson.qte--;
        this.tab.push(boisson);
      }
    }
    if (somme == 0) {
      this.tab = [];
      this.disabled=true;
    }
    if (quantite === somme) {
      
      this.disabled=true;
    }else{
      this.disabled=false;

    }

    console.log(somme, quantite);   
    console.log(this.tab);
  }
}
