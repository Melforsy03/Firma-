import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import extractFiles from 'extract-files/extractFiles.mjs'; // Importa extractFiles
import isExtractableFile from 'extract-files/isExtractableFile.mjs'; // Importa isExtractableFile

const uri = 'http://172.18.213.33:3000'; // URL del servidor GraphQL

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({
      uri,
      useMultipart: true, // Asegúrate de habilitar el uso de multipart
      extractFiles: (body) => extractFiles(body, isExtractableFile), // Configura extractFiles
    }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
