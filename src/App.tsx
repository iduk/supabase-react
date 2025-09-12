import RouteIndex from "./routes"
import { Routes, Route } from "react-router-dom"

function App() {
    return (
        <>
            <Routes>
                {RouteIndex().map(({ path, component }, idx) => (
                    <Route key={idx} path={path} element={component} />
                ))}
            </Routes>
        </>
    )
}

export default App
