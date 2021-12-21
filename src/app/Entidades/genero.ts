export class Genero {
    private static Instancia: Genero;
    private GeneroId!: number;
    private Nombre!: string;
    private Descripcion!: string;

    public static ObtenerInstancia(): Genero {
        if (this.Instancia === null || this.Instancia === undefined) {
            this.Instancia = new Genero;
        }
        return this.Instancia;
    }

    set GeneroId_(val: number) {
        this.GeneroId = val;
    }
    get GeneroId_(): number {
        return this.GeneroId;
    }

    set Nombre_(val: string) {
        if (val.length > 1 && val.length <= 25) {
            this.Nombre = val;
        } else {
            this.Nombre = "";
        }
    }
    get Nombre_(): string {
        return this.Nombre;
    }

    set Descripcion_(val: string) {
        if (val.length <= 50) {
            this.Descripcion = val;
        } else {
            this.Descripcion = "";
        }
    }
    get Descripcion_(): string {
        return this.Descripcion;
    }

    public ValidarPropiedades(): string {
        if (this.Nombre != "")
            if (this.Descripcion.length > 0)
                if (this.Descripcion.length <= 50)
                    return "success";
                else
                    return "La descripción del género es opcional, sin embargo, si desea dar una descripción, " +
                        "ésta no debe pasar de 50 caracteres.";
            else
                return "success";
        else
            return "Verifique el nombre del género, éste se comprende entre 2 y 25 caracteres..";
    }
}