import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PokemonListComponent } from './components/pokemon/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './components/pokemon/pokemon-detail/pokemon-detail.component';

export const APP_ROUTES : Routes = [
    { path : 'home', component : HomeComponent },
    { path : 'pokemon', component : PokemonListComponent },
    { path : 'pokemon-detail/:pokemonId', component : PokemonDetailComponent },
    { path : '', pathMatch : 'full', redirectTo : 'home' },
    { path : '**', pathMatch : 'full', redirectTo : 'home' }
];