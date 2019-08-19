import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';
import { ScanService } from '../scan.service';
let HomePage = class HomePage {
    constructor(bScan, router, scan) {
        this.bScan = bScan;
        this.router = router;
        this.scan = scan;
        localStorage.setItem('id', '1757');
    }
    scanData() {
        return this.bScan.scan();
    }
    scanAuth() {
        var self = this;
        this.scanData().then((data) => {
            console.log('data_scan', data);
            console.log('data_slice', data.text.slice(-4));
            console.log('id', Number(data.text.slice(-4)));
            var id = Number(data.text.slice(-4));
            //var id = '1757';
            if (!id) {
                this.authError(1);
                return false;
            }
            id = String(id);
            localStorage.setItem('id', id);
            var self = this;
            this.scan.courierInfo(id).subscribe((res) => {
                if (res != null) {
                    self.scan.courier_info = res;
                    self.scan.id = id;
                    self.successAuth();
                }
            });
        });
    }
    successAuth() {
        console.log('auth_request_true');
        this.router.navigate(['info']);
    }
    authError(err) {
    }
};
HomePage = tslib_1.__decorate([
    Component({
        selector: 'app-home',
        templateUrl: 'home.page.html',
        styleUrls: ['home.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [BarcodeScanner, Router, ScanService])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.page.js.map