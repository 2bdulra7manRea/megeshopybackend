var mongoose=require('mongoose');

var schema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
  },
  pictures: {
    type: Array,
  },
  category: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
});

module.exports=mongoose.model('product',schema)