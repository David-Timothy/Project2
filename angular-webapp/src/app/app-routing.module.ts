import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BattleComponent } from './battle/battle.component';
import { CharactersComponent } from './characters/characters.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  { path: 'shop', component: ShopComponent},
  { path: 'battle', component: BattleComponent },
  { path: 'characters', component: CharactersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
