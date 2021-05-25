import { Routes } from '@angular/router';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';

export const POKEMONDETAILS_ROUTES : Routes = [
    { path : 'detail', component : PokemonDetailComponent },
    { path : '', pathMatch : 'full', redirectTo : 'pokemon' },
    { path : '**', pathMatch : 'full', redirectTo : 'pokemon' }
]