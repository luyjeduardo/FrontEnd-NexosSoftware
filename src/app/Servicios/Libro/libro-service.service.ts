import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from 'src/app/Entidades/libro';
import { Servidorapirest } from 'src/app/Entidades/servidor';

@Injectable({
  providedIn: 'root'
})
export class LibroServiceService {

  private Servidorapirest = Servidorapirest.ObtenerInstancia();
  private Token!: string;
  private Credenciales = {
    Usuario: "pruebaNexosSoftware",
    Contrasenia: "1234567890" 
  }

  constructor(private http: HttpClient) { }

  public RegistrarLibro(libro: Libro) : Observable<Object> { 
    //await this.GetToken();
    // await this.xxx();
    // await (await this.GetObjetoToken()).toPromise()
    //   .then(
    //     (response: any) => {
    //       this.Token = response["token"];
    //     }
    //   );
    // const headers = new Headers({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${this.Token}`
    // });
    return this.http.post(`${this.Servidorapirest.Urlapirestfull}/Libro/`, libro); 
  }

  public RecibirLibros() : Observable<Object> { 
    return this.http.get(`${this.Servidorapirest.Urlapirestfull}/Libro/`); 
  }

  public ModificarLibro(id: number, libro: Libro) : Observable<Object> {
    return this.http.put(`${this.Servidorapirest.Urlapirestfull}/Libro/` + id, libro); 
  }

  private async GetToken() {
    await (await this.GetObjetoToken()).toPromise()
      .then(
        (response: any) => {
          this.Token = response["token"];
        }
      );
  }

  private GetObjetoToken(): Observable<Object> { 
    return this.http.post(`${this.Servidorapirest.Urlapirestfull}/Token/`, this.Credenciales);
  }

}