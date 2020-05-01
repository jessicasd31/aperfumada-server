const express = require('express');
const routes = express.Router();

const ProductController = require('./controllers/ProductController')
const CategoryController = require('./controllers/CategoryController')
const CourseController = require('./controllers/CourseController')

routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);
routes.post('/products', ProductController.store);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.destroy);

routes.get('/categories', CategoryController.index);
routes.post('/categories', CategoryController.store);
routes.put('/categories/:id', CategoryController.update);
routes.delete('/categories/:id', CategoryController.destroy);

routes.get('/courses', CourseController.index);
routes.get('/courses/:id', CourseController.show);
routes.post('/courses', CourseController.store);
routes.put('/courses/:id', CourseController.update);
routes.delete('/courses/:id', CourseController.destroy);

module.exports = routes;
