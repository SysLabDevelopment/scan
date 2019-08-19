import * as tslib_1 from "tslib";
import { Component, ViewChild, Renderer } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { ScanService } from '../scan.service';
import { Router } from '@angular/router';
let DrawPage = class DrawPage {
    constructor(platform, router, renderer, orientation, scan) {
        this.platform = platform;
        this.router = router;
        this.renderer = renderer;
        this.orientation = orientation;
        this.scan = scan;
        this.currentColour = '#4e56d2';
        this.brushSize = 20;
        this.save_process = false;
        this.orientation.lock('landscape');
    }
    ngOnInit() { }
    ngAfterViewInit() {
        this.canvasElement = this.canvas.nativeElement;
        this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
        this.renderer.setElementAttribute(this.canvasElement, 'height', this.platform.height() + '');
    }
    handleStart(ev) {
        this.lastX = ev.touches[0].pageX;
        this.lastY = ev.touches[0].pageY;
    }
    clearCanvas() {
        let ctx = this.canvasElement.getContext('2d');
        ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }
    handleMove(ev) {
        let ctx = this.canvasElement.getContext('2d');
        let currentX = ev.touches[0].pageX;
        let currentY = ev.touches[0].pageY;
        ctx.beginPath();
        ctx.lineJoin = "round";
        ctx.moveTo(this.lastX, this.lastY);
        ctx.lineTo(currentX, currentY);
        ctx.closePath();
        ctx.strokeStyle = this.currentColour;
        ctx.lineWidth = this.brushSize;
        ctx.stroke();
        this.lastX = currentX;
        this.lastY = currentY;
    }
    saveImage() {
        console.log('save_image_call');
        var code = this.canvasElement.toDataURL();
        code = code.split(',')[1];
        var id = localStorage.getItem('id');
        //const data = new HttpParams().set('cId', id).set('sum', '100500' ).set('base64', code);
        const options = {};
        //var data = {'cId': id, 'sum' : '100500' , 'base64' : code} ;
        let courier_info;
        for (let i = 0; i < this.scan.courier_info.length; i++) {
            if (this.scan.courier_info[i].code == this.scan.active_code) {
                courier_info = this.scan.courier_info[i];
            }
        }
        var data = 'sum=' + courier_info.profit + '&cId=' + id + '&base64=' + code + '&code=' + this.scan.active_code;
        var self = this;
        var url = "https://mok.flexcore.ru/order/someFoto/";
        this.scan.sendPost(url, data).subscribe((res) => {
            if (res.success == "true") {
                self.successSend();
            }
        });
    }
    successSend() {
        console.log('image_sent');
        this.scan.showMessage(1);
        localStorage.removeItem('id');
        this.router.navigate(['home']);
    }
};
tslib_1.__decorate([
    ViewChild('myCanvas', { static: true }),
    tslib_1.__metadata("design:type", Object)
], DrawPage.prototype, "canvas", void 0);
DrawPage = tslib_1.__decorate([
    Component({
        selector: 'app-draw',
        templateUrl: './draw.page.html',
        styleUrls: ['./draw.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [Platform, Router, Renderer, ScreenOrientation, ScanService])
], DrawPage);
export { DrawPage };
//# sourceMappingURL=draw.page.js.map