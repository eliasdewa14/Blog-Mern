import { Button } from "flowbite-react";
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  // Initialize
  const auth = getAuth(app);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    // Create a provider
    const provider = new GoogleAuthProvider();
    // To make the popup always ask your account
    provider.setCustomParameters({ prompt: 'select_account' });
    // To open the popup window
    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      // To send the data to backend
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          googlePhotoUrl: resultFromGoogle.user.photoURL
      })
    });
    const data = await res.json();
    if (res.ok) {
      dispatch(signInSuccess(data));
      navigate('/');
    }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
      <FcGoogle color='blue' className="w-5 h-5 mr-2"/>
      Continue with Google
    </Button>
  )
}
