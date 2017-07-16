function GetAllBooks() {

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

enum Category { Biography, Poetry, Fiction, History, Children }

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

function GetBookByID(id: number) {
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

let myBooks: string[] = CheckoutBooks('Thorne', 1);
myBooks.forEach(title => console.log(title));

CreateCustomer('Bimal');
CreateCustomer('Ajith', 30);
CreateCustomer('Babu', 22, 'Thiruvananthapuram');

let x: number;
x = 5;

let IdGenerator: (char: string, num: number) => string;
IdGenerator = CreateCustomerID;

let myID: string = IdGenerator('Bimal ', 15);
console.log(myID);

LogFirstAvailable();

let poetryBooks = GetBookTitlesByCategory(Category.Poetry);
poetryBooks.forEach((val, idx, arr) => console.log(++idx + ' - ' + val))

const fictionBooks = GetBookTitlesByCategory();
fictionBooks.forEach((val, idx, arr) => console.log(++idx + ' - ' + val))