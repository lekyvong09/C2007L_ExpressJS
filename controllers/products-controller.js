exports.getProducts = (req, res, next) => {
    const baseUrl = 'http://localhost:8080/';
    res.status(200).json({
        products: [
            {id: '1', title: 'Superman: Action Comics Volume 5', date: new Date(), amount: 12.99, imageUrl: baseUrl + "images/BOOK-COMIC-1000.jpg", category: 'C'},
            {id: '2', title: 'Batman: The Silver Age Omnibus', date: new Date(), amount: 99.99, imageUrl: baseUrl + "images/BOOK-COMIC-1001.jpg", category: 'C'},
            {id: '3', title: 'The Fifth Science', date: new Date(), amount: 24.99, imageUrl: baseUrl + "images/BOOK-FICTION-1002.jpg", category: 'F'},
            {id: '4', title: 'The Summer House', date: new Date(), amount: 15.00, imageUrl: baseUrl + "images/BOOK-ROMANTIC-1003.jpg", category: 'R'},
            {id: '5', title: 'The Art of Computer Programming', date: new Date(), amount: 187.99, imageUrl: baseUrl + "images/BOOK-PROGRAMMING-1004.jpg", category: 'P'}
        ]
    });
}


exports.createProduct = (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;

    res.status(200).json({
        product: {
            id: new Date().toISOString(),
            title: title,
            price: price
        }
    });
}