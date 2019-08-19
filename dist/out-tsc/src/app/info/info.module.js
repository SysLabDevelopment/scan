import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { IonicModule } from '@ionic/angular';
import { InfoPage } from './info.page';
const routes = [
    {
        path: '',
        component: InfoPage
    }
];
let InfoPageModule = class InfoPageModule {
};
InfoPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            ScrollingModule,
            RouterModule.forChild(routes)
        ],
        declarations: [InfoPage]
    })
], InfoPageModule);
export { InfoPageModule };
//# sourceMappingURL=info.module.js.map