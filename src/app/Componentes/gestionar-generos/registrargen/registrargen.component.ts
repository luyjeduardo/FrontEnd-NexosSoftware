import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Genero } from 'src/app/Entidades/genero';
import { GeneroServiceService } from 'src/app/Servicios/Genero/genero-service.service';
import Swal from 'sweetalert2';
import { Validaciones } from '../../Validaciones/validaciones';

@Component({
  selector: 'app-registrargen',
  templateUrl: './registrargen.component.html',
  styleUrls: ['./registrargen.component.css']
})
export class RegistrargenComponent implements OnInit {

  public GeneroId!: number;
  public Nombre!: string;
  public Descripcion!: string;
  public GeneroId_mod!: number;
  public Nombre_mod!: string;
  public Descripcion_mod!: string;
  public Generos: Genero[] = [];
  private Singletonvalidaciones: Validaciones = Validaciones.ObtenerInstancia();
  private Genero = Genero.ObtenerInstancia();

  constructor(private generoservices: GeneroServiceService,
    private toastservice: ToastrService,
    public serviciomodal: NgbModal,) {
    this.CargarGeneros();
  }

  ngOnInit(): void {
    $(() => {
      this.PrevenirPaste();
    });
  }

  private CargarGeneros() {
    this.Generos = [];
    this.generoservices.RecibirGeneros()
      .subscribe((response: any) => {
        if (response["mensajesuccess"] === "La consulta fue exitosa.") {
          response["generos"]["result"].forEach((obj: any) => {
            var genero = new Genero();
            genero.GeneroId_ = Number(obj["generoId"]);
            genero.Nombre_ = obj["nombre"];
            genero.Descripcion_ = obj["descripcion"];
            this.Generos.push(genero);
          });
        }
      });
  }

  ValidarParaRegistrar() {
    if (this.ValidarContenidoEnLosAtributos(this.Nombre)) {
      this.EncapsularPropiedades(this.GeneroId, this.Nombre, this.Descripcion);
      if (this.Genero.ValidarPropiedades() === "success") {
        this.RegistrarGenero();
      } else {
        this.AlertasSwalError('INCONSISTENCIA', this.Genero.ValidarPropiedades());
      }
    } else {
      this.AlertasSwalError('INCONSISTENCIA', 'Debe digitar toda la información obligatoria.');
    }
  }

  private RegistrarGenero() {
    this.generoservices.RegistrarGenero(this.Genero)
      .subscribe(
        (response: any) => {
          if (response["mensaje"] === "El registro del género fue exitoso.") {
            this.toastservice.success(response["mensaje"], "REGISTRADO", {
              "progressBar": true,
              "progressAnimation": 'increasing',
              "timeOut": 2500
            });
            this.LimpiarInformacion();
            this.CargarGeneros();
          }
        }
      );
  }

  public ValidarParaModificar() {
    if (this.ValidarContenidoEnLosAtributos(this.Nombre_mod)) {
      this.EncapsularPropiedades(this.GeneroId_mod, this.Nombre_mod, this.Descripcion_mod);
      if (this.Genero.ValidarPropiedades() === "success") {
        this.ModificarGenero();
      } else {
        this.AlertasSwalError('INCONSISTENCIA', this.Genero.ValidarPropiedades());
      }
    } else {
      this.AlertasSwalError('INCONSISTENCIA', 'Debe digitar toda la información que sea requerida.');
    }
  }

  private ModificarGenero() {
    this.generoservices.ModificarGenero(this.GeneroId_mod, this.Genero).subscribe(
      (response: any) => {
        if (response["mensaje"] === "La modificación fue exitosa.") {
          this.toastservice.success(response["mensaje"], "MODIFICADO", {
            "progressBar": true,
            "progressAnimation": 'increasing',
            "timeOut": 2500
          });
           this.CargarGeneros();
        } 
      }
    );
  }

  public AbrirModalModificarGenero(genero: Genero, contenido: any, bandera: boolean) {
    this.CargarInformacion(genero, bandera);
    this.serviciomodal.open(contenido, { size: 'md' })
  }

  private CargarInformacion(genero: Genero, bandera: boolean) {
    this.GeneroId_mod = genero.GeneroId_;
    this.Nombre_mod = genero.Nombre_;
    this.Descripcion_mod = genero.Descripcion_;
  }

  private ValidarContenidoEnLosAtributos(nombre: string): boolean {
    if (nombre != null && nombre != undefined && nombre != "") {
      return true;
    } else {
      return false;
    }
  }

  public EncapsularPropiedades(id: number, nombre: string, descripcion: string) {
    this.Genero.GeneroId_ = id;
    this.Genero.Nombre_ = nombre;
    this.Genero.Descripcion_ = descripcion;
  }

  private LimpiarInformacion() {
    this.Nombre = "";
    this.Descripcion = "";
  }

  private PrevenirPaste() {
    var nombre = <HTMLElement>document.getElementById('Nombre');
    var descripcion = <HTMLElement>document.getElementById('Descripcion');
    nombre.onpaste = function (e) { e.preventDefault(); }
    descripcion.onpaste = function (e) { e.preventDefault(); }
  }

  public ValidarCaracteresAlfabeticosYMaxLength(event: KeyboardEvent, id: string, length: number) {
    this.Singletonvalidaciones.ValidarCaracteresAlfabeticosYMaxLength(event, id, length);
  }

  private AlertasSwalError(encabezado: string, cuerpo: string) {
    Swal.fire({
      title: '¡' + encabezado + '!',
      text: cuerpo,
      icon: 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Entiendo',
      footer: '<a style="color: dodgerblue;">Prueba de software.</a>'
    })
  }
}
