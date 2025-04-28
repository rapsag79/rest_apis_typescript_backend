import { Request, Response } from "express"
import Product from "../models/Product.models";

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.findAll({
      order: [
        ["id", "DESC"]
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    });
    res.send({ data: products });
}

export const getProductsById = async (req: Request, res: Response) => { 
  const { id } = req.params;
    const product = await Product.findByPk(id);

    if(!product) {
      res.status(404).json({ error: "No existe el producto" });
      return
    }

    res.status(200).json({ data: product });
}

export const createProduct = async (req: Request, res: Response) => {
 const product = await Product.create(req.body);
    res.status(201).json({data: product});
}

export const updateProduct = async (req: Request, res: Response) => { 
  const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).json({ error: "No existe el producto" });
      return
    }

    //Actualizar
    await product.update(req.body);
    await product.save();

    res.status(200).json({ data: product });
}


export const updateAvailability = async (req: Request, res: Response) => { 
  const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).json({ error: "No existe el producto" });
      return
    }

    //Actualizar
    product.availability = !product.dataValues.availability
    await product.save();

    res.json({ data: product });
}

export const deleteProduct = async (req: Request, res: Response) => { 
  const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ error: "No existe el producto" });
      return
    }
    await product.destroy();//destroy elimina el producto completamente de la base de datos
    res.json({ data: "Producto Eliminado" });
}