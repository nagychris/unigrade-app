import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateEditComponent } from './create-edit.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: CreateEditComponent,
            },
            {
                path: ':id',
                component: CreateEditComponent,
            },
        ]),
    ],
    declarations: [CreateEditComponent],
    providers: [],
})
export class CreateEditModule {}
