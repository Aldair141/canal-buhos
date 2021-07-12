import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BloquearcanalGuard implements CanActivate {

  constructor( private usuaServ: UsuariosService, private router: Router ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.usuaServ.estalogueado()){
        return true;
      }else{
        this.router.navigateByUrl('/login');
        return false;
      }
    }
  
}
