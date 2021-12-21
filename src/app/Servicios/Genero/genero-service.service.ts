import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genero } from 'src/app/Entidades/genero';
import { Servidorapirest } from 'src/app/Entidades/servidor';

@Injectable({
  providedIn: 'root'
})
export class GeneroServiceService {

  private Servidorapirest = Servidorapirest.ObtenerInstancia();
  private Token!: string;
  private Credenciales = {
    Usuario: "pruebaNexosSoftware",
    Contrasenia: "1234567890" 
  }

  constructor(private http: HttpClient) { }

  public RegistrarGenero(genero: Genero) : Observable<Object> { 
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
    return this.http.post(`${this.Servidorapirest.Urlapirestfull}/Genero/`, genero); 
  }

  public RecibirGeneros() : Observable<Object> { 
    return this.http.get(`${this.Servidorapirest.Urlapirestfull}/Genero/`); 
  }

  public ModificarGenero(id: number, genero: Genero) : Observable<Object> {
    return this.http.put(`${this.Servidorapirest.Urlapirestfull}/Genero/` + id, genero); 
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
