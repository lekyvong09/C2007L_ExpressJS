exports.getProducts = (req, res, next) => {
    res.status(200).json({
        products: [
            {title: 'first book', price: 11.11},
            {title: 'second book', price: 22.22}
        ]
    });
}