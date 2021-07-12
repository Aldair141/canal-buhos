import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { RespuestaPromesa } from '../interfaces/respuesta-promesa.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  urlHost: string = 'https://app-youtube-buhito.herokuapp.com';
  //private urlHost: 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  //Validar que dos contraseñas sean válidas
  clavesIguales(nombre1: string, nombre2: string){
    return (formGroup: FormGroup) => {
      const control1 = formGroup.get(nombre1);
      const control2 = formGroup.get(nombre2);

      if(control1.value === control2.value){
        control2.setErrors(null);
      }else{
        control2.setErrors({ clavesdistintas: true });
      }
    }
  }

  //Validar si un campo es correo o número
  usuarioValidoLogin(usuarioControl: FormControl): RespuestaPromesa{
    if(!usuarioControl.value){
      return null;
    }

    const value: string = usuarioControl.value.toString();
    if(value.match(/.+\@.+\..+/) ||  Number(value)){
      return null;
    }else{
      return { formatoincorrecto: true };
    }
  }

  //Validar si el correo está disponible
  correoDisponible = (correoControl: FormControl) : Observable<RespuestaPromesa> | Promise<RespuestaPromesa> => {
    if(!correoControl.value){
      return Promise.resolve(null);
    }

    return new Promise((resolve, reject) => {
      this.http.get(`${ this.urlHost }/usuario/correoDisponible/${ correoControl.value }`).subscribe((response: any) => {
        if(response.ok){
          if(response.disponible){
            resolve(null);
          }else{
            resolve({ noDisponible: true });
          }
        }else{
          return resolve({ errorInterno: true });
        }
      });
    });
  }

  telefonoDisponible = (telefonoControl: FormControl) : Observable<RespuestaPromesa> | Promise<RespuestaPromesa> => {
    if(!telefonoControl.value){
      return Promise.resolve(null);
    }

    return new Promise((resolve, reject) => {
      this.http.get(`${ this.urlHost }/usuario/telefonoDisponible/${ telefonoControl.value }`).subscribe((response: any) => {
        if(response.ok){
          if(response.disponible){
            resolve(null);
          }else{
            resolve({ noDisponible: true });
          }
        }else{
          return resolve({ errorInterno: true });
        }
      });
    });
  }
}