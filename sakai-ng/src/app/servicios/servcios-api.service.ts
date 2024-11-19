import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,map} from 'rxjs';
import { Apollo  } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { ApiConfiguracionService } from './api-configuracion.service';

const downloadDocumentQuery = gql`
  query downloadDocument($id: String!, $format: String!) {
    downloadDocument(id: $id, format: $format) {
      url
      name
    }
  }
`;
const submitFormularioMutation = gql`
  mutation submitFormulario($formData: JSON!) {
    submitFormulario(input: $formData) {
      success
      message
    }
  }
`;
interface DownloadDocumentResponse {
  downloadDocument: {
    url: string;
    name: string;
  }
  };

@Injectable({
  providedIn: 'root'
})

export class MyService {
  
  constructor(private http: HttpClient , private apollo: Apollo , private configService: ApiConfiguracionService) {}
 
 // Método para enviar el formulario
 submitFormulario(formulario: any): Observable<any> {
  if (this.configService.getApiType()) {
    const mutation = gql`
      mutation submitFormulario($formData: JSON!) {
        submitFormulario(input: $formData) {
          success
          message
        }
      }
    `;
    return this.apollo.mutate({
      mutation,
      variables: { formData: formulario },
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
        useMultipart: true,
      },
    });
  } else {
    const formData = new FormData();
    documentos.forEach((file, index) => {
      formData.append(`file_${index}`, file, file.name);
    });

    return this.http.post(`${this.configService.getApiUrl}/uploadDocuments`, formData);
  }
}

downloadFile(id: string, format: string): Observable<Blob> {
  // Verifica qué API estamos usando, GraphQL o REST
  if (this.configService.getApiType()) {
    // Si estamos usando GraphQL
    return this.downloadGraphql(id, format);
  } else {
    // Si estamos usando REST
    return this.downloadDocument(id, format);
  }
}

downloadGraphql(id: string, format: string): Observable<Blob> {
  const downloadDocumentQuery = gql`
    query downloadDocument($id: String!, $format: String!) {
      downloadDocument(id: $id, format: $format) {
        file
        fileType
      }
    }
  `;

  return this.apollo
    .query<{ downloadDocument: { file: string; fileType: string } }>({
      query: downloadDocumentQuery,
      variables: { id, format },
    })
    .pipe(
      map((result) => {
        const { file, fileType } = result.data.downloadDocument;
        const binary = atob(file); // Decodifica base64 a binario
        const array = [];
        for (let i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], { type: fileType });
      })
    );
}
downloadDocument(format: string, id: string): Observable<Blob> {
  return this.http.get(`${this.configService.getApiUrl}/download/${id}`, { responseType: 'blob' });
}

}

