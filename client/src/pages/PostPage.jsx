import { Button, Spinner } from "flowbite-react"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import CallToAction from "../components/CallToAction"
import CommentSection from "../components/CommentSection"
export default function PostPage() {
  // to get the slug url
  const { postSlug } = useParams()
  // to show spinner for loading the page
  const [loading, setLoading] = useState(true)
  // to show error message
  const [error, setError] = useState(false)
  // to show post status
  const [post, setPost] = useState(null)
  useEffect(() => {
    // console.log(postSlug)
    const fetchPost = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`)
        const data = await res.json()
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchPost()
  },[postSlug])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size='xl'/>
      </div>
    )
  }
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">{post && post.title}</h1>
      <Link to={`/search?category=${post && post.category}`} className="self-center mt-5">
        <Button size='xs'>{post && post.category}</Button>
      </Link>
      <img src={post && post.image} alt={post.title} className="m-10 px-3 max-h-[600px] md:w-full object-cover" />
      <div className="flex justify-between p-3 max-w-2xl mx-auto w-full border-b border-slate-500 text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">{post && (post.content.length / 1000).toFixed(0)} mins read</span>
      </div>
      <div className="p-3 max-w-2xl mx-auto w-full post-content" dangerouslySetInnerHTML={{__html: post && post.content}}></div>
      <div className="w-full mx-auto">
        <CallToAction />
      </div>
      <div>
        <CommentSection postId={post._id} />
      </div>
    </main>
  )
}
