import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
@Component({
  selector: 'app-warning-alert',
  templateUrl: './warning-alert.component.html',
  styleUrls: ['./warning-alert.component.css'],
})
export class WarningAlertComponent implements OnInit {
  myInput = 'Elite plan';
  constructor(private functions: AngularFireFunctions) {}

  ngOnInit(): void {}


  cloudFunctionHandler() {
    console.log('You clicked cloudFunctionHandler');
    console.log(this.myInput);
    const createPaymentLink1 = this.functions.httpsCallable('createPaymentLink1');
    const obs = createPaymentLink1({ "link_id": this.myInput });
    obs.subscribe(async (res) => {
      const response = await res.data();
      console.log("❤️❤️❤️❤️❤️",response);
      // console.log(response);
    });
    this.myInput = '';
  }
}
