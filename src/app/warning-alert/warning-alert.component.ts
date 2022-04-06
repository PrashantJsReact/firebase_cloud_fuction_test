import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
  constructor(
    private functions: AngularFireFunctions,
    private angularFirestore: AngularFirestore
  ) {}

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
          customer_phone: '7765811317',
          customer_email: 'prashant@ginims.com',
          customer_name: 'Prashant',
        },
        // eslint-disable-next-line object-curly-spacing
        link_notify: { send_sms: true, send_email: true },
        link_amount: 5000,
        link_currency: 'INR',
        link_purpose: 'Payment for function',
        link_partial_payments: false,
        link_auto_reminders: false,
        link_id: this.myInput,
      },
    });
    obs.subscribe((res) => {
      this.paymentResponse = res;
      //Q If cashfree through error then what will happen
      this.angularFirestore
        .collection('allSubscription')
        .doc(res.link_id)
        .set({
          subscriptionId: res.link_id, //Q updated after creating doc
          clientId: 123, // from our application
          clientName: 'corpName', // from our application
          createdDate: '', // updated after payment done
          createdBy: 'the loggedIn userId', // this will set as admin user
          status: 'PENDING', // updated after webhook triggered
          cashfreeInfo: {
            link_id: res.link_id,
            paymentLink: res.link_url,
            link_created_at: res.link_created_at,
            link_expiry_time: res.link_expiry_time,
          },
          currPaymentDetails: {
            // paymentMethod: 'Cheque',
            // refNo: 123456,
            // totalPrice: 13000,
            // roomServiceFee: 150,
            // groupServiceFee: 100,
            // banguetServiceFee: 12,
            // invoiceAttachmentLink: 'abc.pdf',
            paymentMethod: 'cashFree',
            refNo: '', // updated after payment done
            totalPrice: res.link_amount,
            roomServiceFee: '', // from our application
            groupServiceFee: '', // from our application
            banguetServiceFee: '', // from our application
            // invoiceAttachmentLink: 'abc.pdf',
          },
          currentPlanSpecifications: {
            subTdAdminNo: '', // from our application
            subTdUserNo: '', // from our application
            subEmpAprUserNo: '', // from our application
            subLinkedHotelNo: '', // from our application
          },
        })
      console.log(this.paymentResponse);
    });
    // this.myInput = uuidv4();
  }
}
