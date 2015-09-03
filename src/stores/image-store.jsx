var Api = require('../utils/api');
var Reflux = require('reflux');
var Actions = require('../actions');
var _ = require('lodash'); // by convention refer to lodash by '_'

module.exports = Reflux.createStore({
  listenables: [Actions],
  
  getImages: function(topicId) {
    Api.get('topics/' + topicId)
      .then(function(json) {
        // reject constructs a new array and returns it
        // json.data is an array of images and each image is checked to see 
        // if it has a property 'is_album'. If this is the case then that image
        // is rejected from the new array
        this.images = _.reject(json.data, function(image) {
          return image.is_album
        });
        this.triggerChange();
      }.bind(this));
  },
  
  getImage: function(id) {
    Api.get('gallery/image/' + id)
      .then(function(json) {
        if(this.images) {
          this.images.push(json.data);
        } else {
          this.images = [json.data]; 
        }
        this.triggerChange();
      }.bind(this));
  },
  
  find: function(id) {
    var image = _.findWhere(this.images, {id: id});
    
    if(image) {
      return image
    } else {
      this.getImage(id);
      return null
    }
  },
  
  triggerChange: function() {
    this.trigger('change', this.images); 
  }
});