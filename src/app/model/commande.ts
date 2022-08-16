import { Menu } from "./menu";
import { Produits } from "./produits";

export interface Commande {

    produits : [
        {
            quantite : number;
            produit : {
                id:number; 
            }
        }
        
    ];
    client : {
        id:number;  
    };
    zone : {
        id:number;
    };
}