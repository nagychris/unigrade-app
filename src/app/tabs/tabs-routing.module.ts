import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
	{
		path: "tabs",
		component: TabsPage,
		children: [
			{
				path: "home",
				loadChildren: () =>
					import("../home/home.module").then((m) => m.HomePageModule),
			},
			{
				path: "create-edit",
				loadChildren: () =>
					import("../create-edit/create-edit.module").then(
						(m) => m.CreateEditModule
					),
			},
			{
				path: "import",
				loadChildren: () =>
					import("../import/import.module").then((m) => m.ImportModule),
			},
			{
				path: "",
				redirectTo: "/tabs/home",
				pathMatch: "full",
			},
		],
	},
	{
		path: "",
		redirectTo: "/tabs/home",
		pathMatch: "full",
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TabsRoutingModule {}
