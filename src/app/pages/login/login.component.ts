import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';
import { UsuarioLogin } from '../../interfaces/persona.interface';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  campoNoValido(nomcampo: string){
    return this.formLogin.get(nomcampo).touched && this.formLogin.get(nomcampo).invalid;
  }

  get usuarioNoValido(){
    return this.campoNoValido('usuario') && this.formLogin.get('usuario').errors.formatoincorrecto;
  }

  get usuarioVacio(){
    return this.campoNoValido('usuario') && this.formLogin.get('usuario').errors.required;
  }

  get claveInvalido(){
    return this.campoNoValido('clave');
  }

  constructor(private fb: FormBuilder, private val: ValidadoresService, private us: UsuariosService,
    private router: Router) {
      if(localStorage.getItem('token')){
        this.router.navigateByUrl('/channel');
      }
    }

  ngOnInit(): void {
    this.construirFormulario();

    if(localStorage.getItem('usuario')){
      this.formLogin.reset({
        usuario: localStorage.getItem('usuario')
      });
    }
  }

  construirFormulario(){
    this.formLogin = this.fb.group({
      usuario: ['', [Validators.required, this.val.usuarioValidoLogin]],
      clave: ['', Validators.required],
      rememberme: ['']
    });
  }

  onSubmit() {
    if(this.formLogin.invalid){
      Object.values(this.formLogin.controls).forEach((control) => {
        control.markAsTouched();
      });
    }else{
      let usuario: UsuarioLogin = {
        usuario: this.formLogin.value["usuario"],
        password: this.formLogin.value["clave"]
      };

      this.us.iniciarSesion(usuario).subscribe((response: any) => {
        if(response.ok){
          localStorage.setItem('token', response.token);

          if(this.formLogin.get('rememberme').value){
            localStorage.setItem('usuario', this.formLogin.value["usuario"]);
          }else{
            localStorage.removeItem('usuario');
          }

          this.router.navigateByUrl('/channel');
        }
      });
    }
  }
}