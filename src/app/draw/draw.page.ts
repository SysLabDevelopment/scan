import { Component,OnInit, ViewChild, Renderer} from '@angular/core';
import { Platform } from '@ionic/angular';
import { ScanService } from '../scan.service';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.page.html',
  styleUrls: ['./draw.page.scss'],
})
export class DrawPage implements OnInit {
  ngOnInit(){}

  @ViewChild('myCanvas',{static: true}) canvas: any;

  canvasElement: any;
  lastX: number;
  lastY: number;
  isClear:boolean = true;
  error_mes:boolean = false;
  currentColour: string = '#4e56d2';
  brushSize: number = 20;

  public save_process:boolean = false;
  constructor(private platform:Platform,public router:Router, public renderer: Renderer, private scan:ScanService, private orientation:ScreenOrientation){

  }
  ngAfterViewInit(){

    this.canvasElement = this.canvas.nativeElement;

    this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
    this.renderer.setElementAttribute(this.canvasElement, 'height', this.platform.height() + '');
    this.orientation.lock('landscape');  
}

handleStart(ev){

    this.lastX = ev.touches[0].pageX;
    this.lastY = ev.touches[0].pageY;
}

clearCanvas(){
  this.isClear = true;
  let ctx = this.canvasElement.getContext('2d');
  ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

}

handleMove(ev){
    this.isClear = false;
    this.error_mes = false;
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

public saveImage(){
  if (this.isClear){
    this.error_mes = true;
    return false;
  }
  console.log('save_image_call');
  var code = this.canvasElement.toDataURL();
  code = code.split(',')[1];
  var id = localStorage.getItem('id');
  let courier_info;

  for (let i = 0; i< this.scan.courier_info.length; i++){
    if (this.scan.courier_info[i].code == this.scan.active_code ){
      courier_info = this.scan.courier_info[i];
    }
  }

  var data = {'sum' : courier_info.calcedSum,
              'cId' : id,
              'code' : this.scan.active_code,
              'base64' : code }
  var self = this;
  var url = "https://mok.flexcore.ru/order/someFoto/";

  this.scan.sendPost(url, data).subscribe((res:any) => {
    if (res.success == "true"){
      self.successSend();
    }
  });
}

public successSend(){
  console.log('image_sent');
  var self = this;
  let id = localStorage.getItem('id');
  this.scan.initInfo(id).subscribe((resp) => {
    if (resp) {
      self.scan.showMessage(1);
      self.router.navigate(['info']);
    }
  });
}

}
