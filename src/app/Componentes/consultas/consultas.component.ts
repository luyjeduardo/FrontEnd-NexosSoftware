import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Autor } from 'src/app/Entidades/autor';
import { Genero } from 'src/app/Entidades/genero';
import { Libro } from 'src/app/Entidades/libro';
import { AutorServiceService } from 'src/app/Servicios/Autor/autor-service.service';
import { GeneroServiceService } from 'src/app/Servicios/Genero/genero-service.service';
import { LibroServiceService } from 'src/app/Servicios/Libro/libro-service.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {

  public Consulta!: string;
  public Libros: Libro[] = [];
  public Librossoporte: Libro[] = [];
  public Generos: Genero[] = [];
  public Autores: Autor[] = [];
  public Libro = Libro.ObtenerInstancia();
  private Tipodeconsulta: string = "Numeros";

  constructor(private autorservices: AutorServiceService,
              private generoservices: GeneroServiceService,
              private libroservices: LibroServiceService,
              public serviciomodal: NgbModal) { }

  async ngOnInit(): Promise<void> {
    await this.CargarAutores();
    await this.CargarGeneros();
    this.CargarLibros();;
  }

  private async CargarAutores() {
    this.Autores = [];
    await (await this.autorservices.RecibirAutores())
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
            this.Autores.forEach(aut => {
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
            this.Librossoporte.push(libro);
          });
        }
      });
  }

  public MostrarTodo(libro: Libro, contenido: any){
    this.CargarInformacion(libro);
    this.serviciomodal.open(contenido, { size: 'lg' });
  }

  private CargarInformacion(libro: Libro){
    this.Libro = libro;
    console.log(this.Libro);
  }

  public PorAutor() {
    this.Consulta = "";
    this.Tipodeconsulta = "Autor";
  }

  public PorGenero() {
    this.Consulta = "";
    this.Tipodeconsulta = "Genero";
  }

  public PorTitulo() {
    this.Consulta = "";
    this.Tipodeconsulta = "Titulo";
  }

  public PorAnio() {
    this.Consulta = "";
    this.Tipodeconsulta = "Numeros";
  }

  public ValidarCaracteresYMaxLength(event: any, id: string) {
    this.Libros = [];
    if (this.Consulta != "" && this.Consulta != undefined && this.Consulta != null) {
      if (this.Tipodeconsulta === "Autor") {
        this.ConsultaPorAutor();
      } else if (this.Tipodeconsulta === "Genero") {
        this.ConsultaPorGenero();
      } else if (this.Tipodeconsulta === "Titulo") {
        this.ConsultaPorTitulo();
      } else if (this.Tipodeconsulta === "Numeros") {
        this.ConsultaPorAnio();
      }
    } else {
      this.Libros = [];
      this.Librossoporte = [];
      this.CargarLibros();
    }
  }

  private ConsultaPorAutor() {
    this.Librossoporte.forEach(libro => {
      if (this.Consulta === libro.Autor_.Nombrescompletos_.substring(0, this.Consulta.length)) {
        this.Libros.push(libro);
      }
    });
  }

  private ConsultaPorGenero() {
    this.Librossoporte.forEach(libro => {
      if (this.Consulta === libro.Genero_.Nombre_.substring(0, this.Consulta.length)) {
        this.Libros.push(libro);
      }
    });
  }

  private ConsultaPorTitulo() {
    this.Librossoporte.forEach(libro => {
      if (this.Consulta === libro.Titulo_.substring(0, this.Consulta.length)) {
        this.Libros.push(libro);
      }
    });
  }

  private ConsultaPorAnio() {
    this.Librossoporte.forEach(libro => {
      if (this.Consulta === libro.Anio_.toString().substring(0, this.Consulta.length)) {
        this.Libros.push(libro);
      }
    });
  }

}
