import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { ApiComponent } from './layout/api/api.component';
import { AplicacioneComponent } from './layout/aplicacione/aplicacione.component';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
@NgModule({
    declarations: [AppComponent, NotfoundComponent ],
    imports: [AppRoutingModule, AppLayoutModule , ApiComponent , AplicacioneComponent],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService,
        {
            provide: Apollo,
            useFactory: () => {
              return new ApolloClient({
                link: createHttpLink({ uri: 'http://tu-endpoint-graphql.com/graphql' }), // Reemplaza con URI
                cache: new InMemoryCache(),
              });
            },
          },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
