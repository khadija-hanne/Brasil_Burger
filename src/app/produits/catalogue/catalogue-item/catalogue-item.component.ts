import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Menu } from 'src/app/model/menu';
import { Produits } from 'src/app/model/produits';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-catalogue-item',
  templateUrl: './catalogue-item.component.html',
  styleUrls: ['./catalogue-item.component.css']
})
export class CatalogueItemComponent implements OnInit {

  @Input() product!: Produits | Menu ;
  @Output() detailProduit: EventEmitter<Produits> = new EventEmitter<Produits>;


  constructor(private sanitizer : DomSanitizer, private servicePanier:PanierService) { }

  ngOnInit(): void {
  }


  showProduit(product: Produits | undefined): void {
    this.detailProduit.emit(product);
  }

  transform(img:string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(img);
}

  addCart(product : Menu | Produits){
    this.servicePanier.addToCart(product);
    console.log(product);
    
  }

}
