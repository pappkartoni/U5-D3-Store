import express from "express"
import createHTTPError from "http-errors"
import {Op} from "sequelize"
import UsersModel from "./model.js"

const usersRouter = express.Router()

usersRouter.post("/", async (req, res, next) => {
    try {
        const {userId} = await UsersModel.create(req.body)
        res.status(201).send({userId})
    } catch (error) {
        next(error)
    }
})

export default usersRouter