import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopComponent } from './shop/shop.component';
import { BattleComponent } from './battle/battle.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { UpdateUsernamePasswordComponent } from './update-username-password/update-username-password.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminManageComponent } from './admin-manage/admin-manage.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'battle', component: BattleComponent},
  {path: 'statistics', component: StatisticsComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'update-username-password', component: UpdateUsernamePasswordComponent},
  {path: '', component: LoginComponent},
  {path: 'admin', component: AdminLoginComponent},
  {path: 'adminhome', component:AdminHomeComponent},
  {path: 'character/:id', component:AdminManageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    BattleComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    StatisticsComponent,
    UpdateUsernamePasswordComponent,
    AdminLoginComponent,
    AdminHomeComponent,
    AdminManageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent, /*ShopComponent,*/ BattleComponent]
})

export class AppModule { }
