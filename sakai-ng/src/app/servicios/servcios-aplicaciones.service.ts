import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AplicacionesService {
  private restApiUrl = 'http://localhost:3000/aplicaciones'; // URL de la API REST
  private graphqlApiUrl = 'https://api.example.com/graphql'; // URL de la API GraphQL

  constructor(private http: HttpClient) {}

  // Obtener todas las aplicaciones (REST)
  getAplicacionesRest(): Observable<any[]> {
    return this.http.get<any[]>(this.restApiUrl);
  }

  // Obtener todas las aplicaciones (GraphQL)
  getAplicacionesGraphQL(): Observable<any> {
    const query = `
      query {
        aplicaciones {
          id
          name
          description
        }
      }
    `;
    return this.http.post(this.graphqlApiUrl, { query });
  }

  // Añadir nueva aplicación (REST)
  addAplicacionRest(aplicacion: any): Observable<any> {
    return this.http.post(this.restApiUrl, aplicacion);
  }

  // Añadir nueva aplicación (GraphQL)
  addAplicacionGraphQL(aplicacion: any): Observable<any> {
    const mutation = `
      mutation {
        addAplicacion(input: { name: "${aplicacion.name}", description: "${aplicacion.description}" }) {
          id
          name
          description
        }
      }
    `;
    return this.http.post(this.graphqlApiUrl, { query: mutation });
  }

  // Modificar aplicación (REST)
  updateAplicacionRest(aplicacion: any): Observable<any> {
    return this.http.put(`${this.restApiUrl}/${aplicacion.id}`, aplicacion);
  }

  // Modificar aplicación (GraphQL)
  updateAplicacionGraphQL(aplicacion: any): Observable<any> {
    const mutation = `
      mutation {
        updateAplicacion(id: ${aplicacion.id}, input: { name: "${aplicacion.name}", description: "${aplicacion.description}" }) {
          id
          name
          description
        }
      }
    `;
    return this.http.post(this.graphqlApiUrl, { query: mutation });
  }

  // Eliminar aplicación (REST)
  deleteAplicacionRest(id: number): Observable<any> {
    return this.http.delete(`${this.restApiUrl}/${id}`);
  }

  // Eliminar aplicación (GraphQL)
  deleteAplicacionGraphQL(id: number): Observable<any> {
    const mutation = `
      mutation {
        deleteAplicacion(id: ${id}) {
          id
        }
      }
    `;
    return this.http.post(this.graphqlApiUrl, { query: mutation });
  }
}
