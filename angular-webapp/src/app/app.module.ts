import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BattleComponent } from './battle/battle.component';
import { CharactersComponent } from './characters/characters.component';
import { AchievementsComponent } from './characters/achievements/achievements.component';
import { ShopComponent } from './shop/shop.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { UpdateUsernamePasswordComponent } from './update-username-password/update-username-password.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminAssignCoinsComponent } from './admin-assign-coins/admin-assign-coins.component';
import { AdminHandleRequestComponent } from './admin-handle-request/admin-handle-request.component';
import { RequestsComponent } from './requests/requests.component';
import { BuyCoinsComponent } from './buy-coins/buy-coins.component';
import { AdminManageComponent } from './admin-manage/admin-manage.component';


@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    BattleComponent,
    CharactersComponent,
    AchievementsComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    StatisticsComponent,
    UpdateUsernamePasswordComponent,
    AdminLoginComponent,
    AdminHomeComponent,
    AdminManageComponent,
    AdminAssignCoinsComponent,
    AdminHandleRequestComponent,
    RequestsComponent,
    BuyCoinsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent, /*ShopComponent, BattleComponent*/]
})

export class AppModule { }
