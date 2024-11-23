import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfiguracionService } from './api-configuracion.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class AplicacionesService {

  constructor(private http: HttpClient, private configService: ApiConfiguracionService, private apollo: Apollo) {}

  // Obtener todas las aplicaciones (GraphQL)
  getAplicacionesGraphQL(): Observable<any> {
    const query = gql`
      query {
        getAllApps {
          id
          name
          description
        }
      }
    `;
    return this.apollo.query({ query });
  }

  // Añadir nueva aplicación (GraphQL)
  addAplicacionGraphQL(aplicacion: any): Observable<any> {
    const mutation = gql`
      mutation createApp($newApp: ApplicationInput!) {
        createApp(newApp: $newApp) {
          id
          name
          description
        }
      }
    `;
    return this.apollo.mutate({
      mutation,
      variables: { newApp: aplicacion },
    });
  }

  // Modificar aplicación (GraphQL)
  updateAplicacionGraphQL(aplicacion: any): Observable<any> {
    const mutation = gql`
      mutation updateApp($idApp: ID!, $newProps: ApplicationInput!) {
        updateApp(idApp: $idApp, newProps: $newProps) {
          id
          name
          description
        }
      }
    `;
    return this.apollo.mutate({
      mutation,
      variables: { idApp: aplicacion.id, newProps: aplicacion },
    });
  }

  // Eliminar aplicación (GraphQL)
  deleteAplicacionGraphQL(id: string): Observable<any> {
    const mutation = gql`
      mutation deleteApp($id: ID!) {
        deleteApp(id: $id)
      }
    `;
    return this.apollo.mutate({
      mutation,
      variables: { id },
    });
  }
}

