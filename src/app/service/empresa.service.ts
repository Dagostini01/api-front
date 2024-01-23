import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from '../model/Empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private url: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  selecionar(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${this.url}/empresas`);
  }

  cadastrar(obj:Empresa):Observable<Empresa>{
    return this.http.post<Empresa>(`${this.url}/empresas`, obj);
  }

  editar(obj:Empresa):Observable<Empresa>{
    return this.http.put<Empresa>(`${this.url}/empresas`, obj);
  }

  remover(id:number):Observable<void>{
    return this.http.delete<void>(`${this.url}/empresas/${id}`);
  }

}
