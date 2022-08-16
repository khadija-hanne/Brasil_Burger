import { Component, OnInit } from '@angular/core';
import { Catalogue } from 'src/app/model/catalogue';
import { Menu } from 'src/app/model/menu';
import { Produits } from 'src/app/model/produits';
import { CatalogueService } from 'src/app/services/catalogue.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  // catalogue: Catalogue | undefined;
  catalogueBurger: Produits[]=[];
  catalogueMenu: Menu[]=[];
  // produit?: Produits;
  show: boolean = false;

  constructor(private catalogueService: CatalogueService) { }

  ngOnInit(): void {
    this.catalogueService.getCatalogue().subscribe(
      res=>{
        this.catalogueBurger = res.burger;
        this.catalogueMenu = res.menu;
  
      }
      )

    
    // this.catalogueBurger = this.catalogueService.getCatalogueBurger()

  }

  /* detailProduit(produits: Produits): void {

    this.produit = produits;
  } */

}
