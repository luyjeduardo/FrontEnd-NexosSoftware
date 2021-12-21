export class Validaciones {

    private static _instancia: Validaciones;
    public static ObtenerInstancia() : Validaciones {
        if(this._instancia === null || this._instancia === undefined) {
            this._instancia = new Validaciones;
        }
        return this._instancia;
    }

    public ValidarContenidoEnLosAtributos(nombrescompletos: string, fechadenacimiento: Date, ciudaddeprocedencia: string, correoelectronico: string) : boolean {
        if(nombrescompletos !== undefined && nombrescompletos !== null && nombrescompletos !== "" &&
           fechadenacimiento !== undefined && fechadenacimiento !== null &&
           ciudaddeprocedencia !== undefined && ciudaddeprocedencia !== null && ciudaddeprocedencia !== "" &&
           correoelectronico !== undefined && correoelectronico !== null && correoelectronico !== ""){
          return true;
        } else {
          return false;
        }
    }

    public ValidarCaracteresNumericosYMaxLength(id: string, event: KeyboardEvent, length: number) {
        var cajadetexto = document.getElementById(id) as HTMLInputElement;
        const pattern = /[0-9]/;
        const inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {    
          event.preventDefault();
        } else if(cajadetexto.value.length >= length){
            event.preventDefault();
        }
    }

    public ValidarCaracteresAlfanumericosYMaxLength(id: string, event: KeyboardEvent, length: number) {
        var cajadetexto = document.getElementById(id) as HTMLInputElement;
        const pattern = /[.@0-9a-zA-Z_-]/;
        const inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {    
          event.preventDefault();
        } else if(cajadetexto.value.length >= length){
            event.preventDefault();
        }
    }
    
    public ValidarCaracteresAlfabeticosYMaxLength(event: KeyboardEvent, id: string, length: number) {
        var cajadetexto = document.getElementById(id) as HTMLInputElement;
        const pattern = /[a-zA-Z ]/;
        const inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {    
          event.preventDefault();
        } else if(cajadetexto.value.length >= length){
            event.preventDefault();
        }
    }

    public ValidarMaxLength(event: KeyboardEvent, id: string, length: number){
        var cajadetexto = document.getElementById(id) as HTMLInputElement;
        if(cajadetexto.value.length >= length)
            event.preventDefault();
    }
        
    public PrevenirPaste(){
        var nombrescompletos = <HTMLElement>document.getElementById('Nombrescompletos');
        var ciudaddeprocedencia = <HTMLElement>document.getElementById('Ciudaddeprocedencia');
        var correoelectronico = <HTMLElement>document.getElementById('Correoelectronico');
        nombrescompletos.onpaste = function(e) { e.preventDefault(); }
        ciudaddeprocedencia.onpaste = function(e) { e.preventDefault(); }
        correoelectronico.onpaste = function(e) { e.preventDefault(); }
    }

    public ValidarEmail(email: string) : boolean {
        var bandera = false;
        var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        bandera = regexp.test(email);
        return bandera;
    }

}
