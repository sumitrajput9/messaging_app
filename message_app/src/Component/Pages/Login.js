import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"
import { userLogin } from "../../Services/ApiServices"
// import { login } from "../Services/apIServices"

function Login() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [showPassword, setShowPassword] = useState(false)

    const { email, password } = formData

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                email,
                password,
            }
            const data = await userLogin(payload);
            console.log('Login successful:', data.data);

            if (data?.data) {
                localStorage.setItem('token',data?.data.token)
                localStorage.setItem('user',JSON.stringify(data?.data.user))
                navigate('/home/user-profile');
            }
        } catch (error) {
            console.error('Login failed:', error);
            // Handle error feedback to the user if necessary
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <form
                onSubmit={handleOnSubmit}
                className="w-full max-w-md p-8 bg-white rounded-lg shadow-md"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Sign In
                </h2>

                <label className="w-full">
                    <p className="mb-1 text-sm text-gray-700">
                        Email Address <sup className="text-red-500">*</sup>
                    </p>
                    <input
                        required
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleOnChange}
                        placeholder="Enter email address"
                        className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </label>

                <label className="relative w-full mt-4">
                    <p className="mb-1 text-sm text-gray-700 mt-2">
                        Password <sup className="text-red-500">*</sup>
                    </p>
                    <input
                        required
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={handleOnChange}
                        placeholder="Enter Password"
                        className="w-full px-4 py-2 border rounded-md pr-10 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    {/* <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-9 cursor-pointer text-gray-500"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} />
            ) : (
              <AiOutlineEye fontSize={24} />
            )}
          </span> */}
                </label>

                {/* <Link to="/forgot-password">
          <p className="mt-2 text-xs text-right text-blue-500">
            Forgot Password?
          </p>
        </Link> */}

                <button
                    type="submit"
                    className="mt-6 w-full py-2 bg-yellow-500 text-white rounded-md font-medium hover:bg-blue-600 transition"
                >
                    Sign In
                </button>
                <button
                    className="mt-2 w-full py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-yellow-600 transition"
                    onClick={() => navigate("/register")}
                >
                   Register
                </button>
            </form>
        </div>
    )
}

export default Login
