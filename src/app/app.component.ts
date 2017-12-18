import { Component } from '@angular/core';
import {DataService} from "./data.service";
import {Alert} from "./alert.component";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    modules : Array<any> = [];
    insuranceModuleForm : FormGroup;
    emailForm : FormGroup;
    displayPremium : boolean = false;
    calculatedPremiumValue : number = 0;
    emailAddress : string ='';

  	constructor(private dataService: DataService,  private fb: FormBuilder, private modalService: NgbModal) {
  		
  	}

    ngOnInit() {
      this.insuranceModuleForm = new FormGroup({});
      this.emailForm = new FormGroup({'emailAddress':new FormControl(this.emailAddress,
                [Validators.required])})
      this.loadData();
	}

	validateAndCalculatePremium(){
		let selectedCount=0;
		for(let i=0; i<this.modules.length; i++) {
			let module=this.modules[i];
			if( module.isSelected  ){
				selectedCount+=1;
				if(!module.coverageValue || module.coverageValue == ''){
					alert("Select coverage value for " + module.moduleName);
					this.calculatedPremiumValue=0;
					break;		
				}else{
					if(module.coverageValue < module.minimumValue || module.coverageValue > module.maximumValue){
						alert("Please choose coverage values for " + module.moduleName + " between range " + module.minimumValue + " - " + module.maximumValue + ".");
						this.calculatedPremiumValue=0;
						break;	
					}
					this.calculatedPremiumValue += module.coverageValue*module.riskFactor/100;
				}
			}
		}
		if(selectedCount == 0) alert("Please choose one or more modules");
		this.calculatedPremiumValue = Math.ceil(this.calculatedPremiumValue);
		this.displayPremium= this.calculatedPremiumValue > 0;
	}

  	//Load JSON data.
  	loadData () {
		this.dataService.search().then(response => {
			this.modules = response.json();
			let controlsGroup :any ={};
			this.modules.forEach(module => {
				let moduleName : string = module.moduleName.replace(' ','_').toLowerCase();
				this.insuranceModuleForm.addControl(moduleName,new FormControl('', [Validators.min(module.minimumValue), Validators.max(module.maximumValue)]))
			})
        }, error => {
        	alert("There was an error in loading data.")
        });
	}

	emailMe (){
		if(this.emailAddress == ''){
			alert("Please enter your email address");
			return;
		}
		this.dataService.emailMe(this.modules, this.emailAddress).then(response=>{
			alert("Email sent");
		}, error => {
			alert ("There was an error in sending email.");
		});
	}

	toggleSelection (module){
		module.isSelected=!module.isSelected;
		module.coverageValue='';
	}


}
