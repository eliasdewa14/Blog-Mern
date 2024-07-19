import { Link, useNavigate } from "react-router-dom";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import OAuth from "../components/OAuth";
import toast from 'react-hot-toast';


export default function SignUp() {
  // Initialization
  const [formData, setFormData] = useState({})

  // Initial error and loading state
  const [loading, setLoading] = useState(false);
  // Navigation
  const navigate = useNavigate();

  // getting data from input
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value.trim()});
  };

  //submit the data to the server
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent refreshing the page when submitting
    try {
      setLoading(true)
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        toast.error(data.message);
      }
      setLoading(false);
      if (res.ok) {
        toast.success("User Signed Up Successfully");
        navigate('/sign-in');
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* Left side */}
        <div className="flex-1">
          <Link to="/" className='text-4xl font-bold'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Elias's</span>
            Blog
          </Link>
          <p className="text-sm mt-5">This is a demo project. You can sign up with your email and password or with your google account</p>
        </div>
        {/* Right side */}
        <div className="flex-1 py-10 px-5 rounded-lg bg-slate-300 dark:bg-[#121212]">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className="pl-3">Loading...</span>
                </>
              ) : ("Sign Up")
              }
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/sign-in' className="text-blue-500">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  )
}