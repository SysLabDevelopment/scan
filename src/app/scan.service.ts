import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ScanService {
  public courier_info;
  public id;
  public active_code = null;
  
  constructor(private http:HttpClient, private alert:AlertController) { }

  public sendPost(url, data){
    console.log('SEND_POST_CALL', data);
    var host = "https://mok.flexcore.ru";
   
    
    const httpOptions = { headers: new HttpHeaders({'Content-type' : 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin' : '*' }) };

    var self = this;
    var resp = new Subject<any>();
  
    this.http.post(url, data, httpOptions).subscribe((data:any) => {
      console.log('RESPONSE_DATA', data);
      resp.next(data);
    }, (err) => {
      console.error('An error occurred:', err);
    });

    return resp ;
  }

  public async showMessage(msg){
    switch (msg){
      case 1:
          const alert = await this.alert.create({
            header: 'Отправка',
            message: 'Данные успешно отправлены!',
            buttons: ['OK']
          });
      
          await alert.present();
      break;
    }
  }

  public courierInfo(id){
    var url = "https://terminal.vestovoy.ru/inOut/getKo_lvo.php";
    var data = "cId=" + id;
    
    return this.sendPost(url, data);
}
}
