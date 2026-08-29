import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import ReadingGoals from "./pages/ReadingGoals";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/reading-goals" element={<ReadingGoals />} />
        </Routes>
    );
}

export default App;