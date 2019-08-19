import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DrawPage } from './draw.page';
const routes = [
    {
        path: '',
        component: DrawPage
    }
];
let DrawPageModule = class DrawPageModule {
};
DrawPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [DrawPage]
    })
], DrawPageModule);
export { DrawPageModule };
//# sourceMappingURL=draw.module.js.map