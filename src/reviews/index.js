import express from "express"
import ProductsModel from "../products/model.js"
import ProductsCategoriesModel from "../products/productsCategoriesModel.js"
import ReviewsModel from "./model.js"

const reviewsRouter = express.Router()

reviewsRouter.post("/", async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
})

export default reviewsRouter