import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomePage } from "./home.page";
import { NgxCsvParserModule } from "ngx-csv-parser";

import { HomePageRoutingModule } from "./home-routing.module";
import { GradeCardComponent } from "../grade-card/grade-card.component";
import { NavbarComponent } from "../navbar/navbar.component";

@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		HomePageRoutingModule,
		ReactiveFormsModule,
		NgxCsvParserModule,
	],
	declarations: [HomePage, GradeCardComponent, NavbarComponent],
	providers: [],
})
export class HomePageModule {}
