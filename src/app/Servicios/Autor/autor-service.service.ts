import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autor } from 'src/app/Entidades/autor';
import { Servidorapirest } from 'src/app/Entidades/servidor';

@Injectable({
  providedIn: 'root'
})
export class AutorServiceService {

  private Servidorapirest = Servidorapirest.ObtenerInstancia();
  private Token!: string;
  private Credenciales = {
    Usuario: "pruebaNexosSoftware",
    Contrasenia: "1234567890" 
  }

  constructor(private http: HttpClient) { }

  public RegistrarAutor(autor: Autor) : Observable<Object> { 
    return this.http.post(`${this.Servidorapirest.Urlapirestfull}/Autor/`, autor); 
  }

  public async RecibirAutores() : Promise<Observable<Object>> { 
    return this.http.get(`${this.Servidorapirest.Urlapirestfull}/Autor/`); 
  }
  
  public ModificarAutor(id: number, autor: Autor) : Observable<Object> {
    return this.http.put(`${this.Servidorapirest.Urlapirestfull}/Autor/` + id, autor); 
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
