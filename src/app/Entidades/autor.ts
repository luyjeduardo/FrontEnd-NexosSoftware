export class Autor {
    private static Instancia: Autor;
    private AutorId!: number;
    private Nombrescompletos!: string;
    private Fechadenacimiento!: Date;
    private Ciudaddeprocedencia!: string;
    private Correoelectronico!: string;

    public static ObtenerInstancia(): Autor {
        if (this.Instancia === null || this.Instancia === undefined) {
            this.Instancia = new Autor;
        }
        return this.Instancia;
    }

    set AutorId_(val: number) {
        this.AutorId = val;
    }
    get AutorId_(): number {
        return this.AutorId;
    }

    set Nombrescompletos_(val: string) {
        if (val.length > 4 && val.length <= 50) {
            this.Nombrescompletos = val;
        } else {
            this.Nombrescompletos = "";
        }
    }
    get Nombrescompletos_(): string {
        return this.Nombrescompletos;
    }

    set Fechadenacimiento_(val: Date) {
        this.Fechadenacimiento = val;
    }
    get Fechadenacimiento_(): Date {
        return this.Fechadenacimiento;
    }

    set Ciudaddeprocedencia_(val: string) {
        if (val.length > 1 && val.length <= 35) {
            this.Ciudaddeprocedencia = val;
        } else {
            this.Ciudaddeprocedencia = "";
        }
    }
    get Ciudaddeprocedencia_(): string {
        return this.Ciudaddeprocedencia;
    }

    set Correoelectronico_(val: string) {
        if (val.length > 5 && val.length <= 50) {
            this.Correoelectronico = val;
        } else {
            this.Correoelectronico = "";
        }
    }
    get Correoelectronico_(): string {
        return this.Correoelectronico;
    }

    public ValidarPropiedades(): string {
        if (this.Nombrescompletos != "")
            if (this.Ciudaddeprocedencia != "")
                if (this.Correoelectronico != "")
                    return "success";
                else
                    return "Verifique la información del correo, éste se comprende entre 6 y 50 caracteres.";
            else
                return "Verifique la información de la ciudad de procedencia, ésta se comprende entre 2 y 35 caracteres alfabéticos.";
        else
            return "Verifique la información de los nombres completos, éste comprende entre 5 y 50 caracteres alfabéticos.";
    }
}
