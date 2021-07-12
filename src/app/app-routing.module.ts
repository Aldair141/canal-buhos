import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ChannelComponent } from './pages/channel/channel.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { BloquearcanalGuard } from './guards/bloquearcanal.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'channel', component: ChannelComponent, canActivate: [BloquearcanalGuard] },
  { path: 'notfound', component: NotfoundComponent },
  { path: '', pathMatch: 'full', redirectTo: 'channel' },
  { path: '**', pathMatch: 'full', redirectTo: 'notfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
