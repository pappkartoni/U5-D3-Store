import express from "express"
import createHTTPError from "http-errors"
import {Op} from "sequelize"
import ProductsModel from "./model.js"

const productsRouter = express.Router()

productsRouter.post("/", async (req, res, next) => {
    try {
        const {productId} = await ProductsModel.create(req.body)
        res.status(201).send({productId})
    } catch (error) {
        next(error)
    }
})

productsRouter.get("/", async (req, res, next) => {
    try {
        const query = {}

        if (req.query.min && req.query.max) query.price = {[Op.between]: [req.query.min, req.query.max]}
        if (req.query.cat) query.category = {[Op.iLike]: `%${req.query.cat}%`}
        const products = await ProductsModel.findAndCountAll({
            where: {
                ...query,
                ...(req.query.search && {[Op.or]: [{name: {[Op.iLike]: `%${req.query.search}%`}}, {description: {[Op.iLike]: `%${req.query.search}%`}}]})
            },
            ...(req.query.limit && {limit: req.query.limit}),
            ...(req.query.offset && {offset: req.query.offset}),
            order: [["name", "ASC"]]
        })
        res.send(products)
    } catch (error) {
        next(error)
    }
})

productsRouter.get("/:productId", async (req, res, next) => {
    try {
        const product = await ProductsModel.findByPk(req.params.productId, {attributes: {exclude: ["createdAt", "updatedAt"]}})
        if (product) {
            res.send(product)
        } else {
            next(createHTTPError(404, `No product found with ID ${req.params.productId}`))
        }
    } catch (error) {
        next(error)
    }
})

productsRouter.put("/:productId", async (req, res, next) => {
    try {
        const [num, updated] = await ProductsModel.update(req.body, {where: {productId: req.params.productId}, returning: true})
        if (num === 1) {
            res.send(updated[0])
        } else {
            next(createHTTPError(404, `No product found with ID ${req.params.productId}`))
        }
    } catch (error) {
        next(error)
    }
})

productsRouter.delete("/:productId", async (req, res, next) => {
    try {
        const num = await ProductsModel.destroy({where: {productId: req.params.productId}})
        if (num === 1) {
            res.status(204).send()
        } else {
            next(createHTTPError(404, `No product found with ID ${req.params.productId}`))
        }
    } catch (error) {
        next(error)
    }
})

export default productsRouter