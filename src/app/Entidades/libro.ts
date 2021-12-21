import { Autor } from "./autor";
import { Genero } from "./genero";

export class Libro {
    private static Instancia: Libro;
    private LibroId!: number;
    private Titulo!: string;
    private Anio!: number;
    private GeneroId!: number;
    private Numerodepaginas!: number;
    private AutorId!: number;
    private Autor!: Autor;
    private Genero!: Genero;

    public static ObtenerInstancia(): Libro {
        if (this.Instancia === null || this.Instancia === undefined) {
            this.Instancia = new Libro;
        }
        return this.Instancia;
    }

    set LibroId_(val: number) {
        this.LibroId = val;
    }
    get LibroId_(): number {
        return this.LibroId;
    }

    set Titulo_(val: string) {
        if (val.length > 2 && val.length <= 50) {
            this.Titulo = val;
        } else {
            this.Titulo = "";
        }
    }
    get Titulo_(): string {
        return this.Titulo;
    }

    set Anio_(val: number) {
        this.Anio = val;
    }
    get Anio_(): number {
        return this.Anio;
    }

    set GeneroId_(val: number) {
        this.GeneroId = val;
    }
    get GeneroId_(): number {
        return this.GeneroId;
    }

    set Numerodepaginas_(val: number) {
        this.Numerodepaginas = val;
    }
    get Numerodepaginas_(): number {
        return this.Numerodepaginas;
    }

    set AutorId_(val: number) {
        this.AutorId = val;
    }
    get AutorId_(): number {
        return this.AutorId;
    }

    set Autor_(val: Autor) {
        this.Autor = val;
    }
    get Autor_(): Autor {
        return this.Autor;
    }

    set Genero_(val: Genero) {
        this.Genero = val;
    }
    get Genero_(): Genero {
        return this.Genero;
    }

    public ValidarPropiedades(): string {
        if (this.Titulo != "")
            if (this.GeneroId > 0)
                if (this.Numerodepaginas > 0)
                    if (this.AutorId > 0)
                        return "success";
                    else
                        return "Debe seleccionar un Autor válido para el libro.";
                else
                    return "El número de páginas debe ser un entero positivo mayor a 0.";
            else
                return "Debe seleccionar un Género válido para el libro.";
        else
            return "Verifique la información del título, éste se comprende entre 3 y 50 caracteres alfabéticos.";
    }
}