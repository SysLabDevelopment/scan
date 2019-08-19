import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScanService } from '../scan.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  public ps_input:any;
  private pas:String = "postsvs769";
  constructor(private router:Router, private scan:ScanService) { }

  ngOnInit() {
  }

  public changePas(){
    if (String(this.ps_input) == this.pas){
      this.router.navigate(['home']);
    }
  }

}
