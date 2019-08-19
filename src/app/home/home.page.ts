import { Component, ViewChild, Renderer} from '@angular/core';
import { Platform } from '@ionic/angular';
import { BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';
import { ScanService } from '../scan.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
constructor( private bScan:BarcodeScanner, private router:Router, private scan:ScanService){}

public scanData(){
  return this.bScan.scan();
}

public scanAuth(){
  var self = this;

  this.scanData().then((data) => {
    self.set_data(data);
  });
}

public set_data(data){
  console.log('data_scan', data);
  console.log('data_slice',data.text.slice(-4));
  console.log('id',Number(data.text.slice(-4)));
  var id:any = Number(data.text.slice(-4)); 


 //var id = '1757';
  if (!id){
    this.authError(1);
    return false
  }
  id = String(id);
  localStorage.setItem('id', id);
  var self = this;
  this.scan.initInfo(id).subscribe((resp) =>{
    if (resp){
      self.successAuth();
    }
  });

}

public successAuth(){
  console.log('auth_request_true');
  this.router.navigate(['info']);
}

public authError(err){

}



}
