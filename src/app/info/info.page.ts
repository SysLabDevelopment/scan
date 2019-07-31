import { Component, OnInit } from '@angular/core';
import { ScanService } from '../scan.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  public tbls:any;
  
  constructor(private scan:ScanService, private router:Router) {
      console.log(this.scan.courier_info);
      this.tbls = this.scan.courier_info;
   }

   public toDraw(code){
     this.scan.active_code = code;
     this.router.navigate(['draw']);
   }

  ngOnInit() {
  }

}
