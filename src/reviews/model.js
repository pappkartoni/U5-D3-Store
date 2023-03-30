import {DataTypes} from "sequelize"
import sequelize from "../db.js"

const ReviewsModel = sequelize.define(
    "review", {
    reviewId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.STRING(200),
        allowNull: false
    }
})

export default ReviewsModel