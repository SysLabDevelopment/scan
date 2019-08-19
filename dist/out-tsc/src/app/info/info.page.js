import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ScanService } from '../scan.service';
import { Router } from '@angular/router';
let InfoPage = class InfoPage {
    constructor(scan, router) {
        this.scan = scan;
        this.router = router;
        console.log(this.scan.courier_info);
        this.tbls = this.scan.courier_info;
    }
    toDraw(code) {
        this.scan.active_code = code;
        this.router.navigate(['draw']);
    }
    ngOnInit() {
    }
};
InfoPage = tslib_1.__decorate([
    Component({
        selector: 'app-info',
        templateUrl: './info.page.html',
        styleUrls: ['./info.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [ScanService, Router])
], InfoPage);
export { InfoPage };
//# sourceMappingURL=info.page.js.map