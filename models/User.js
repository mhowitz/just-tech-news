const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create our User Model

class User extends Model {}

//define table columns and configuration

User.init(
    {
        //TABLE COLUMN DEFINITIONS GO HERE
        //define an id column:
        id: {
            type: DataTypes.INTEGER,
            //THIS is the equivalent of sql's not null option
            allowNull: false,
            //instruct that this is the primary key
            primaryKey: true,
            //turn on auto increment
            autoIncrement: true
        },
        //define a username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //define an email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            //there cannot be any duplicate email values in this table:
            unique: true,
            //if allow null is set to false, we can run our data trhough validators before creating the table data
            validate: {
                isEmail: true
            }
        },
        //define a password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //this means pass must be at least4 characters long
                len: [4]
            }
        }
    },
    {
        //TABLE CONFIGURATION OPTIONS GO HERE

        //Pass in our imported sequelize connection(direct connection to our database)
        sequelize,
        //dont automaticlly create createdAt/updatedAt timestamp fields
        timestamps: false,
        //dont pluralize name of database table
        freezeTableName: true,
        //use underscores instead of camel-casing
        underscored: true,
        //make it so our model name stays lowercase in the database
        modelName: 'user'
    }
);

module.exports = User;