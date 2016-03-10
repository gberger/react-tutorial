var CommentList = React.createClass({
  render: function() {
    return (
      <div className="commentList">
        <Comment author="Pete Hunt">This is a comment.</Comment>
        <Comment author="Guilherme Berger">*Another* comment!</Comment>
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



var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList />
        <CommentForm />
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

ReactDOM.render(<CommentBox/>, document.getElementById('content'));
