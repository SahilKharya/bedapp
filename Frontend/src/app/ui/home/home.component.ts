import { Component, OnInit } from '@angular/core';
import { ContractService } from 'src/app/services/contract/contract.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private con: ContractService,private fb: FormBuilder) { }

  // contract = this.fb.group({
  //   toAddress: [''],
  //   fromAddress: [''],
  //   amount: ['']
  // });

  ngOnInit() {
  }
 
  change() {
    this.con.getAccount();
    console.log("AFS");
    
  }

}
