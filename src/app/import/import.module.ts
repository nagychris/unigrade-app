import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {ImportComponent} from "./import.component";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: ImportComponent
            },
        ])
    ],
    declarations: [
        ImportComponent
    ],
    providers: []
})
export class ImportModule {
}
