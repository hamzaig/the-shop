const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");


// @desc     Create new order
// @route    POST /api/orders
// @access   Private
const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order Items")
  } else {
    const order = new Order({
      user: req.user._id, orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice
    })
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
})

// @desc    Get order by id
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
})

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  console.log(order);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address
    }
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  }
  else {
    res.status(404);
    throw new Error("Order not found");
  }
})
// @desc    get Logged in user Orders
// @route   PUT /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
})

module.exports = {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders
};