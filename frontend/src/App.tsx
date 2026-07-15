import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignUpPage from "./pages/auth/SignUpPage";
import SignInPage from "./pages/auth/SignInPage";
import ProjectsPage from "./pages/projects/ProjectsPage";
import ProjectPage from "./pages/projects/ProjectPage";
import { Toaster } from "sonner";

export default function App() {

  return (
    <div className="min-h-screen bg-slate-50">

      <Toaster richColors duration={2000} expand position="bottom-left" />

      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8 md:py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
        </Routes>
      </main>

    </div>
  )
}