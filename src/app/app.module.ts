import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogueComponent } from './produits/catalogue/catalogue.component';
import { CatalogueItemComponent } from './produits/catalogue/catalogue-item/catalogue-item.component';
import { HeaderComponent } from './include/header/header.component';
import { FooterComponent } from './include/footer/footer.component';
import { CatalogueDetailComponent } from './produits/catalogue/catalogue-detail/catalogue-detail.component';
import { PanierComponent } from './panier/panier.component';

@NgModule({
  declarations: [//les composants
    AppComponent,

    CatalogueComponent,
    CatalogueItemComponent,
    HeaderComponent,
    FooterComponent,
    CatalogueDetailComponent,
    PanierComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],//services
  bootstrap: [AppComponent]
})
export class AppModule { }
