import { Component, OnInit } from '@angular/core';
import { ScanService } from '../scan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  public info:any;
  
  constructor(private scan:ScanService, private router:Router) {
      console.log(this.scan.courier_info);
      this.info = this.scan.courier_info;
   }

   public toDraw(){
     this.router.navigate(['draw']);
   }

  ngOnInit() {
  }

}
