import { Category } from './enums';
import { Book, DamageLogger, Person, Author, Librarian } from './interfaces';
import { UniversityLibrarian, ReferenceItem, Encyclopedia } from './classes';

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

let Newspaper = class extends ReferenceItem{
    printCitation(): void{
        console.log(`Newspaper: ${this.title}`);
    }
}

let myPaper = new Newspaper('The Gazette', 2016);
myPaper.printCitation();