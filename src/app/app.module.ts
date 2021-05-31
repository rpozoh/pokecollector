import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Rutas
import { APP_ROUTES } from './app.routes';

// Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

// Firebase
import { AngularFireModule } from  '@angular/fire';

// Environment
import { environment } from '../environments/environment';
import { PokemonListComponent } from './components/pokemon/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './components/pokemon/pokemon-detail/pokemon-detail.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { BodyComponent } from './components/shared/body/body.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PokemonListComponent,
    PokemonDetailComponent,
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    BodyComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot( APP_ROUTES,{ useHash : true } ),
    AngularFireModule.initializeApp(environment.firebase, 'angular-fs'),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
