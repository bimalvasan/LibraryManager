import { Book, DamageLogger, Author, Librarian } from './interfaces';

class UniversityLibrarian implements Librarian {
    name: string;
    email: string;
    department: string;

    assistCustomer(custName: string): void {
        console.log(this.name + ' is assisting ' + custName);
    }
}

class ReferenceItem {
    title: string;
    year: number;

    constructor() {
        console.log('Creating a new ReferenceItem...');
    }

    printItem(): void {
        console.log(`${this.title} was published in ${this.year}.`);

    }
}

export { UniversityLibrarian, ReferenceItem };