import { Component, OnInit } from '@angular/core';
import { ScanService } from '../scan.service';
import { Router } from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  public tbls:any;
  public name:String;
  public scanCodes:any;

  constructor(private scan:ScanService, private router:Router, private orientation:ScreenOrientation) {
      console.log(this.scan.courier_info); 
      // this.name = this.scan.courier_info.shift().name;
      // this.scanCodes = this.scan.courier_info.shift().arrCodes;
      // this.tbls = this.scan.courier_info;
   }
   ngAfterViewInit(){
    this.orientation.lock('landscape');  
}

   public toDraw(code){

     if (this.scan.scanCodes.indexOf( code ) != -1) return false;
     this.scan.active_code = code;
     for (let i = 0; i < this.scan.tbls.length; i++){
       console.log('TBL_ITER', this.scan.tbls[i]);
       if (this.scan.tbls[i].code == code) {
         if (this.scan.tbls[i].calcedSum == 0){
          this.scan.active_code = null;  
          return false;
         }
         console.log('TBL_FIND',this.scan.tbls[i]);
        this.scan.active_row = this.scan.tbls[i];
        this.router.navigate(['draw']);
       }; 
     }
     
     
   }

  ngOnInit() {
  }

}
