import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BattleComponent } from './battle/battle.component';
import { CharactersComponent } from './characters/characters.component';
import { ShopComponent } from './shop/shop.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { UpdateUsernamePasswordComponent } from './update-username-password/update-username-password.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminAssignCoinsComponent } from './admin-assign-coins/admin-assign-coins.component';
import { AdminHandleRequestComponent } from './admin-handle-request/admin-handle-request.component';
import { BuyCoinsComponent } from './buy-coins/buy-coins.component';
import { RequestsComponent } from './requests/requests.component';
import { AdminManageComponent } from './admin-manage/admin-manage.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'battle', component: BattleComponent},
  {path: 'statistics', component: StatisticsComponent},
  {path: 'characters', component: CharactersComponent },
  {path: 'shop', component: ShopComponent},
  {path: 'update-username-password', component: UpdateUsernamePasswordComponent},
  {path: '', component: LoginComponent},
  {path: 'admin', component: AdminLoginComponent},
  {path: 'adminhome', component:AdminHomeComponent},
  {path: 'character/:id', component:AdminManageComponent},
  {path: 'buy', component: BuyCoinsComponent},
  {path: 'refund', component: RequestsComponent},
  {path: 'assign-coins', component: AdminAssignCoinsComponent},
  {path: 'handle-request', component: AdminHandleRequestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
