import { SquareMenu, Home, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


export default function Navbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const location = useLocation();

    const { user, logOut } = useAuth()

    function isActive(path: string) {
        return location.pathname === path
    }

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4">
                <div className="h-16 flex items-center justify-between">

                <div className="flex items-center gap-8">
                    <Link
                    to="/"
                    className="flex items-center gap-3"
                    >
                    <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
                        <Home size={20} className="text-white" />
                    </div>

                    <h1 className="font-bold text-xl text-slate-900">
                        TaskFlow
                    </h1>
                    </Link>

                    <div className="hidden md:flex items-center gap-2">
                    <Link
                        to="/projects"
                        className={`px-4 py-2 rounded-xl transition ${
                        isActive("/projects")
                            ? "bg-slate-100 text-slate-900"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                    >
                        Projects
                    </Link>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-3">
                    {user ? (
                    <>
                        <div className="text-sm text-slate-500">
                        {user.email}
                        </div>

                        <button
                        onClick={logOut}
                        className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition cursor-pointer"
                        >
                        Logout
                        </button>
                    </>
                    ) : (
                    <>
                        <Link
                        to="/signin"
                        className={`px-4 py-2 rounded-xl transition ${
                            isActive("/signin")
                            ? "bg-slate-100 text-slate-900"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                        >
                        Sign In
                        </Link>

                        <Link
                        to="/signup"
                        className={`px-4 py-2 rounded-xl transition ${
                            isActive("/signup")
                            ? "bg-slate-800 text-white"
                            : "bg-slate-900 text-white hover:bg-slate-800"
                        }`}
                        >
                        Get Started
                        </Link>
                    </>
                    )}

                    <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
                    >
                    {isOpen ? <X size={22} /> : <SquareMenu size={22} />}
                    </button>
                </div>

                <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
                >
                    {isOpen ? <X size={22} /> : <SquareMenu size={22} />}
                </button>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2">
                <Link
                    to="/projects"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100"
                >
                    Projects
                </Link>

                {user ? (
                    <>
                    <div className="px-4 py-3 text-sm text-slate-500">
                        {user.email}
                    </div>

                    <button
                        onClick={logOut}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 text-white"
                    >
                        Logout
                    </button>
                    </>
                ) : (
                    <>
                    <Link
                        to="/signin"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100"
                    >
                        Sign In
                    </Link>

                    <Link
                        to="/signup"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-3 rounded-xl bg-slate-900 text-white text-center"
                    >
                        Get Started
                    </Link>
                    </>
                )}
                </div>
            )}
        </nav>
    );
}