import {DataTypes} from "sequelize"
import sequelize from "../db.js"
import ReviewsModel from "../reviews/model.js"

const UsersModel = sequelize.define(
    "user",
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstname: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
    }
)

UsersModel.hasMany(ReviewsModel, {foreignKey: {name: "userId", allowNull: false}})
ReviewsModel.belongsTo(UsersModel, {foreignKey: {name: "userId", allowNull: false}})

export default UsersModel