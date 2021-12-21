import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-gestionar-autores',
  templateUrl: './gestionar-autores.component.html',
  styleUrls: ['./gestionar-autores.component.css']
})
export class GestionarAutoresComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public Agregar(){ 
    $("#agregacion").removeClass("regionnoseleccionada");
    $("#agregacion").addClass("regionseleccionada");
    $("#visualizacion").removeClass("regionseleccionada");
    $("#visualizacion").addClass("regionnoseleccionada");
    $("#registrar").prop("hidden", false);
    $("#ver").prop("hidden", true);
  }

  public Visualizar(){
    $("#agregacion").removeClass("regionseleccionada");
    $("#agregacion").addClass("regionnoseleccionada");
    $("#visualizacion").removeClass("regionnoseleccionada");
    $("#visualizacion").addClass("regionseleccionada");
    $("#registrar").prop("hidden", true);
    $("#ver").prop("hidden", false);
  }

}
