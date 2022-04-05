import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-warning-alert',
  templateUrl: './warning-alert.component.html',
  styleUrls: ['./warning-alert.component.css'],
})
export class WarningAlertComponent implements OnInit {
  paymentResponse: any;
  paymentLink = '';
  myInput = uuidv4();
  constructor(private functions: AngularFireFunctions) {}

  ngOnInit(): void {}

  cloudFunctionHandler() {
    console.log('You clicked cloudFunctionHandler');
    const createPaymentLink = this.functions.httpsCallable('createPaymentLink');
    const obs = createPaymentLink({ link_id: this.myInput });
    obs.subscribe((res) => {
      // const response = await res.data();
      console.log(res);
      this.paymentResponse = res;
      // this.paymentLink = res.link_url;
    });
  }
}
