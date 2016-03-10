var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];


var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    axios.get(this.props.url)
      .then(function(response) {
        this.setState({data: response.data});
      }.bind(this))
      .catch(function(response) {
        if (response instanceof Error) {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', response.message);
        } else {
          // The request was made, but the server didn't respond with 2xx
          console.error(this.props.url, response);
        }
      }.bind(this))
  },
  getInitialState: function() {
    return {data: []}
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    )
  }
});


var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return <Comment author={comment.author} key={comment.id}>{comment.text}</Comment>
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    )
  }
});


var Comment = React.createClass({
  rawMarkup: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup }
  },

  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()}></span>
      </div>
    )
  }
});


var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        I am CommentForm
      </div>
    )
  }
});

ReactDOM.render(<CommentBox url='/api/comments' pollInterval={2000} />, document.getElementById('content'));
