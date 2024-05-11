import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class EstudianteServicio {
    constructor(private http: HttpClient) {}

    HEADERS = new HttpHeaders()
    .append("Content-Type", "application/json")
    .append("Prefer", "count=exact")
    .append("Prefer", "return=representation")
    .append("Prefer", "resolution=merge-duplicates");

    obtenerEstudiantes() : Observable<any>{
        return this.http.get<any>('http://localhost:8090/estudiante/list', {
            headers:
          new HttpHeaders(
            {
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
              'MyClientCert': '',        // This is empty
              'MyToken': ''              // This is empty
            }
          )
        });
    }

    

    crearEstudiantes(estudiante: any) : Observable<any>{

      return this.http.post('http://localhost:8090/estudiante/', estudiante, {responseType: 'text'});
    }

    editarEstudiantes(estudiante: any, idEstudiante: any) : Observable<any>{

      return this.http.put(`http://localhost:8090/estudiante/${idEstudiante}`, estudiante, {responseType: 'text'});
    }

    eliminar(idEstudiante: any): Observable<any> {
      return this.http.delete(`http://localhost:8090/estudiante/${idEstudiante}`, {responseType: 'text'});
    }
}