var React = require('react');
var Reflux = require('reflux');
var TopicStore = require('../stores/topic-store');
var Actions = require('../actions');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

module.exports = React.createClass({
  // mixins are used when very different components share common functionality
  mixins: [
    // this component needs to listen to any event triggered by TopicStore
    // when any event is triggered then run the function onChange
    Reflux.listenTo(TopicStore, 'onChange')  
  ],
  
  // start with topics as an empty array so renderTopics doesn't have 
  // any errors when initially running 'map' before any data has been fetched
  // from the store
  getInitialState: function() {
    return {
      topics: []
    }
  },
  
  // when the component first renders to the document, componetWillMount will run
  componentWillMount: function() {
    // when the component is about to be rendered it calls an action called getTopics
    Actions.getTopics();
  },
  
  render: function() {
    return <div className="list-group">
      {this.renderTopics()}
    </div>
  },
  
  renderTopics: function() {
    return this.state.topics.slice(0, 4).map(function(topic) {
      return <Link to={"topics/" + topic.id} className="list-group-item" key={topic.id}>
        <h4>{topic.name}</h4>
        <p>{topic.description}</p>
      </Link>
    });
  },
  
  // take the new list of topics and set it on our state as this.state.topics
  onChange: function(event, topics) {
    // setState will trigger a re-render of this component which runs the render function
    this.setState({topics: topics}); 
  }
});