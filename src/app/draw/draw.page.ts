import { Component,OnInit, ViewChild, Renderer} from '@angular/core';
import { Platform } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { ScanService } from '../scan.service';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
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

  currentColour: string = '#4e56d2';
  brushSize: number = 20;

  public save_process:boolean = false;
  constructor(private platform:Platform,public router:Router, public renderer: Renderer, private orientation:ScreenOrientation, private scan:ScanService){
    this.orientation.lock('landscape');
  }
  ngAfterViewInit(){

    this.canvasElement = this.canvas.nativeElement;

    this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
    this.renderer.setElementAttribute(this.canvasElement, 'height', this.platform.height() + '');

}

handleStart(ev){

    this.lastX = ev.touches[0].pageX;
    this.lastY = ev.touches[0].pageY;
}

clearCanvas(){
  let ctx = this.canvasElement.getContext('2d');
  ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

}

handleMove(ev){

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
  console.log('save_image_call');
  var code = this.canvasElement.toDataURL();
  code = code.split(',')[1];
  var id = localStorage.getItem('id');
   //const data = new HttpParams().set('cId', id).set('sum', '100500' ).set('base64', code);
   const options = {};
  //var data = {'cId': id, 'sum' : '100500' , 'base64' : code} ;
  var data = 'sum='+ this.scan.courier_info.profit + '&cId='+ id + '&base64=' + code;
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
  this.scan.showMessage(1);
  this.router.navigate(['home']);
}

}
