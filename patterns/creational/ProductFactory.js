let nextId = 1;

class Product {
    constructor(details) {
        this.id = details.id ?? nextId++;
        this.name = details.name || 'Generic Product';
        this.price = details.price || 0;
    }
    getPrice() {
        return this.price;
    }
    getDescription() {
        return this.name;
    }
    describe() {
        console.log(`${this.name} - $${this.price}`);
    }
}

class Book extends Product {
    constructor(details) {
        super(details);
        this.name = details.title;
        this.author = details.author || 'Unknown';
    }
    describe() {
        console.log(`Book: "${this.name}" by ${this.author} - $${this.price}`);
    }
}

class Electronic extends Product {
    constructor(details) {
        super(details);
        this.name = details.model;
        this.brand = details.brand || 'Unknown';
    }
    describe() {
        console.log(`Electronic: ${this.brand} ${this.name} - $${this.price}`);
    }
}

class ProductFactory {
    createProduct(type, details) {
        switch (type) {
            case 'book':
                return new Book(details);
            case 'electronic':
                return new Electronic(details);
            default:
                return new Product(details);
        }
    }
}

export { ProductFactory };