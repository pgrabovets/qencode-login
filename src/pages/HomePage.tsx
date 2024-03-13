import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.log('navigate')
      navigate('/login')
    }
  }, [])

  return (
    <h1>Welcome to the Home Page!!!</h1>
  )
}
