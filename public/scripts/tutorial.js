var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];


var CommentBox = React.createClass({
  handleSuccess: function(response) {
    this.setState({data: response.data})
  },
  handleError: function(response) {
    if (response instanceof Error) {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', response.message);
    } else {
      // The request was made, but the server didn't respond with 2xx
      console.error(this.props.url, response);
    }
  },
  loadCommentsFromServer: function() {
    axios.get(this.props.url)
      .then(this.handleSuccess)
      .catch(this.handleError);
  },
  handleCommentSubmit: function(comment) {
    comment.id = Date.now();
    this.setState({data: this.state.data.concat([comment])});
    axios.post(this.props.url, comment)
      .then(this.handleSuccess)
      .catch(this.handleError);
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
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
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
  getInitialState: function() {
    return {
      author: '',
      text: ''
    }
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author: '', text: ''});
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <textarea
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Post"/>
      </form>
    )
  }
});

ReactDOM.render(<CommentBox url='/api/comments' pollInterval={2000} />, document.getElementById('content'));
