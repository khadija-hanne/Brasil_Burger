import { Produits } from "./produits"

export interface Menu{

        
        id:number;
        nom: string;
        prix:number;
        image:string;
        quantite:number;
        typeProduit:string;
        gestionnaire:number;
        Burgers: [
          {
            quantite:number,
            burger:Produits,
          }
        ];
        Boissons: [
          {
            quantite:number,
            tailleBoisson:any,
          }
        ];
        Frites: [
          {
            quantite:number,
            frites:any
          }
        ];
     
}