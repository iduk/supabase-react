import LoginForm from "../app/Auth/LoginForm"
import RegisterForm from "../app/Auth/RegisterForm"
import Home from "../app/Home"

// routes page
export default function RouteIndex() {
    const routes = [
        { path: "/login", component: <LoginForm /> },
        { path: "/register", component: <RegisterForm /> },
        { path: "/", component: <Home /> },
    ]
    return routes
}
