const express = require("express");
const router = express.Router();
const {
  postProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} = require("../controllers/productController");

router.route("/").get(getProduct);
router.route("/").post(postProduct);
router
  .route("/:id")
  .put(updateProduct)
  .delete(deleteProduct)
  .get(getSingleProduct);

module.exports = router;
