/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api')
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	// Route / to the blog all api end point. This is the defualt use case,
	// as we want to handle routing on the js framework side.

	app.get('/', keystone.middleware.api, routes.views.index);
	//turn these back on by need.

	//app.get('/blog/:category?', routes.views.blog);
	//app.get('/blog/post/:post', routes.views.post);
	//app.get('/gallery', routes.views.gallery);
	//app.all('/contact', routes.views.contact);

	// app.get('/api/post/list', keystone.middleware.api, routes.api.posts.list);
	// app.all('/api/post/create', keystone.middleware.api, routes.api.posts.create);
	// app.get('/api/post/:id', keystone.middleware.api, routes.api.posts.get);
	// app.all('/api/post/:id/update', keystone.middleware.api, routes.api.posts.update);
	// app.get('/api/post/:id/remove', keystone.middleware.api, routes.api.posts.remove);

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
