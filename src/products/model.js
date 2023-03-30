import {DataTypes} from "sequelize"
import sequelize from "../db.js"
import CategoriesModel from "../categories/model.js"
import ProductsCategoriesModel from "./productsCategoriesModel.js"
import ReviewsModel from "../reviews/model.js"

const ProductsModel = sequelize.define(
    "product",
    {
        productId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull:  false
        }
    }
)
ProductsModel.hasMany(ReviewsModel, {foreignKey: {name: "productId", allowNull: false}})
ReviewsModel.hasMany(ProductsModel, {foreignKey: {name: "productId", allowNull: false}})

ProductsModel.belongsToMany(CategoriesModel,{ through: ProductsCategoriesModel, foreignKey: {name: "productId", allowNull: false}})
CategoriesModel.belongsToMany(ProductsModel,{ through: ProductsCategoriesModel, foreignKey: {name: "categoryId", allowNull: false}})

export default ProductsModel