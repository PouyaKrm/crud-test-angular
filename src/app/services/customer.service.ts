import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomer } from '../models/customer.model';

@Injectable({
    providedIn: 'root',
})
export class CustomerService {

    
    public getCustomer(): Observable<ICustomer[]> {
    }
    
    public addCustomer(customer: ICustomer): Observable<ICustomer> {

    }

    public updateCustomer(customer: ICustomer): Observable<ICustomer> {

    }

    public removeCustomer(customer: ICustomer): Observable<ICustomer> { 

    }



}
