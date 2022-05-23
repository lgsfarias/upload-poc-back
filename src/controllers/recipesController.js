import db from '../config/dbConnect.js';
import { ObjectId } from 'mongodb';

export default class Recipes {
    static getAllRecipes = async (req, res) => {
        try {
            const recipes = await db.collection('recipes').find().toArray();
            res.status(200).json(recipes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    static getRecipeById = async (req, res) => {
        try {
            const recipe = await db
                .collection('recipes')
                .findOne({ _id: new ObjectId(req.params._id) });
            res.status(200).json(recipe);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    static createRecipe = async (req, res) => {
        const { title, decription, ingredients, preparation } = req.body;
        const { filename } = req.file;
        try {
            await db.collection('recipes').insertOne({
                title,
                decription,
                ingredients: JSON.parse(ingredients),
                preparation: JSON.parse(preparation),
                image: `http://localhost:5000/files/${filename}`,
            });
            res.status(201).send('Recipe created');
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    };
}
