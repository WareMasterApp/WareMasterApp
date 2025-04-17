const Inventory = require('../models/Inventory');
const Product = require('../models/Product');
const Warehouse = require('../models/Warehouse');

const createInventory = async (req, res) => {
  try {
    const { productId, warehouseId, quantity } = req.body;

    const [product, warehouse] = await Promise.all([
      Product.findById(productId),
      Warehouse.findById(warehouseId),
    ]);

    if (!product || !warehouse) {
      return res.status(404).json({
        error: 'Product or Warehouse not found',
      });
    }

    const inventory = await Inventory.create({
      productId,
      warehouseId,
      brandId: product.brandId,
      quantity,
    });

    res.status(201).json(inventory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllInventories = async (req, res) => {
  try {
    const inventories = await Inventory.find()
      .populate('productId', 'name sku')
      .populate('warehouseId', 'name address')
      .populate('brandId', 'name');

    res.json(inventories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getInventoryByWarehouse = async (req, res) => {
  try {
    const inventories = await Inventory.find({
      warehouseId: req.params.warehouseId,
    })
      .populate('productId', 'name sku')
      .populate('brandId', 'name');

    res.json(inventories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getInventoryByBrand = async (req, res) => {
  try {
    const inventories = await Inventory.find({
      brandId: req.params.brandId,
    })
      .populate('productId', 'name sku category')
      .populate('warehouseId', 'name address')
      .populate('brandID', 'name');

    if (inventories.length === 0) {
      return res.status(404).json({
        error: 'No inventory found for this brand',
      });
    }

    res.json(inventories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addProductToInventory = async (req, res) => {
  try {
    const { productId, warehouseId } = req.body;

    let inventory = await Inventory.findOne({ productId, warehouseId });

    if (!inventory) {
      inventory = await Inventory.create({
        productId,
        warehouseId,
        brandId: (await Product.findById(productId)).brandId,
        quantity: 0,
      });
    }

    await inventory.safeIncrement(1);
    res.json(inventory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const removeProductFromInventory = async (req, res) => {
  try {
    const { productId, warehouseId } = req.body;
    const inventory = await Inventory.findOne({ productId, warehouseId });

    if (!inventory) {
      return res.status(404).json({
        error: 'Inventory record not found',
      });
    }

    await inventory.safeIncrement(-1);
    res.json(inventory);
  } catch (err) {
    const status = err.message.includes('negative') ? 400 : 500;
    res.status(status).json({ error: err.message });
  }
};

module.exports = {
  createInventory,
  getAllInventories,
  getInventoryByWarehouse,
  getInventoryByBrand,
  addProductToInventory,
  removeProductFromInventory,
};
