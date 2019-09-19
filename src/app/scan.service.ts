import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ScanService {
  public courier_info;
  public id;
  public active_code = null;
  public active_row = null;
  public name = null;
  public scanCodes = null;
  public tbls = null;

  constructor(private http:HttpClient, private alert:AlertController) {}

  public sendPost(url, data){
    console.log('SEND_POST_CALL', data);
    var host = "https://mok.flexcore.ru";
   
    
    const httpOptions = { headers: new HttpHeaders({'Content-type' : 'application/json', 'Access-Control-Allow-Origin' : '*', 'Access-Control-Allow-Headers' : '*' }) };

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
      case 2:
          const alert2 = await this.alert.create({
            header: 'Авторизация',
            message: 'Ошибка авторизации. Поаторите запрос позже!',
            buttons: ['OK']
          });
      
          await alert2.present();
      break;
    }
  }

  public courierInfo(id){
    var url = "https://terminal.vestovoy.ru/inOut/getKo_lvo.php";
    var data = {'cId' : id};

    
    return this.sendPost(url, data);
}

public initInfo(id):Observable<boolean>{
  var self = this;
  var resp = new Subject<any>();

  this.courierInfo(id).subscribe((res) => {
    console.log('courier_info_resp', res);
    if (res != null){
      self.courier_info = res;
      self.name = self.courier_info.shift().name;
      self.scanCodes = self.courier_info.shift().arrCodes;
      self.tbls = self.courier_info;
      self.id = id;
      resp.next(true);
    } else {
      resp.next(false);
    }
  });
  return resp;
}
}
