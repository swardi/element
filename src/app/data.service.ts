import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx'; 

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {
	
    constructor(private http: Http ) {}
    search(){
         return this.http.get('http://localhost:8080/api/modules').toPromise();
    }

    emailMe(modules, emailAddress){
    	let data : any = {"customerEmail" : emailAddress};
    	let quoteItems : Array<any> = [];
    	modules.forEach(module=> {
    		if(module.isSelected){
    			quoteItems.push({"moduleId" : module.id, "amount" : module.coverageValue})	
    		}
    	});
    	data.quoteItems = quoteItems;
    	return this.http.post('http://localhost:8080/api/sendemail', data).toPromise();
    }

} 