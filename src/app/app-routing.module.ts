import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanierComponent } from './panier/panier.component';
import { CatalogueDetailComponent } from './produits/catalogue/catalogue-detail/catalogue-detail.component';
import { CatalogueComponent } from './produits/catalogue/catalogue.component';

const routes: Routes = [
  {path: '', component:CatalogueComponent},
  {path: 'produit/:id', component:CatalogueDetailComponent},
  {path: 'cart', component:PanierComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
