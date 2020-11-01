import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImportComponent } from './import.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: ImportComponent,
            },
        ]),
        FormsModule,
    ],
    declarations: [ImportComponent],
    providers: [],
})
export class ImportModule {}
