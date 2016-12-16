var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },

  text: {
    type: String,
    required: true
  },
  // reference to the user who created this post
  author:
        {type: Schema.Types.ObjectId,
         ref: 'users',
         required:true
       },

  categories: [{ type: Schema.Types.ObjectId, ref: 'categories' }]
});

module.exports = mongoose.model('posts', PostSchema);
