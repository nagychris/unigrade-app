import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Tab1Page} from './tab1.page';
import {NgxCsvParserModule} from 'ngx-csv-parser';

import {Tab1PageRoutingModule} from './tab1-routing.module';
import {GradeCardComponent} from "../grade-card/grade-card.component";
import {ImportComponent} from "../import/import.component";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        Tab1PageRoutingModule,
        ReactiveFormsModule,
        NgxCsvParserModule
    ],
    declarations: [
        Tab1Page,
        GradeCardComponent,
        ImportComponent
    ],
    providers: []
})
export class Tab1PageModule {
}
