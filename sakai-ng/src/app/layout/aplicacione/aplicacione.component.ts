import { Component ,OnInit} from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms'; // Para ngModel
import { AplicacionesService } from 'src/app/servicios/servcios-aplicaciones.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// PrimeNG Modules
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-aplicaciones',
  standalone: true,
  imports: [
    PanelModule,
    ButtonModule,
    CardModule,
    ConfirmDialogModule,
    RadioButtonModule, 
    ConfirmDialogModule,
    TableModule,
    DialogModule,
    OverlayPanelModule,
    FormsModule, 
    InputTextModule,
    CommonModule,
   
  ],
  templateUrl: './aplicacione.component.html',
  styleUrl: './aplicacione.component.scss',
  providers: [ConfirmationService, MessageService ]
})
export class AplicacioneComponent implements OnInit{
  aplicaciones: any[] = [

  ];
  selectedApplication: any = {};
  displayDialog: boolean = false;
  dialogHeader: string = '';
  selectedFilter: number = 1;
  useGraphQL: boolean = false; // Cambiar esto a true para usar GraphQL

  constructor(
    private aplicacionesService: AplicacionesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  
  ) {
   
  }

  ngOnInit(): void {
    this.loadAplicaciones(); // Cargar aplicaciones desde la API
    console.log('AplicacionesComponent inicializado');
  }

  loadAplicaciones() {
    if (this.useGraphQL) {
      this.aplicacionesService.getAplicacionesGraphQL().subscribe(
        response => this.aplicaciones = response.data.aplicaciones,
        error => console.error('Error loading aplicaciones', error)
      );
    } else {
      this.aplicacionesService.getAplicacionesRest().subscribe(
        data => this.aplicaciones = data,
        error => console.error('Error loading aplicaciones', error)
      );
    }
  }

  onAddApplication() {
    this.selectedApplication = {};
    this.dialogHeader = 'Añadir Nueva Aplicación';
    this.displayDialog = true;
  }

  onModifyApplication(aplicacion: any) {
    this.selectedApplication = { ...aplicacion };
    this.dialogHeader = 'Modificar Aplicación';
    this.displayDialog = true;
  }

  saveApplication() {
    if (this.selectedApplication.id) {
      // Modificar aplicación existente
      if (this.useGraphQL) {
        this.aplicacionesService.updateAplicacionGraphQL(this.selectedApplication).subscribe(() => {
          const index = this.aplicaciones.findIndex(app => app.id === this.selectedApplication.id);
          if (index !== -1) {
            this.aplicaciones[index] = { ...this.selectedApplication };
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Aplicación modificada correctamente' });
          }
        }, error => console.error('Error updating application', error));
      } else {
        this.aplicacionesService.updateAplicacionRest(this.selectedApplication).subscribe(() => {
          const index = this.aplicaciones.findIndex(app => app.id === this.selectedApplication.id);
          if (index !== -1) {
            this.aplicaciones[index] = { ...this.selectedApplication };
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Aplicación modificada correctamente' });
          }
        }, error => console.error('Error updating application', error));
      }
      
    } else {
      // Añadir nueva aplicación
      if (this.useGraphQL) {
        this.aplicacionesService.addAplicacionGraphQL(this.selectedApplication).subscribe(newApp => {
          this.aplicaciones.push(newApp.data.addAplicacion); // Ajusta según la respuesta de tu API
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Aplicación añadida correctamente' });
        }, error => console.error('Error adding application', error));
      } else {
        this.aplicacionesService.addAplicacionRest(this.selectedApplication).subscribe(newApp => {
          this.aplicaciones.push(newApp);
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Aplicación añadida correctamente' });
        }, error => console.error('Error adding application', error));
      }
      
    }
    
    this.closeDialog();
  }

  confirmDeleteApplication(aplicacion: any) {
    this.confirmationService.confirm({
      message: `¿Está seguro de que desea eliminar la aplicación "${aplicacion.name}"?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Eliminar aplicación
        if (this.useGraphQL) {
          this.aplicacionesService.deleteAplicacionGraphQL(aplicacion.id).subscribe(() => {
            this.aplicaciones = this.aplicaciones.filter(app => app.id !== aplicacion.id);
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Aplicación eliminada correctamente' });
          }, error => console.error('Error deleting application', error));
        } else {
          this.aplicacionesService.deleteAplicacionRest(aplicacion.id).subscribe(() => {
            this.aplicaciones = this.aplicaciones.filter(app => app.id !== aplicacion.id);
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Aplicación eliminada correctamente' });
          }, error => console.error('Error deleting application', error));
        }
      },
    });
  }

  closeDialog() {
    this.displayDialog = false;
  }

}
