import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ApiConfiguracionService } from './api-configuracion.service';


@Injectable({
  providedIn: 'root'
})
export class MyService {
  
  constructor(private http: HttpClient, private apollo: Apollo, private configService: ApiConfiguracionService) {}

  // Método para enviar el formulario
  submitFormulario(formulario: FormData): Observable<any> {
    if (this.configService.getApiType()) {
      const mutation = gql`
        mutation createUser($newUser: UserInput!) { 
          createUser(newUser: $newUser) {
            id
            name
            username
            directory
          }
        }
      `;
      return this.apollo.mutate({
        mutation,
        variables: { newUser: formulario }, // Cambiado a newUser según el esquema
        context: {
          useMultipart: true, // Asegúrate de habilitar multipart
        },
      });
    } else {
      return this.http.post(`${this.configService.getApiUrl}/submit`, formulario);
    }
  }

  // Método para subir documentos
  subirDocumentos(documentos: File[]): Observable<any> {
    if (this.configService.getApiType()) {
      const mutation = gql`
        mutation uploadDocuments($files: [Upload!]!) {
          uploadDocuments(files: $files) {
            success
            message
          }
        }
      `;

      return this.apollo.mutate({
        mutation,
        variables: { files: documentos }, 
        context: {
          useMultipart: true, // Asegúrate de habilitar multipart
        },
      });
    } else {
      const formData = new FormData();
      documentos.forEach((file) => {
        formData.append('documents', file);
      });

      return this.http.post(`${this.configService.getApiUrl}/uploadDocuments`, formData);
    }
  }

}
