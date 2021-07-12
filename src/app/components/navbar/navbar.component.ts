import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  constructor(private usServ: UsuariosService, private router: Router) { }

  ngOnInit(): void {
  }

  cerrarSesion(){
    this.usServ.cerrarSesion();
    this.router.navigateByUrl('/login');
  }

}