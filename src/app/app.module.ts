import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './Componentes/principal/principal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GestionarAutoresComponent } from './Componentes/gestionar-autores/gestionar-autores.component';
import { GestionarGenerosComponent } from './Componentes/gestionar-generos/gestionar-generos.component';
import { GestionarLibrosComponent } from './Componentes/gestionar-libros/gestionar-libros.component';
import { RegistrarautComponent } from './Componentes/gestionar-autores/registraraut/registraraut.component';
import { VerautComponent } from './Componentes/gestionar-autores/veraut/veraut.component';
import { RegistrargenComponent } from './Componentes/gestionar-generos/registrargen/registrargen.component';
import { RegistrarlibComponent } from './Componentes/gestionar-libros/registrarlib/registrarlib.component';
import { ConsultasComponent } from './Componentes/consultas/consultas.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    GestionarAutoresComponent,
    GestionarGenerosComponent,
    GestionarLibrosComponent,
    RegistrarautComponent,
    VerautComponent,
    RegistrargenComponent,
    RegistrarlibComponent,
    ConsultasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
