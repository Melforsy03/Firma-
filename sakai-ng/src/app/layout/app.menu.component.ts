import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Menu',
                items: [
                    { label: 'Menu', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Gestiones',
                items: [
                    { label: 'Gestionar-api', icon: 'pi pi-fw pi-bookmark', routerLink: ['/app-api'] },
                    { label: 'Gestionar-aplicaciones', icon: 'pi pi-fw pi-bookmark', routerLink: ['/gestionar-aplicaciones'] },
                    
                ]
            }
        ]

     }
}
