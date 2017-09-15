var MongooseDao  = require('mongoosedao');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CategorySchema = new Schema({
		name: 				{ type: 'string' },
		createdate: 		{ type: Date, default: Date.now },
		headurl: 			{ type: 'string' },
		ordernumber: 		{ type: Number,default:1 }
});
var CategoryModel = mongoose.model('CategoryModel', CategorySchema);

var MeetingDao = new MongooseDao(CategoryModel);
 
module.exports = {
 CategoryModel:CategoryModel,
 CategoryDao:MeetingDao
};