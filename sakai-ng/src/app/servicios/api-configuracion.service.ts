import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiConfiguracionService {
  private useGraphQL: boolean = false; // Por defecto, usar REST (false)
  private ApiUrl = 'http://localhost:3000/api'; 
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
