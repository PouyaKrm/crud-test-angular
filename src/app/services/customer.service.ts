import { Injectable } from '@angular/core';
import { BehaviorSubject, count, from, Observable, of, Subject, tap } from 'rxjs';
import { Customer, ICustomer } from '../models/customer.model';
import * as Parse from 'parse';

@Injectable({
    providedIn: 'root',
})
export class CustomerService {

    private _customersDb: ICustomer[] = [];
    public readonly customersDb = new BehaviorSubject<ICustomer[]>([]);



    public addCustomer(customer: ICustomer): Observable<ICustomer> { 
        this.checkCustomerExist(customer);
        this._customersDb.push({...customer});
        this.customersDb.next([...this._customersDb]);
        return of(customer);
    }

    public updateCustomer(customer: ICustomer): Observable<ICustomer> {
        return of (customer);
    }

    public removeCustomer(customer: ICustomer): Observable<ICustomer> {
        return of (customer);
    }

    private checkCustomerExist(customer: ICustomer): void {

        let emailExist = this._customersDb.filter(e => e.email === customer.email).length > 0;
        if (emailExist) {
            throw new Error("duplicate email")
        }

        let nameDuplicate = this._customersDb.filter(e => e.firstName === customer.firstName && e.lastName == customer.lastName).length > 0;

        if (nameDuplicate) {
            throw new Error("duplicate name")
        }

        let dateDuplicate = this._customersDb.filter(e => e.dateOfBirth.getDate() === customer.dateOfBirth.getDate()).length > 0;

        if (dateDuplicate) {
            throw new Error("duplicate date of birth")
        }

    }
}

