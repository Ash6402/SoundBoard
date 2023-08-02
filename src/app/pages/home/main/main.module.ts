import { NgModule } from "@angular/core";
import { MainComponent } from "./main.component";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";

@NgModule({
    declarations: [MainComponent],
    imports: [
        CommonModule,
        MatCardModule,
    ],
    exports: [
        MainComponent,
    ]
})

export class MainComponentModule{}