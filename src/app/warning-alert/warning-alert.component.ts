import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { environment } from 'environments/environment';
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
    const obs = createPaymentLink({
      url: environment.cashFree['url'],
      xClientSecret: environment.cashFree['x-client-secret'],
      xClientId: environment.cashFree['x-client-id'],
      data: {
        // from UI
        customer_details: {
          customer_phone: '7934949499',
          customer_email: 'abcbfsdfsef@gmail.com',
          customer_name: 'ginimsss technology',
        },
        // eslint-disable-next-line object-curly-spacing
        link_notify: { send_sms: true, send_email: true },
        link_amount: 500,
        link_currency: 'INR',
        link_purpose: 'Payment for function',
        link_partial_payments: false,
        link_auto_reminders: false,
        link_id: this.myInput,
      },
    });
    obs.subscribe((res) => {
      this.paymentResponse = res;
    });
    this.myInput = uuidv4();
  }
}
