import { Router } from 'express';
import multer from 'multer';
import multerConfig from '../config/multer.js';

import Recipes from '../controllers/recipesController.js';

const router = Router();

router.get('/recipes', Recipes.getAllRecipes);

router.get('/recipes/:_id', Recipes.getRecipeById);

router.post(
    '/recipes',
    multer(multerConfig).single('file'),
    Recipes.createRecipe
);

export default router;
