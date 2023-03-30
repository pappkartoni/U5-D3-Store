import express from "express"
import CategoriesModel from "./model.js"

const categoriesRouter = express.Router()

categoriesRouter.post("/", async (req, res, next) => {
    try {
        const {categoryId} = await CategoriesModel.create(req.body)
        res.status(201).send({categoryId})
    } catch (error) {
        next(error)
    }
})

categoriesRouter.get("/", async (req, res, next) => {
    try {
        const categories = await CategoriesModel.findAll({
            attributes: ["categoryId", "name"]
        })
        res.send(categories)
    } catch (error) {
        next(error)
    }
})

export default categoriesRouter