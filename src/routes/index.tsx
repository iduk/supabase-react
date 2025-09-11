import Home from "../app/Home"

// routes page
export default function RouteIndex() {
    const routes = [{ path: "/", component: <Home /> }]
    return routes
}
