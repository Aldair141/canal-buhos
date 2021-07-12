import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChannelComponent } from './channel/channel.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ChannelComponent, NotfoundComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    LoginComponent, RegisterComponent, ChannelComponent, NotfoundComponent
  ]
})
export class PagesModule { }
