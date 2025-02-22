import { Router } from "express";
import multer from "multer";
import { CreateUserControler } from "./controlers/user/createUserControler";

import { AuthUserControler } from "./controlers/user/authUserControler";
import { DetailUserControler } from "./controlers/user/detailUserControler";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import { CreateCategoryControler } from "./controlers/category/createCategoryControler";
import { ListCategoryControler } from "./controlers/category/listCategoryControler";

import { CreateProductController } from "./controlers/product/CreateProductController";

import { ListByCategoryController } from "./controlers/product/ListByCategoryController";

import { CreateOrderController } from "./controlers/order/CreateOrderController";
import { RemoveOrderController } from "./controlers/order/RemoveOrderController";

import { AddItemController } from "./controlers/order/AddItemController";
import { RemoveItemController } from "./controlers/order/RemoveItemController";

import { SendOrderController } from "./controlers/order/SendOrderController";
import { ListOrdersController } from "./controlers/order/ListOrdersController";

import uploadConfig from './config/multer';
import { DetailOrderController } from "./controlers/order/DetailOrderController";
import { FinishOrderController } from "./controlers/order/FinishOrderController";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

//ROTAS USERS
router.post("/users", new CreateUserControler().handle)

router.post("/session", new AuthUserControler().handle)

router.get("/me", isAuthenticated, new DetailUserControler().handle)

// -- ROTAS CATEGORY
router.post("/category", isAuthenticated, new CreateCategoryControler().handle)

router.get("/category", isAuthenticated, new ListCategoryControler().handle)

// ROTAS PRODUCTS
// router.post("/product", isAuthenticated, upload.single('file'), new CreateProductController().handle)
router.post("/product", isAuthenticated, new CreateProductController().handle)

router.get('/category/product', isAuthenticated, new ListByCategoryController().handle)

// ROTAS ORDER
router.post('/order', isAuthenticated, new CreateOrderController().handle)

router.delete('/order', isAuthenticated, new RemoveOrderController().handle)

router.post('/order/add', isAuthenticated, new AddItemController().handle)

router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle)

router.put('/order/send', isAuthenticated, new SendOrderController().handle)

router.get('/orders', isAuthenticated, new ListOrdersController().handle)

router.get('/order/detail', isAuthenticated, new DetailOrderController().handle)

router.put('/order/finish', isAuthenticated, new FinishOrderController().handle)

export { router };