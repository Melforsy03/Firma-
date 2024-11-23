import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiConfiguracionService {
  private useGraphQL: boolean = true; // Por defecto, usar REST (false)
  private ApiUrl = 'http://172.18.213.33:3000'; 
  constructor() {}

  // Obtener el tipo de API que se está usando (true para GraphQL, false para REST)
  getApiType(): boolean {
    return this.useGraphQL;
  }
  getApiUrl () :string 
  {
    return this.ApiUrl;
  }
  // Establecer el tipo de API que se usará (true para GraphQL, false para REST)
  setApiType(useGraphQL: boolean): void {
    this.useGraphQL = useGraphQL;
  }
}
