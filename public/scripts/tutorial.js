var CommentList = React.createClass({
  render: function() {
    return (
      <div className="commentList">
        I am CommentList
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

ReactDOM.render(<CommentBox/>, document.getElementById('content'));
