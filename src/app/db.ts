import { ICustomer } from "./models/customer.model";

export const customersDb: ICustomer[] = [
    {
        id: "1",
        firstName: "Oliver",
        lastName: "Jake",
        email: "oliver@gmail.com",
        phoneNumber: "123",
        dateOfBirth: new Date("1998-01-01T00:00:00"),
        bankAccountNumber: "4003830171874018",

    },
    {
        id: "2",
        firstName: "Oliver",
        lastName: "Jake",
        email: "oliver@gmail.com",
        phoneNumber: "123",
        dateOfBirth: new Date("1998-01-01T00:00:00"),
        bankAccountNumber: "4003830171874018",

    },
]

export function addCustomer(customer: ICustomer): void {
    customersDb.push(customer);
}