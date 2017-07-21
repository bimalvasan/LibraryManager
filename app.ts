import { Category } from './enums';
import { Book, Logger, Person, Author, Librarian, Magazine } from './interfaces';
import { UniversityLibrarian, ReferenceItem } from './classes';
import { CalculateLateFee as CalcFee, MaxBooksAllowed, Purge } from './lib/utilityFuctions';
import refBook from './encyclopedia';
import Shelf from './shelf';
import * as _ from 'lodash';

let snakeCaseTitle = _.snakeCase('From whom the Bell Tolls');
console.log(snakeCaseTitle);

function GetAllBooks(): Book[] {

    let books = [
        { id: 1, title: 'Ulysses', author: 'James Joyce', available: true, category: Category.Fiction },
        { id: 2, title: 'A Farewell to Arms', author: 'Ernest Hemingway', available: false, category: Category.Fiction },
        { id: 3, title: 'I Know Why the Caged Birds Sings', author: 'Maya Angelou', available: true, category: Category.Poetry },
        { id: 4, title: 'Moby Dick', author: 'Herman Melville', available: true, category: Category.Fiction }
    ];

    return books;
}

function LogFirstAvailable(books = GetAllBooks()): void {

    let firstAvailable: string = '';
    let numberOfBooks: number = books.length;

    for (let currentBook of books) {

        if (currentBook.available) {
            firstAvailable = currentBook.title;
            break;
        }
    }

    console.log('Total Books: ' + numberOfBooks);
    console.log('First Available: ' + firstAvailable);
}

function GetBookTitlesByCategory(categoryFilter: Category = Category.Fiction): Array<string> {
    console.log('Getting books in category: ' + categoryFilter + ' - ' + Category[categoryFilter]);

    const allBooks = GetAllBooks();
    const filteredTitles: string[] = [];

    for (let currentBook of allBooks) {
        if (currentBook.category === categoryFilter) {
            filteredTitles.push(currentBook.title);
        }
    }

    return filteredTitles;
}

function LogBookTitles(titles: string[]): void {
    for (let title of titles) {
        console.log(title);
    }
}

function GetBookByID(id: number): Book {
    const allBooks = GetAllBooks();

    return allBooks.filter(book => book.id === id)[0];
}

function CreateCustomerID(name: string, id: number): string {
    return name + id;
}

function CreateCustomer(name: string, age?: number, city?: string): void {
    console.log('Create customer ' + name);

    if (age) {
        console.log('Age: ' + age);
    }

    if (city) {
        console.log('City: ' + city);
    }
}

function CheckoutBooks(customer: string, ...bookIDs: number[]): string[] {
    console.log('Checking out books for ' + customer);

    let booksCheckedOut: string[] = [];

    for (let id of bookIDs) {
        let book = GetBookByID(id);

        if (book.available) {
            booksCheckedOut.push(book.title);
        }
    }

    return booksCheckedOut
}

function GetTitles(author: string): string[];
function GetTitles(available: boolean): string[];
function GetTitles(bookProp: any): string[] {
    const allBooks = GetAllBooks();
    const foundTitles: string[] = [];

    if (typeof bookProp == 'string') {
        for (let book of allBooks) {

            if (book.author === bookProp) {
                foundTitles.push(book.title);
            }
        }
    }
    else if (typeof bookProp == 'boolean') {
        for (let book of allBooks) {

            if (book.available === bookProp) {
                foundTitles.push(book.title);
            }
        }
    }

    return foundTitles;
}

function PrintBook(book: Book): void {
    console.log(book.title + ' by ' + book.author);
}

let myBook: Book = {
    id: 5,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    available: true,
    category: Category.Fiction,
    //year: '1813',
    //copies: 3
    pages: 250,
    markDamages: (reason: string) => console.log('Damaged: ' + reason)
}

// PrintBook(myBook);
// myBook.markDamages('Missing back cover.');

// let logDamage: DamageLogger;
// logDamage = (damage: string) => console.log('Damage reported: ' + damage);
// logDamage('Lot of damage.');

// let hermansBooks = GetTitles('Herman Melville');
// hermansBooks.forEach(title => console.log(title));

// let checkedoutBooks = GetTitles(true);
// checkedoutBooks.forEach(title => console.log(title));

// let myBooks: string[] = CheckoutBooks('Thorne', 1);
// myBooks.forEach(title => console.log(title));

// CreateCustomer('Bimal');
// CreateCustomer('Ajith', 30);
// CreateCustomer('Babu', 22, 'Thiruvananthapuram');

// let x: number;
// x = 5;

// let IdGenerator: (char: string, num: number) => string;
// IdGenerator = CreateCustomerID;

// let myID: string = IdGenerator('Bimal ', 15);
// console.log(myID);

// LogFirstAvailable();

// let poetryBooks = GetBookTitlesByCategory(Category.Poetry);
// poetryBooks.forEach((val, idx, arr) => console.log(++idx + ' - ' + val))

// const fictionBooks = GetBookTitlesByCategory();
// fictionBooks.forEach((val, idx, arr) => console.log(++idx + ' - ' + val))

// let favoriteLibrarian: Librarian = new UniversityLibrarian();
// favoriteLibrarian.name = 'Sharon';
// favoriteLibrarian.assistCustomer('Lynda');

//let ref: ReferenceItem = new ReferenceItem('Facts and Figures', 2016);
// ref.title = 'Facts and Figures';
// ref.year = 2016;
// ref.printItem();
// console.log(ReferenceItem.department);

// let refBook: ReferenceItem = new Encyclopedia('WorldPedia', 1900, 10);
// refBook.printItem();
// refBook.printCitation();

// let Newspaper = class extends ReferenceItem {
//     printCitation(): void {
//         console.log(`Newspaper: ${this.title}`);
//     }
// }

// let myPaper = new Newspaper('The Gazette', 2016);
// myPaper.printCitation();

let inventory: Array<Book> = [
    { id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software },
    { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software },
    { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software },
    { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software }
];

// let purgedBooks: Array<Book> = Purge<Book>(inventory);
// purgedBooks.forEach(book => console.log(book.title));

// let purgedNum: Array<number> = Purge<number>([1,4,7,9]);
// console.log(purgedNum);

let bookShelf: Shelf<Book> = new Shelf<Book>();
inventory.forEach(book => bookShelf.add(book));

let firstBook: Book = bookShelf.getFirst();
console.log(firstBook);

let magazines: Array<Magazine> = [
    { title: 'Programming Language Monthly', publisher: 'Code Mags' },
    { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
    { title: 'Five Points', publisher: 'GSU' }
];

let magazineShelf: Shelf<Magazine> = new Shelf<Magazine>();
magazines.forEach(mag => magazineShelf.add(mag));
let firstMag: Magazine = magazineShelf.getFirst();

// let numberShelf:Shelf<number> = new Shelf<number>();
// [5,10,15].forEach(mag => magazineShelf.add(mag));

magazineShelf.printTitles();

let softwareBook = bookShelf.find('Code Complete');
console.log(`${softwareBook.title} (${softwareBook.author})`);