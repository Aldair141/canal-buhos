import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario, UsuarioLogin } from '../interfaces/persona.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  urlHost: string = 'https://app-youtube-buhito.herokuapp.com';
  //private urlHost: 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  registrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${ this.urlHost }/usuario`, usuario);
  }

  estalogueado(): boolean {
    if(localStorage.getItem('token')){
      return true;
    }else{
      return false;
    }
  }

  iniciarSesion(usuarioLogin: UsuarioLogin){
    return this.http.post(`${ this.urlHost }/usuario/login`, usuarioLogin);
  }

  cerrarSesion(){
    localStorage.removeItem('token');
  }
}