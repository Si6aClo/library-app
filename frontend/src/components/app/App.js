// App returns page with Router and appHeader element
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import MainPage from "../pages/MainPage";
import SingleBookPage from "../pages/singleBookPage/SingleBookPage";
import CategoriesPage from "../pages/CategoriesPage";


const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<MainPage/>} />
            <Route path="/categories" element={<CategoriesPage/>} />
            <Route path="/:bookId" element={<SingleBookPage/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
