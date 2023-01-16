import { Injectable } from '@angular/core';
import { BehaviorSubject, count, from, Observable, of, Subject, tap } from 'rxjs';
import {ICustomer } from '../models/customer.model';
import * as Parse from 'parse';

@Injectable({
    providedIn: 'root',
})
export class CustomerService {

    private _customersDb: ICustomer[] = [];
    public readonly customersDb = new BehaviorSubject<ICustomer[]>([]);

    public addCustomer(customer: ICustomer): Observable<ICustomer> {
        this.checkCustomerExist(customer);
        this._customersDb.push({ ...customer });
        this.publishCustomers();
        return of(customer);
    }

    public updateCustomer(email: string, customer: ICustomer): Observable<ICustomer> {
        let r = this.getByEmail(email);
        let c = r.customer;
        this.checkEamilUnique(customer.email, email);
        this.checkNameUnique(
            { firstName: customer.firstName, lastName: customer.lastName },
            { firstName: c.firstName, lastName: c.lastName }
        );
        let newc = {...customer};
        this._customersDb[r.index] = newc;
        this.publishCustomers();
        return of(customer);
    }

    public removeCustomer(customer: ICustomer): Observable<ICustomer> {
        return of(customer);
    }

    private checkCustomerExist(customer: ICustomer): void {

        this.checkEamilUnique(customer.email);
        this.checkNameUnique({ firstName: customer.firstName, lastName: customer.lastName });
        let dateDuplicate = this._customersDb.filter(e => e.dateOfBirth.getDate() === customer.dateOfBirth.getDate()).length > 0;

        if (dateDuplicate) {
            throw new Error("duplicate date of birth")
        }

    }

    private getByEmail(email: string): {customer: ICustomer, index: number} {
        let index = this._customersDb.findIndex(e => e.email === email);
        if (index === -1) {
            throw new Error("Customer not found by email address");
        }
        return {customer: this._customersDb[index], index: index};
    }

    private checkEamilUnique(email: string, excludeEamil?: string): void {
        let exist = this._customersDb.filter(e => e.email === email && email !== excludeEamil).length > 0;
        if (exist) {
            throw new Error("duplicate email");
        }
    }

    private checkNameUnique(newName: { firstName: string, lastName: string }, excludeName?: { firstName: string, lastName: string }): void {
        let nameDuplicate = this._customersDb.filter(e =>
            (e.firstName === newName.firstName && e.lastName == newName.lastName)
            &&
            !(e.firstName === excludeName?.firstName && e.lastName === excludeName?.lastName)
        ).length > 0;

        if (nameDuplicate) {
            throw new Error("duplicate name")
        }
    }

    private publishCustomers(): void {
      this.customersDb.next(JSON.parse(JSON.stringify(this._customersDb)).map((e: ICustomer) => ({...e, dateOfBirth: new Date(e.dateOfBirth)})));
    }
}

