import { TestBed } from "@angular/core/testing";
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

    it("updateCustomers should resturn a valid customer", (done: DoneFn) => {

        service.updateCustomer(customer).subscribe(val => {
            expect(val).toBe(customer);
            done();
        })
    });

    it("removeCustomers should resturn a valid customer", (done: DoneFn) => {

        service.removeCustomer(customer).subscribe(val => {
            expect(val).toBe(customer);
            done();
        })
    });

});
