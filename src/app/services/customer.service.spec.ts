import { TestBed } from "@angular/core/testing";
import { lastValueFrom } from "rxjs";
import { ICustomer } from "../models/customer.model";
import { CustomerService } from "./customer.service";

describe("CsutomerService", () => {


    TestBed.configureTestingModule({ providers: [CustomerService] });
    let service: CustomerService;
    let customer: ICustomer;
    beforeEach(() => {
        customer = {
            firstName: "test",
            lastName: "test",
            email: "test@email.com",
            dateOfBirth: new Date(),
            phoneNumber: "test",
            bankAccountNumber: "test",
        };

        service = TestBed.inject(CustomerService);
    })


    it("addCustomers should resturn a valid customer", (done: DoneFn) => {

        service.addCustomer(customer).subscribe(val => {
            expect(val).toBe(customer);
            service.customersDb.subscribe(val => {
                expect(val.length).toEqual(1);
                expect(val[0]).toEqual(jasmine.objectContaining(customer));
                done();
            })
        })
    });

    it("updateCustomers should resturn a valid customer", async (done: DoneFn) => {

        await lastValueFrom(service.addCustomer(customer));

        let newCustomer = { ...customer, firstName: "newName" };
        let result = await lastValueFrom(service.updateCustomer(customer.email, newCustomer));

        expect(result).toBe(newCustomer);
        service.customersDb.subscribe(val => {
            expect(val.length).toEqual(1);
            expect(val[0]).toEqual(jasmine.objectContaining(newCustomer));
            done();
        })
    });

    it("removeCustomers should resturn a valid customer", async (done: DoneFn) => {

        await lastValueFrom(service.addCustomer(customer));

        service.removeCustomer(customer.email).subscribe(val => {
            expect(val).toEqual(jasmine.objectContaining(customer));
            service.customersDb.subscribe(cs => {
                expect(cs.length).toEqual(0);
                done();
            })
           
        })
    });

});
