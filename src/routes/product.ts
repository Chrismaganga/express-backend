import express from "express";
import * as productController from "../controllers/product";
import { Router } from "express";


const router = Router();

router.get("/", productController.getAllProducts);
router.get("/categories", productController.getProductCategories);
router.get("/category/:category", productController.getProductsInCategory);
router.get("/:id", productController.getProduct);
router.post("/", productController.addProduct);
router.put("/:id", productController.editProduct);
router.patch("/:id", productController.editProduct);
router.delete("/:id", productController.deleteProduct);

export default router;