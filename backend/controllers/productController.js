const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

/*
@desc     Fetch All Products
@route    GET /api/products
@access   Public
*/
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});


/*
@desc     Fetch Single Product
@route    GET /api/products/:id
@access   Public
*/
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

/*
@desc     Delete product
@route    DELETE /api/products/:id
@access   Private/Admin
*/
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "product removed" });
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

/*
@desc     Create A Product
@route    POST /api/products
@access   Private/Admin
*/
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.png",
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

/*
@desc     Update A Product
@route    PUT /api/products/:id
@access   Private/Admin
*/
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, desc, image, brand, category, countInStock } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.desc = desc;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

/*
@desc     Create a new Review
@route    PUT /api/products/:id/reviews
@access   Private
*/
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewd = product.reviews.find((r) => {
      return r.user.toString() === req.user._id.toString()
    })
    if (alreadyReviewd) {
      res.status(400);
      throw new Error("product already reviewd");
    } else {
      // console.log(req);
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id
      }
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
      await product.save();
      res.status(201).json({ message: "review added" });
    }
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview
}