import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MyService } from 'src/app/servicios/servcios-api.service';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { PasswordModule } from 'primeng/password'
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-api',
  standalone: true,
  imports: [
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    PasswordModule, 
    CardModule, 
    CommonModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {
  
    formulario = {
      name: '',         
      username: '',    
      password: '',    
      directory: '',    
      applicationId: ''
    };
    documentos: any[] = [];
    uploadedFiles: File[] = [];
  
    constructor(
      private myService: MyService,
      private messageService: MessageService,
    ) {}
  
    ngOnInit(): void {}
  
    onFileSelect(event: any) {
      this.uploadedFiles.push(...event.files);
    }
  
    isFormularioValido(): boolean {
      return this.formulario.name !== '' && 
             this.formulario.username !== '' && 
             this.formulario.password !== '' && 
             this.formulario.applicationId !== '';
    }
  
    BeforeUpload() {
      if (this.isFormularioValido() && this.uploadedFiles.length > 0) {
        const formData = new FormData();
        
        // Agrega los datos del formulario al objeto FormData
        Object.keys(this.formulario).forEach(key => {
          formData.append(key, this.formulario[key]);
        });

        // Envía ambas solicitudes juntas usando forkJoin
        forkJoin({
          formResponse: this.myService.submitFormulario(formData), // Enviar el formulario
          documentResponse: this.myService.subirDocumentos(this.uploadedFiles) // Subir documentos
        }).subscribe({
          next: responses => {
            const formResponse = responses.formResponse;
            const documentResponse = responses.documentResponse;

            console.log('Formulario enviado:', formResponse);
            console.log('Documentos enviados:', documentResponse);

            // Muestra un mensaje de éxito
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Formulario y documentos enviados correctamente.',
            });
          },
          error: error => {
            console.error('Error al enviar formulario y documentos:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Hubo un problema al enviar los datos.',
            });
          }
        });
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Atención',
          detail: 'Complete el formulario y seleccione documentos antes de enviar.',
        });
      }
    }
  
    downloadFiles(docId: string) {
      const doc = this.documentos.find(d => d.id === docId);
      if (doc) {
        const { name, format, content } = doc;
    
        // Si el contenido es un Blob
        if (content instanceof Blob) {
          this.saveFile(content, `${name}-descargado.${format}`);
        } else if (typeof content === 'string') {
          // Si el contenido es una cadena base64
          const byteCharacters = atob(content);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: `application/${format}` });
          this.saveFile(blob, `${name}-descargado.${format}`);
        } else {
          console.error('Formato de contenido no soportado');
        }
      } else {
        console.warn('Documento no encontrado');
      }
    }
    private saveFile(data: Blob, fileName: string) {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(data);
      link.download = fileName;
      document.body.appendChild(link); // Necesario para Firefox
      link.click();
      document.body.removeChild(link); // Limpia el DOM
      window.URL.revokeObjectURL(link.href);
    }
    
}

