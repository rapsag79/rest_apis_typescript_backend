import { Router } from "express";
import { body, param} from "express-validator"
import { createProduct, deleteProduct, getProducts, getProductsById, updateAvailability, updateProduct } from "../handlers/products.handler";
import { handleInputErrors } from "../middleware";

const router = Router();

/**
 * @swagger
 *    components:
 *      schemas:
 *        Product:
 *          type: object
 *          properties:
 *            id:
 *              type: integer
 *              description: The product ID
 *              example: 1
 *            name:
 *              type: string
 *              description: The product name
 *              example: Monitor Curvo Samsung
 *            price:
 *              type: number
 *              description: The product price
 *              example: 300
 *            availability:
 *              type: boolean
 *              description: The product availability
 *              example: true
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *        summary: Get a list of products
 *        tags: [Products]
 *        responses:
 *          200:    
 *            description: Susseful response
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Product'
 */

router.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *    summary: Get a product by id
 *    tags: [Products]
 *    description: Return a product based on its unique id
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the productto retrive
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Susseful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Product not found
 *      404:
 *        description: Bad request - Invalid ID
 */

router.get("/:id",
  param("id").isInt().withMessage("ID no válido"),
    handleInputErrors,
    getProductsById
);

/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: Create a new product
 *    tags: [Products]
 *    description: Returns a new record in the database
 *    requestBody:
 *      required: true
 *      content:
 *        application/json: 
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: "Monitor Curvo Samsung 49 pulgadas"
 *              price:
 *                type: number
 *                example: 300
 *    responses:
 *        201:
 *           description: Product created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Product'
 *        400:
 *           description: Bad request - Invalid input
 */

router.post("/",
  body("name")
    .notEmpty().withMessage("El nombre no puede ser vacio"),
  body("price")
    .isNumeric().withMessage("El precio debe ser numerico")
    .notEmpty().withMessage("El precio no puede ser vacio")
    .custom(value => value > 0).withMessage("El precio debe ser mayor a 0"),
  handleInputErrors,
  createProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *    summary: Update a product by id
 *    tags: [Products]
 *    description: Update a product based on its unique id
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to update
 *        required: true
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json: 
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: "Monitor Curvo Samsung 49 pulgadas"  
 *              price:
 *                type: number
 *                example: 300
 *              availability:
 *                type: boolean
 *                example: true
 *    responses:
 *        200:
 *           description: Product updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Product'
 *        400:
 *           description: Bad request - Invalid ID or Invalid input data
 *        404:
 *           description: Product not found
 */

router.put("/:id",
  param("id").isInt().withMessage("El id debe ser numerico"),
  body("name")
    .notEmpty().withMessage("El nombre no puede ser vacio"),
  body("price")
    .isNumeric().withMessage("El precio debe ser numerico")
    .notEmpty().withMessage("El precio no puede ser vacio")
    .custom(value => value > 0).withMessage("El precio debe ser mayor a 0"),
  body("availability")
    .isBoolean().withMessage("La disponibilidad no puede ser vacia"),
  handleInputErrors,
  updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *    summary: Update a product availability
 *    tags: [Products]
 *    description: Update a product based on its unique id
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to update
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *        200:
 *           description: Product updated successfully
 *        400:
 *           description: Bad request - Invalid ID
 *        404:
 *           description: Product not found
 */

router.patch("/:id",
  param("id").isInt().withMessage("El id debe ser numerico"),
  handleInputErrors,
  updateAvailability
);

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    summary: Delete a product by a given id
 *    tags: [Products]
 *    description: Return a confirmation message
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to delete
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *        200:
 *           description: Product deleted successfully to return a String 
 *           content:
 *             application/json:  
 *               schema:
 *                 type: string
 *                 value: "Producto Eliminado"
 *        400:
 *           description: Bad request - Invalid input
 *        404:
 *           description: Product not found
 */ 

router.delete("/:id", 
  param("id")
    .isInt().withMessage("El id debe ser numerico"),
  handleInputErrors,
  deleteProduct
);

export default router;