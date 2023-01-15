import { TestBed } from "@angular/core/testing";
import { ICustomer } from "../models/customer.model";
import { CustomerService } from "./customer.service";

describe("CsutomerService", () => {


    TestBed.configureTestingModule({ providers: [CustomerService] });

    let service = TestBed.inject(CustomerService);
    let customer: ICustomer;
    beforeEach(() => {
        customer = {
            id: "1",
            firstName: "test",
            lastName: "test",
            email: "test@email.com",
            dateOfBirth: new Date(),
            phoneNumber: "test",
            bankAccountNumber: "test",
        }
    })

    it("getCustomers should resturn a valid list of customers", (done: DoneFn) => {
        service.getCustomers().subscribe(val => {
            expect(val).toBe([]);
            done();
        })
    });

    it("addCustomers should resturn a valid customer", (done: DoneFn) => {

        service.addCustomer(customer).subscribe(val => {
            expect(val).toBe(customer);
            done();
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
