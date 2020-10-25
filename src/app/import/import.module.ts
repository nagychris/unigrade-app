import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ImportComponent } from "./import.component";
import { FormsModule } from "@angular/forms";
import { NavbarComponent } from '../navbar/navbar.component';

@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		RouterModule.forChild([
			{
				path: "",
				component: ImportComponent,
			},
		]),
		FormsModule,
	],
	declarations: [ImportComponent, NavbarComponent],
	providers: [],
})
export class ImportModule {}
