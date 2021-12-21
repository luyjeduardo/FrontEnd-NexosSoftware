import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Autor } from 'src/app/Entidades/autor';
import { AutorServiceService } from 'src/app/Servicios/Autor/autor-service.service';
import Swal from 'sweetalert2';
import { Validaciones } from '../../Validaciones/validaciones';

@Component({
  selector: 'app-veraut',
  templateUrl: './veraut.component.html',
  styleUrls: ['./veraut.component.css']
})
export class VerautComponent implements OnInit {

  public AutorId!: number;
  public Nombrescompletos!: string;
  public Fechadenacimiento!: Date;
  public Ciudaddeprocedencia!: string;
  public Correoelectronico!: string;
  public Autores: Autor[] = [];
  private Singletonvalidaciones: Validaciones = Validaciones.ObtenerInstancia();
  private Autor = Autor.ObtenerInstancia();

  constructor(public serviciomodal: NgbModal,
              private autorservices: AutorServiceService,
              private toastservice: ToastrService) {
    this.CargarAutores();
  }

  ngOnInit(): void {
    $(() => {
      this.PrevenirPaste();
    });
  }

  private async CargarAutores() {
    this.Autores = [];
    (await this.autorservices.RecibirAutores())
      .toPromise()
      .then((response: any) => {
        if (response["mensajesuccess"] === "La consulta fue exitosa.") {
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

  public AbrirModalModificarAutor(autor: Autor, contenido: any, bandera: boolean) {
    this.CargarInformacion(autor, bandera);
    this.serviciomodal.open(contenido, { size: 'lg' })
  }

  private CargarInformacion(autor: Autor, bandera: boolean) {
    this.AutorId = autor.AutorId_;
    this.Nombrescompletos = autor.Nombrescompletos_;
    this.Fechadenacimiento = autor.Fechadenacimiento_;
    this.Ciudaddeprocedencia = autor.Ciudaddeprocedencia_;
    this.Correoelectronico = autor.Correoelectronico_;
  }

  public ValidarParaModificar() {
    if (this.ValidarContenidoEnLosAtributos()) {
      if (this.ValidarEmail()) {
        this.EncapsularPropiedades();
        if (this.Autor.ValidarPropiedades() === "success") {
          this.ModificarAutor();
        } else {
          this.AlertasSwalError('INCONSISTENCIA', this.Autor.ValidarPropiedades());
        }
      } else {
        this.AlertasSwalError('INCONSISTENCIA', 'Debe digitar un email válido, verifíquelo.');
      }
    } else {
      this.AlertasSwalError('INCONSISTENCIA', 'Debe digitar toda la información.');
    }
  }

  private ModificarAutor() {
    this.autorservices.ModificarAutor(this.AutorId, this.Autor).subscribe(
      (response: any) => {
        if (response["mensaje"] === "La modificación fue exitosa.") {
          this.toastservice.success(response["mensaje"], "MODIFICADO", {
            "progressBar": true,
            "progressAnimation": 'increasing',
            "timeOut": 2500
          });
           this.CargarAutores();
        }
      }
    );
  }

  private ValidarContenidoEnLosAtributos(): boolean {
    return this.Singletonvalidaciones.ValidarContenidoEnLosAtributos(
      this.Nombrescompletos,
      this.Fechadenacimiento,
      this.Ciudaddeprocedencia,
      this.Correoelectronico
    );
  }

  private ValidarEmail(): boolean {
    return this.Singletonvalidaciones.ValidarEmail(this.Correoelectronico);
  }

  public EncapsularPropiedades() {
    this.Autor.AutorId_ = this.AutorId;
    this.Autor.Nombrescompletos_ = this.Nombrescompletos;
    this.Autor.Fechadenacimiento_ = this.Fechadenacimiento;
    this.Autor.Ciudaddeprocedencia_ = this.Ciudaddeprocedencia;
    this.Autor.Correoelectronico_ = this.Correoelectronico;
  }

  private LimpiarInformacion() {
    this.Nombrescompletos = "";
    this.Fechadenacimiento = new Date();
    this.Ciudaddeprocedencia = "";
    this.Correoelectronico = "";
  }

  private PrevenirPaste() {
    this.Singletonvalidaciones.PrevenirPaste();
  }

  public ValidarCaracteresAlfabeticosYMaxLength(event: KeyboardEvent, id: string, length: number) {
    this.Singletonvalidaciones.ValidarCaracteresAlfabeticosYMaxLength(event, id, length);
  }

  public ValidarMaxLength(event: KeyboardEvent, id: string, length: number) {
    this.Singletonvalidaciones.ValidarMaxLength(event, id, length);
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
