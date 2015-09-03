var Api = require('../utils/api');
var Reflux = require('reflux');
var Actions = require('../actions');

module.exports = Reflux.createStore({
  // if any of the array of actions gets called and this store has
  // a method with the same name then call that method.  In this case
  // we just have the one action, Action, which has an action called getTopics
  listenables: [Actions],
  
  // getTopics is triggered by listenables when componentWillMount is called in topic-list.jsx 
  getTopics: function() {
    return Api.get('topics/defaults') // ajax request
      .then(function(json) { // run this function when ajax request has completed
        // this.topics is saved as the returned json with a key of 'data'
        this.topics = json.data;
        // with data successfully fetched, triggerChange is called
        this.triggerChange(); 
    }.bind(this));
  },
  
  triggerChange: function() {
    // trigger is a method provided by reflux
    // 'change' is the name of the event we want to trigger
    // this.topics is the information we want to share
    this.trigger('change', this.topics); 
  }
});