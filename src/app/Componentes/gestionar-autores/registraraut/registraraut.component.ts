import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Autor } from 'src/app/Entidades/autor';
import { AutorServiceService } from 'src/app/Servicios/Autor/autor-service.service';
import Swal from 'sweetalert2';
import { Validaciones } from '../../Validaciones/validaciones';

@Component({
  selector: 'app-registraraut',
  templateUrl: './registraraut.component.html',
  styleUrls: ['./registraraut.component.css']
})
export class RegistrarautComponent implements OnInit {

  public Nombrescompletos!: string;
  public Fechadenacimiento!: Date;
  public Ciudaddeprocedencia!: string;
  public Correoelectronico!: string;
  public Autores: Autor[] = [];
  private Singletonvalidaciones: Validaciones = Validaciones.ObtenerInstancia();
  private Autor = Autor.ObtenerInstancia();

  constructor(private autorservices: AutorServiceService,
              private toastservice: ToastrService) { 
    this.CargarAutores();
  }

  ngOnInit(): void {
    $(()=>{
      this.PrevenirPaste();
    });
  }

  private async CargarAutores() {
    this.Autores = [];
    (await this.autorservices.RecibirAutores())
      .subscribe((response: any) => {
        if(response["mensajesuccess"] === "La consulta fue exitosa."){
          response["autores"]["result"].forEach((obj: any) => {
            var autor = new Autor();
            autor.AutorId_ = Number(obj["autorId"]);
            autor.Ciudaddeprocedencia_ = obj["ciudaddeprocedencia"];
            autor.Correoelectronico_ = obj["correoelectronico"];
            autor.Fechadenacimiento_ = new Date(obj["fechadenacimiento"]);
            autor.Nombrescompletos_ = obj["nombrescompletos"];
            this.Autores.push(autor);
          });
        }
    });
  }

  ValidarParaRegistrar() {
    if(this.ValidarContenidoEnLosAtributos()){
      if (this.ValidarEmail()) {
        this.EncapsularPropiedades();
        if (this.Autor.ValidarPropiedades() === "success") {
          this.RegistrarAutor();
        } else {
          this.AlertasSwalError('INCONSISTENCIA', this.Autor.ValidarPropiedades());
        }
      } else{
        this.AlertasSwalError('INCONSISTENCIA', 'Debe digitar un email válido, verifíquelo.');
      }
    } else {
      this.AlertasSwalError('INCONSISTENCIA', 'Debe digitar toda la información.');
    } 
  }

  private RegistrarAutor() {
    this.autorservices.RegistrarAutor(this.Autor)
      .subscribe(
        (response: any) => {
          console.log(response);
          if (response["mensaje"] === "El registro del Autor fue exitoso.") {
            this.toastservice.success(response["mensaje"], "REGISTRADO", {
              "progressBar": true,
              "progressAnimation": 'increasing',
              "timeOut": 2500
            });
            this.LimpiarInformacion();
            this.CargarAutores();
          }
        }
      );
  }

  private ValidarContenidoEnLosAtributos() : boolean {
    return this.Singletonvalidaciones.ValidarContenidoEnLosAtributos(
      this.Nombrescompletos, 
      this.Fechadenacimiento, 
      this.Ciudaddeprocedencia, 
      this.Correoelectronico
    );
  }

  private ValidarEmail() : boolean {
    return this.Singletonvalidaciones.ValidarEmail(this.Correoelectronico);
  }

  public EncapsularPropiedades() {
    this.Autor.Nombrescompletos_ = this.Nombrescompletos;
    this.Autor.Fechadenacimiento_ = this.Fechadenacimiento;
    this.Autor.Ciudaddeprocedencia_ = this.Ciudaddeprocedencia;
    this.Autor.Correoelectronico_ = this.Correoelectronico;
  }

  private LimpiarInformacion(){
    this.Nombrescompletos = "";
    this.Fechadenacimiento = new Date();
    this.Ciudaddeprocedencia = "";
    this.Correoelectronico = "";
  }

  private PrevenirPaste(){
    this.Singletonvalidaciones.PrevenirPaste();
  }

  public ValidarCaracteresAlfabeticosYMaxLength(event: KeyboardEvent, id: string, length: number) {
    this.Singletonvalidaciones.ValidarCaracteresAlfabeticosYMaxLength(event, id, length);
  }

  public ValidarMaxLength(event: KeyboardEvent, id: string, length: number){
    this.Singletonvalidaciones.ValidarMaxLength(event, id, length);
  }

  private AlertasSwalError(encabezado: string, cuerpo: string) {
    Swal.fire({
      title: '¡'+ encabezado +'!',
      text: cuerpo,
      icon: 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Entiendo',
      footer: '<a style="color: dodgerblue;">Prueba de software.</a>'
    })
  }

}
