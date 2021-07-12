import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidadoresService } from '../../services/validadores.service';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../interfaces/persona.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css'
  ]
})
export class RegisterComponent implements OnInit {

  controlInvalid(nomControl: string) : boolean {
    return this.formulario.get(nomControl).touched && this.formulario.get(nomControl).invalid;
  }

  get appaternoVacio(){
    return this.controlInvalid('appaterno')  && this.formulario.get('appaterno').errors.required;
  }

  get appaterno3letras(){
    return this.controlInvalid('appaterno') && this.formulario.get('appaterno').errors.minlength;
  }

  get appaternoSoloLetras(){
    return this.controlInvalid('appaterno') && this.formulario.get('appaterno').errors.pattern;
  }

  get apmaternoVacio(){
    return this.controlInvalid('apmaterno')  && this.formulario.get('apmaterno').errors.required;
  }

  get apmaternoSoloLetras(){
    return this.controlInvalid('apmaterno') && this.formulario.get('apmaterno').errors.pattern;
  }

  get apmaterno3letras(){
    return this.controlInvalid('apmaterno') && this.formulario.get('apmaterno').errors.minlength;
  }

  get nombreVacio(){
    return this.controlInvalid('nombres')  && this.formulario.get('nombres').errors.required;
  }

  get nombre3letras(){
    return this.controlInvalid('nombres') && this.formulario.get('nombres').errors.minlength;
  }

  get nombreSoloLetras(){
    return this.controlInvalid('nombres') && this.formulario.get('nombres').errors.pattern;
  }

  get correoVacio(){
    return this.controlInvalid('correo')  && this.formulario.get('correo').errors.required;
  }

  get correoFormatoInvalido(){
    return this.controlInvalid('correo')  && this.formulario.get('correo').errors.pattern;
  }

  get correoNoDisponible(){
    return this.controlInvalid('correo')  && this.formulario.get('correo').errors.noDisponible;
  }

  get claveVacia(){
    return this.controlInvalid('password1') && this.formulario.get('password1').errors.required;
  }

  get claveSoloAlfanumerico(){
    return this.controlInvalid('password1') && this.formulario.get('password1').errors.pattern;
  }

  get clavesDesiguales(){
    return this.formulario.get('password2').invalid && this.formulario.get('password2').errors.clavesdistintas;
  }

  get telefonoInvalido(){
    return this.controlInvalid('telefono') && this.formulario.get('telefono').errors.required;
  }

  get formatoTelefonoInvalido(){
    return this.controlInvalid('telefono') && this.formulario.get('telefono').errors.pattern;
  }

  get telefonoNoDisponible(){
    return this.controlInvalid('telefono') && this.formulario.get('telefono').errors.noDisponible;
  }

  get generoInvalido(){
    return this.controlInvalid('genero');
  }

  formulario: FormGroup;

  constructor(private fb: FormBuilder, private val: ValidadoresService, private usuarServ: UsuariosService
    , private router: Router) { }

  ngOnInit(): void {
    this.construirFormulario();
  }

  construirFormulario(){
    this.formulario = this.fb.group({
      appaterno: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]*$")]],
      apmaterno: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]*$")]],
      nombres: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]*$")]],
      correo: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/.+\@.+\..+/)], this.val.correoDisponible],
      telefono: ['', [Validators.required, Validators.pattern("[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]")], this.val.telefonoDisponible],
      password1: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9]*$")]],
      password2: [''],
      genero: ['', Validators.required]
    }, { validators: this.val.clavesIguales('password1', 'password2') });
  }

  enviarFormulario(){
    if(this.formulario.valid){
      Swal.fire({
        icon: 'question',
        title: 'Crear cuenta',
        text: '¿Desea crear su cuenta?',
        showCancelButton: true,
        showConfirmButton: true
      }).then((value) => {
        if(value.isConfirmed){
          let usuario: Usuario = {
            appaterno: this.formulario.value["appaterno"],
            apmaterno: this.formulario.value["apmaterno"],
            nombres: this.formulario.value["nombres"],
            correo: this.formulario.value["correo"],
            password: this.formulario.value["password1"],
            genero: this.formulario.value["genero"],
            telefono: this.formulario.value["telefono"]
          };
    
          this.usuarServ.registrarUsuario(usuario).subscribe((data) => {
            Swal.fire({
              icon: 'success',
              title: 'Bienvenido!',
              text: 'Has sido registrado en la base de datos.'
            });

            this.router.navigateByUrl('/login');
          }, (err) => {
            Swal.fire({
              icon: 'error',
              title: `Error ${ err.status }`,
              text: err.error.error.message
            });
          });
        }
      });
    }else{
      Object.values(this.formulario.controls).forEach((_controls) => {
        _controls.markAsTouched();
      });
    }
  }
}