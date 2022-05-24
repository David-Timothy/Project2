import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';W
import { ShopComponent } from './shop/shop.component';
import { BattleComponent } from './battle/battle.component';
import { CharactersComponent } from './characters/characters.component';
import {HttpClientModule} from '@angular/common/http';
import { AchievementsComponent } from './characters/achievements/achievements.component';

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    BattleComponent
    CharactersComponent,
    AchievementsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent, ShopComponent, BattleComponent]
})
export class AppModule { }
