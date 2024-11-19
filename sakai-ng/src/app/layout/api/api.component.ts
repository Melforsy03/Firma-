import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MyService } from 'src/app/servicios/servcios-api.service';
import { FileUploadModule } from 'primeng/fileupload'; // Importa el módulo de FileUpload
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgClass } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PasswordModule } from 'primeng/password';
import { ToolbarModule } from 'primeng/toolbar';
import {  CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-api',
  standalone: true,
  imports: [
    FileUploadModule ,
    FormsModule , 
    ReactiveFormsModule , 
    ConfirmDialogModule ,
    NgClass ,
    TableModule,
    PasswordModule,
    ToolbarModule,
    CardModule , 
    ButtonModule, 
    HttpClientModule,
  ],
  providers :[MessageService , ConfirmationService],
  templateUrl: './api.component.html',
  styleUrl: './api.component.scss'
})
export class ApiComponent implements OnInit{

  formulario = {
    PASSWORD: '',
    GIVENAME: '',
    SURNAME: '',
    DNI: '' 
  };
  uploadedFiles: any[] = []; // Para almacenar los archivos seleccionados
  documentos: any[] = [];
  constructor(
    private myService: MyService ,  // Inyectamos el servicio
    private messageService: MessageService,  // Para mostrar mensajes
    private confirmationService: ConfirmationService,

  ) {}
  
  isFormularioCompleto(): boolean {
    return this.formulario.GIVENAME.trim() !== '' && 
           this.formulario.SURNAME.trim() !== '' && 
           this.formulario.DNI.trim() !== '' && 
           this.formulario.PASSWORD.trim() !== '';
  }
  
  ngOnInit(): void {
    this.documentos = []; 
    // Inicializa la lista de documentos como vacía
  }
  
  onFileSelect(event: any) {
    this.uploadedFiles.push(...event.files);
  }
  
  isFormularioValido() {
    return this.formulario.GIVENAME && this.formulario.SURNAME && this.formulario.DNI && this.formulario.PASSWORD;
  }
  
  onBeforeUpload() {
    if (this.isFormularioValido() && this.uploadedFiles.length > 0) {
      try {
        // Envía el formulario
        const formResponse = this.myService.submitFormulario(this.formulario).toPromise();
        console.log('Formulario enviado:', formResponse);
  
        // Envía los documentos
        const documentResponse =  this.myService.subirDocumentos(this.uploadedFiles).toPromise();
        console.log('Documentos enviados:', documentResponse);
  
        // Asumiendo que documentResponse es un array con los documentos enviados, o un objeto con la info
        // Actualiza la lista de documentos en la interfaz con los nombres de los archivos subidos
        if (Array.isArray(documentResponse)) {
          const documentData = documentResponse.map(item => ({
            name: item.name,
            id: item.id,  // Ajusta según la respuesta
          }));
          this.documentos = documentData;  // Actualiza la lista de documentos
        }
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Formulario y documentos enviados correctamente.',
        });
      } catch (error) {
        console.error('Error al enviar formulario y documentos:', error);
  
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Hubo un problema al enviar los datos.',
        });
      }
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atención',
        detail: 'Complete el formulario y seleccione documentos antes de enviar.',
      });
    }
  }
  
  downloadFile(format: string, id: string) {
    this.myService.downloadFile(id, format).subscribe(
      (blob) => {
        // Aquí puedes manejar el blob, por ejemplo, guardarlo como archivo
        this.saveFile(blob, 'documento-descargado.' + format);
      },
      (error) => {
        console.error('Error al descargar el documento', error);
      }
    );
  }
  
  private saveFile(data: Blob, fileName: string) {
    const blob = new Blob([data], { type: data.type });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(link.href); // Liberar recursos
  }
  
  }
  

