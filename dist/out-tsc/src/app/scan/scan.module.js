import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ScanPage } from './scan.page';
const routes = [
    {
        path: '',
        component: ScanPage
    }
];
let ScanPageModule = class ScanPageModule {
};
ScanPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [ScanPage]
    })
], ScanPageModule);
export { ScanPageModule };
//# sourceMappingURL=scan.module.js.map