import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { GradeCardComponent } from "../grade-card/grade-card.component";
import { CreateEditModalComponent } from "../create-edit-modal/create-edit-modal.component";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        Tab1PageRoutingModule,
        ReactiveFormsModule,
    ],
    declarations: [Tab1Page, GradeCardComponent, CreateEditModalComponent]
})
export class Tab1PageModule {}
