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
    console.log('You called cloudFunctionHandler');
    console.log(this.myInput);
    const callable = this.functions.httpsCallable('createPaymentLink');
    const obs = callable({ link_id: this.myInput });
    obs.subscribe(async (res) => {
      // const response = await res.data();
      console.log(res.data());
      // console.log(response);
    });
    this.myInput = '';
  }
}
