import { Component, OnInit } from '@angular/core';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  totalItem:number=0;
  constructor(private servicePanier:PanierService) { }

  ngOnInit(): void {
    this.servicePanier.items$.subscribe(
      resultat =>{
        this.totalItem = resultat.length

      }
    )
  }

}
