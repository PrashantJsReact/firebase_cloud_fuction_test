import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Observable } from 'rxjs';
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
    const createPaymentLink = this.functions.httpsCallable('createPaymentLink');
    const obs = createPaymentLink({ link_id: this.myInput });
    obs.subscribe(async (res) => {
      // const response = await res.data();
      console.log(res);
    });
    this.myInput = '';
  }
}
