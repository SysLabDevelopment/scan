import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AlertController } from '@ionic/angular';
let ScanService = class ScanService {
    constructor(http, alert) {
        this.http = http;
        this.alert = alert;
        this.active_code = null;
    }
    sendPost(url, data) {
        console.log('SEND_POST_CALL', data);
        var host = "https://mok.flexcore.ru";
        const httpOptions = { headers: new HttpHeaders({ 'Content-type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*' }) };
        var self = this;
        var resp = new Subject();
        this.http.post(url, data, httpOptions).subscribe((data) => {
            console.log('RESPONSE_DATA', data);
            resp.next(data);
        }, (err) => {
            console.error('An error occurred:', err);
        });
        return resp;
    }
    showMessage(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            switch (msg) {
                case 1:
                    const alert = yield this.alert.create({
                        header: 'Отправка',
                        message: 'Данные успешно отправлены!',
                        buttons: ['OK']
                    });
                    yield alert.present();
                    break;
            }
        });
    }
    courierInfo(id) {
        var url = "https://terminal.vestovoy.ru/inOut/getKo_lvo.php";
        var data = "cId=" + id;
        return this.sendPost(url, data);
    }
};
ScanService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient, AlertController])
], ScanService);
export { ScanService };
//# sourceMappingURL=scan.service.js.map