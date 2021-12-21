import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './Componentes/principal/principal.component';
import { GestionarAutoresComponent } from './Componentes/gestionar-autores/gestionar-autores.component';
import { GestionarGenerosComponent } from './Componentes/gestionar-generos/gestionar-generos.component';
import { GestionarLibrosComponent } from './Componentes/gestionar-libros/gestionar-libros.component';
import { RegistrarautComponent } from './Componentes/gestionar-autores/registraraut/registraraut.component';
import { VerautComponent } from './Componentes/gestionar-autores/veraut/veraut.component';
import { RegistrargenComponent } from './Componentes/gestionar-generos/registrargen/registrargen.component';
import { RegistrarlibComponent } from './Componentes/gestionar-libros/registrarlib/registrarlib.component';
import { ConsultasComponent } from './Componentes/consultas/consultas.component';

const routes: Routes = [
  { path: 'principal', component: PrincipalComponent },
  { 
    path: 'gestionarautores', 
    component: GestionarAutoresComponent,
    children: [
      { path: 'registrar', component: RegistrarautComponent },
      { path: 'ver', component: VerautComponent }
    ]
  },
  { 
    path: 'gestionargeneros', 
    component: GestionarGenerosComponent,
    children: [
      { path: 'registrar', component: RegistrargenComponent }
    ]
  },
  { 
    path: 'gestionarlibros',
    component: GestionarLibrosComponent,
    children: [
      { path: 'registrar', component: RegistrarlibComponent }
    ]
  },
  { path: 'consultas', component: ConsultasComponent },
  { path: '',   redirectTo: '/principal', pathMatch: 'full' },
  { path: '**', component: PrincipalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
