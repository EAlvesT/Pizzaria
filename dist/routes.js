"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const createUserControler_1 = require("./controlers/user/createUserControler");
const authUserControler_1 = require("./controlers/user/authUserControler");
const detailUserControler_1 = require("./controlers/user/detailUserControler");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const createCategoryControler_1 = require("./controlers/category/createCategoryControler");
const listCategoryControler_1 = require("./controlers/category/listCategoryControler");
const CreateProductController_1 = require("./controlers/product/CreateProductController");
const ListByCategoryController_1 = require("./controlers/product/ListByCategoryController");
const CreateOrderController_1 = require("./controlers/order/CreateOrderController");
const RemoveOrderController_1 = require("./controlers/order/RemoveOrderController");
const AddItemController_1 = require("./controlers/order/AddItemController");
const RemoveItemController_1 = require("./controlers/order/RemoveItemController");
const SendOrderController_1 = require("./controlers/order/SendOrderController");
const ListOrdersController_1 = require("./controlers/order/ListOrdersController");
const multer_2 = __importDefault(require("./config/multer"));
const DetailOrderController_1 = require("./controlers/order/DetailOrderController");
const FinishOrderController_1 = require("./controlers/order/FinishOrderController");
const router = (0, express_1.Router)();
exports.router = router;
const upload = (0, multer_1.default)(multer_2.default.upload("./tmp"));
//ROTAS USERS
router.post("/users", new createUserControler_1.CreateUserControler().handle);
router.post("/session", new authUserControler_1.AuthUserControler().handle);
router.get("/me", isAuthenticated_1.isAuthenticated, new detailUserControler_1.DetailUserControler().handle);
// -- ROTAS CATEGORY
router.post("/category", isAuthenticated_1.isAuthenticated, new createCategoryControler_1.CreateCategoryControler().handle);
router.get("/category", isAuthenticated_1.isAuthenticated, new listCategoryControler_1.ListCategoryControler().handle);
// ROTAS PRODUCTS
// router.post("/product", isAuthenticated, upload.single('file'), new CreateProductController().handle)
router.post("/product", isAuthenticated_1.isAuthenticated, new CreateProductController_1.CreateProductController().handle);
router.get('/category/product', isAuthenticated_1.isAuthenticated, new ListByCategoryController_1.ListByCategoryController().handle);
// ROTAS ORDER
router.post('/order', isAuthenticated_1.isAuthenticated, new CreateOrderController_1.CreateOrderController().handle);
router.delete('/order', isAuthenticated_1.isAuthenticated, new RemoveOrderController_1.RemoveOrderController().handle);
router.post('/order/add', isAuthenticated_1.isAuthenticated, new AddItemController_1.AddItemController().handle);
router.delete('/order/remove', isAuthenticated_1.isAuthenticated, new RemoveItemController_1.RemoveItemController().handle);
router.put('/order/send', isAuthenticated_1.isAuthenticated, new SendOrderController_1.SendOrderController().handle);
router.get('/orders', isAuthenticated_1.isAuthenticated, new ListOrdersController_1.ListOrdersController().handle);
router.get('/order/detail', isAuthenticated_1.isAuthenticated, new DetailOrderController_1.DetailOrderController().handle);
router.put('/order/finish', isAuthenticated_1.isAuthenticated, new FinishOrderController_1.FinishOrderController().handle);
