import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PokemonListComponent } from './components/pokemon/pokemon-list/pokemon-list.component';
import { POKEMONDETAILS_ROUTES } from './components/pokemon/pokemon-list/pokemon-list.routes';

export const APP_ROUTES : Routes = [
    { path : 'home', component : HomeComponent },
    { path : 'pokemon', component : PokemonListComponent,
        children : POKEMONDETAILS_ROUTES },
    { path : '', pathMatch : 'full', redirectTo : 'home' },
    { path : '**', pathMatch : 'full', redirectTo : 'home' }
];