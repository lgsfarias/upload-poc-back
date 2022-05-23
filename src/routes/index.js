import recipesRouter from './recipesRouter.js';

function init(app) {
    app.use(recipesRouter);
}

export default init;
