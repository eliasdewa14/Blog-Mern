import { Alert, Button, Textarea } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector(state => state.user);

  const [comment, setComment] = useState('');

  const [commentError, setCommentError] = useState(null);

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
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };
  return (
    <div>
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
    </div>
  )
}
