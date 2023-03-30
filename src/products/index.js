import express from "express"
import createHTTPError from "http-errors"
import {Op} from "sequelize"
import CategoriesModel from "../categories/model.js"
import ReviewsModel from "../reviews/model.js"
import UsersModel from "../users/model.js"
import ProductsModel from "./model.js"
import ProductsCategoriesModel from "./productsCategoriesModel.js"

const productsRouter = express.Router()

productsRouter.post("/", async (req, res, next) => {
    try {
        const {productId} = await ProductsModel.create(req.body)
        if (req.body.categories) {
            await ProductsCategoriesModel.bulkCreate(
                req.body.categories.map(cat => {return {productd: productId, categoryId: cat}})
            )
        }
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
            include: [
                {model: CategoriesModel, attributes: ["name"], through: {attributes: []}},
                {model: ReviewsModel, attributes: ["userId", "content"], 
                    include: {model: UsersModel, attributes: ["firstname", "lastname"]}
                }
            ],
            ...(req.query.limit && {limit: req.query.limit}), // unnecessarily complicated, i don't think limit: null breaks anything
            ...(req.query.offset && {offset: req.query.offset}),
            order: [(req.query.orderby ? [req.query.orderby, (req.query.dir ? req.query.dir.toUpperCase() : "ASC")] : ["productId", (req.query.dir ? req.query.dir.toUpperCase() : "ASC")])]
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