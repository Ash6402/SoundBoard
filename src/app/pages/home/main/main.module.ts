import { NgModule } from "@angular/core";
import { MainComponent } from "./main.component";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { PlayButtonComponent } from "../../../shared/play-button.component";

@NgModule({
    declarations: [MainComponent],
    imports: [
        CommonModule,
        MatCardModule,
        PlayButtonComponent,
    ],
    exports: [
        MainComponent,
    ]
})

export class MainComponentModule{}