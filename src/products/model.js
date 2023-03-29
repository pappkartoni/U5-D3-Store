import {DataTypes} from "sequelize"
import sequelize from "../db.js"

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
        category: {
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

export default ProductsModel