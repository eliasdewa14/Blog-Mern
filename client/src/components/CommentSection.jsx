import { Alert, Button, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import Comment from "./Comment";


export default function CommentSection({ postId }) {
  const { currentUser } = useSelector(state => state.user);

  const [comment, setComment] = useState('');

  const [commentError, setCommentError] = useState(null);

  const [comments, setComments] = useState([]);
  
  const navigate = useNavigate();

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) return;
    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment('');
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data)
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);

  const handleLikes = async (commentId) => {
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, { method: 'PUT' });
      const data = await res.json();
      setComments(comments.map(comment => (
        comment._id === commentId ? {
          ...comment,
          likes: data.likes,
          numberOfLikes: data.numberOfLikes
        } : comment
      )));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="max-w-2xl w-full mx-auto p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-sm">
          <p className="text-gray-500">Signed in as:</p>
          <img className="h-6 w-6 rounded-full object-cover" src={currentUser.profilePicture} alt="user image"/>
          <Link className="text-blue-500 hover:underline" to={'/dashboard?tab=profile'}>
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="flex gap-1 my-5 text-sm">
          You must be logged in to comment.
          <Link className="text-blue-400 hover:underline" to={'/sign-in'}>Sign In</Link>
        </div>
      )}
      {currentUser && (
        <form className="border border-teal-500 rounded-md p-3" onSubmit={handleCommentSubmit}>
          <Textarea placeholder="Add a comment..." rows='3' maxLength='200' onChange={(e) => setComment(e.target.value)} value={comment}/>
          <div className="flex justify-between items-center my-5">
            <p className="text-gray-500 text-xs">{200 - comment.length} characters remaining</p>
            <Button type="submit" className="" outline gradientDuoTone='purpleToPink'>
              Submit
            </Button>
          </div>
          {commentError && <Alert color='failure'>{commentError}</Alert>}
        </form>
      )}

      {comments.length === 0 ? (
        <p className="text-sm my-5">No comments yet!</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>
          <div>
            {comments.map(comment => (
              <Comment key={comment._id} comment={comment} onLike={handleLikes} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
