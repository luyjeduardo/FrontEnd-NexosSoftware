import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Autor } from 'src/app/Entidades/autor';
import { Genero } from 'src/app/Entidades/genero';
import { Libro } from 'src/app/Entidades/libro';
import { AutorServiceService } from 'src/app/Servicios/Autor/autor-service.service';
import { GeneroServiceService } from 'src/app/Servicios/Genero/genero-service.service';
import { LibroServiceService } from 'src/app/Servicios/Libro/libro-service.service';
import Swal from 'sweetalert2';
import { Validaciones } from '../../Validaciones/validaciones';

@Component({
  selector: 'app-registrarlib',
  templateUrl: './registrarlib.component.html',
  styleUrls: ['./registrarlib.component.css']
})
export class RegistrarlibComponent implements OnInit {

  public LibroId!: number;
  public Titulo!: string;
  public Anio!: number;
  public GeneroId!: number;
  public Numerodepaginas!: number;
  public AutorId!: number;
  public LibroId_mod!: number;
  public Titulo_mod!: string;
  public Anio_mod!: number;
  public GeneroId_mod!: number;
  public Numerodepaginas_mod!: number;
  public AutorId_mod!: number;
  public Libros: Libro[] = [];
  public Generos: Genero[] = [];
  public Autores: Autor[] = [];
  private Singletonvalidaciones: Validaciones = Validaciones.ObtenerInstancia();
  private Libro = Libro.ObtenerInstancia();

  constructor(private libroservices: LibroServiceService,
              private toastservice: ToastrService,
              private generoservices: GeneroServiceService,
              private autorservices: AutorServiceService,
              public serviciomodal: NgbModal) {
  }

  async ngOnInit(): Promise<void> {
    await this.CargarAutores();
    await this.CargarGeneros();
    this.CargarLibros();
    $(() => {
      this.PrevenirPaste();
    });
  }

  private async CargarAutores() {
    this.Autores = [];
    await (await this.autorservices.RecibirAutores())
      .toPromise()
      .then((response: any) => {
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

  private async CargarGeneros() {
    this.Generos = [];
    await this.generoservices.RecibirGeneros()
      .toPromise()
      .then((response: any) => {
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

  private CargarLibros() {
    this.Libros = [];
    this.libroservices.RecibirLibros()
      .subscribe((response: any) => {
        if (response["mensajesuccess"] === "La consulta fue exitosa.") {
          response["libros"]["result"].forEach((obj: any) => {
            var libro = new Libro();
            libro.LibroId_ = Number(obj["libroId"]);
            libro.Anio_ = Number(obj["anio"]);
            libro.AutorId_ = Number(obj["autorId"]);
            libro.GeneroId_ = Number(obj["generoId"]);
            libro.Numerodepaginas_ = Number(obj["numerodepaginas"]);
            libro.Titulo_ = obj["titulo"];
            this.Autores.forEach(aut =>{
              if (aut.AutorId_ === libro.AutorId_) {
                libro.Autor_ = aut;
              }
            });
            this.Generos.forEach(gen => {
              if (gen.GeneroId_ === libro.GeneroId_) {
                libro.Genero_ = gen;
              }
            });
            this.Libros.push(libro);
          });
        }
      });
  }

  public ValidarParaRegistrar() {
    this.AutorId = Number($("#autor").val());
    this.GeneroId = Number($("#genero").val());
    if (this.ValidarContenidoEnLosAtributos(this.Titulo, this.Anio, this.GeneroId, this.Numerodepaginas, this.AutorId)) {
      this.EncapsularPropiedades(this.LibroId, this.Titulo, this.Anio, this.GeneroId, this.Numerodepaginas, this.AutorId);
      if (this.Libro.ValidarPropiedades() === "success") {
        this.RegistrarLibro();
      } else {
        this.AlertasSwalError('INCONSISTENCIA', this.Libro.ValidarPropiedades());
      }
    } else {
      this.AlertasSwalError('INCONSISTENCIA', 'Debe digitar toda la información obligatoria.');
    }
  }

  private RegistrarLibro() {
    this.libroservices.RegistrarLibro(this.Libro)
      .subscribe(
        (response: any) => {
          if (response["mensaje"] === "El registro del libro fue exitoso.") {
            this.toastservice.success(response["mensaje"], "REGISTRADO", {
              "progressBar": true,
              "progressAnimation": 'increasing',
              "timeOut": 2500
            });
            this.LimpiarInformacion();
            this.CargarLibros();
          }
        }
      );
  }

  public ValidarParaModificar() {
    this.AutorId_mod = Number($("#autor_mod").val());
    this.GeneroId_mod = Number($("#genero_mod").val());
    if (this.ValidarContenidoEnLosAtributos(this.Titulo_mod, this.Anio_mod, this.GeneroId_mod, this.Numerodepaginas_mod, this.AutorId_mod)) {
      this.EncapsularPropiedades(this.LibroId_mod, this.Titulo_mod, this.Anio_mod, this.GeneroId_mod, this.Numerodepaginas_mod, this.AutorId_mod);
      if (this.Libro.ValidarPropiedades() === "success") {
        this.ModificarLibro();
      } else {
        this.AlertasSwalError('INCONSISTENCIA', this.Libro.ValidarPropiedades());
      }
    } else {
      this.AlertasSwalError('INCONSISTENCIA', 'Debe digitar toda la información que sea requerida.');
    }
  }

  private ModificarLibro() {
    this.libroservices.ModificarLibro(this.LibroId_mod, this.Libro).subscribe(
      (response: any) => {
        console.log(response);
        if (response["mensaje"] === "La modificación fue exitosa.") {
          this.toastservice.success(response["mensaje"], "MODIFICADO", {
            "progressBar": true,
            "progressAnimation": 'increasing',
            "timeOut": 2500
          });
           this.CargarLibros();
        }
      }
    );
  }

  public AbrirModalModificarLibro(libro: Libro, contenido: any, bandera: boolean) {
    this.CargarInformacion(libro, bandera);
    this.serviciomodal.open(contenido, { size: 'lg' });
  }

  private CargarInformacion(libro: Libro, bandera: boolean) {
    this.LibroId_mod = libro.LibroId_;
    this.Titulo_mod = libro.Titulo_;
    this.Anio_mod = libro.Anio_;
    this.Numerodepaginas_mod = libro.Numerodepaginas_; 
    $("#genero_mod").val(libro.GeneroId_.toString());
    $("#autor_mod").val(libro.AutorId_.toString());
  }

  private ValidarContenidoEnLosAtributos(titulo: string, anio: number, generoId: number, numerodepaginas: number, autorId: number): boolean {
    if (titulo != null && titulo != undefined && titulo != "" &&
        anio != null && anio != undefined && generoId != null && generoId != undefined &&
        numerodepaginas != null && numerodepaginas != undefined && autorId != null && autorId != undefined) {
      return true;
    } else {
      return false;
    }
  }

  public EncapsularPropiedades(libroId: number, titulo: string, anio: number, generoId: number, numerodepaginas: number, autorId: number) {
    this.Libro.LibroId_ = libroId;
    this.Libro.Titulo_ = titulo;
    this.Libro.Anio_ = anio;
    this.Libro.GeneroId_ = generoId;
    this.Libro.Numerodepaginas_ = numerodepaginas;
    this.Libro.AutorId_ = autorId;
  }

  private LimpiarInformacion() {
    this.Titulo = "";
    $("#Anio").val("");
    $("#genero").val("");
    $("#Numerodepaginas").val("");
    $("#autor").val("");
  }

  private PrevenirPaste() {
    var titulo = <HTMLElement>document.getElementById('Titulo');
    var numerodepaginas = <HTMLElement>document.getElementById('Numerodepaginas');
    titulo.onpaste = function (e) { e.preventDefault(); }
    numerodepaginas.onpaste = function (e) { e.preventDefault(); }
  }

  public ValidarCaracteresAlfabeticosYMaxLength(event: KeyboardEvent, id: string, length: number) {
    this.Singletonvalidaciones.ValidarCaracteresAlfabeticosYMaxLength(event, id, length);
  }

  public ValidarCaracteresNumericosYMaxLength(event: KeyboardEvent, id: string, length: number){
    this.Singletonvalidaciones.ValidarCaracteresNumericosYMaxLength(id, event, length);
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