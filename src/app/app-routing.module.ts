import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PokemonListComponent } from './components/pokemon/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './components/pokemon/pokemon-detail/pokemon-detail.component';

const routes: Routes = [
  { path : 'home', component : HomeComponent },
  { path : 'pokemon', component : PokemonListComponent },
  { path : 'pokemon-detail/:pokemonId', component : PokemonDetailComponent },
  { path : '', pathMatch : 'full', redirectTo : 'home' },
  { path : '**', pathMatch : 'full', redirectTo : 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { enableTracing : false }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
