"use client"
import Link from "next/link";
import { Dumbbell } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const quotes = [
  "Success doesn’t come from what you do occasionally, it comes from what you do consistently.",
  "Strength grows in the moments when you think you can’t go on but you keep going anyway.",
  "Every rep gets you closer to your goal.",
  "Discipline beats motivation.",
];

export default function Login() {
  const router = useRouter();

  const [quoteIndex, setQuoteIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showWelcomeToast, setShowWelcomeToast] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Show the toast
    setShowWelcomeToast(true);

    // Start exit animation after 7s
    const exitTimer = setTimeout(() => {
      setIsExiting(true); // trigger exit animation
      // Unmount toast after exit animation finishes (600ms matches CSS duration)
      setTimeout(() => setShowWelcomeToast(false), 600);
    }, 7000);

    return () => clearTimeout(exitTimer);
  }, []);


  useEffect(() => {
    const currentQuote = quotes[quoteIndex];

    if (charIndex < currentQuote.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentQuote[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 40); // typing speed
      return () => clearTimeout(timeout);
    } else {
      const pause = setTimeout(() => {
        setDisplayedText("");
        setCharIndex(0);
        setQuoteIndex((prev) => (prev + 1) % quotes.length);
      }, 2500); // delay before next quote
      return () => clearTimeout(pause);
    }
  }, [charIndex, quoteIndex]);

  // Toast helper
  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      showToastMessage("Please enter email and password.");
      return;
    }

    setIsLoading(true);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiBase}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Assuming any non-200 means invalid credentials
        showToastMessage("Invalid credentials. Login failed.");
        return;
      }

      const data = await response.json();

      if (data.Login_token) {
        localStorage.setItem("user", JSON.stringify(data));
        setTimeout(() => {
          router.push("/dashboard");
        }, 50);
      } else {
        showToastMessage("Invalid credentials. Login failed");
      }
    } catch (error) {
      showToastMessage("An error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  }
    ;
  return (
    <div
      className="min-h-screen text-white bg-gradient-to-r from-green-500/10 to-blue-500/10"
      style={{
        backgroundImage: `
          radial-gradient(at bottom left, rgba(220, 38, 38, 0.12), transparent 70%),
          radial-gradient(at top right, rgba(34, 197, 94, 0.12), transparent 70%)
        `,
      }}
    >
      {/* Navigation Bar */}
      <nav className="relative w-full px-6 md:px-10 py-4 flex items-center justify-between border-b border-gray-800 bg-black/70 backdrop-blur-md">
        {/* Left Logo */}
        <div className="flex items-center space-x-2 z-10">
          <Dumbbell className="w-8 h-8 text-green-500 animate-pulse" />
          <span className="text-2xl font-bold">FitTrack</span>
        </div>

        {/* Center Navigation */}
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center space-x-8">
          <Link href="/" className="text-white hover:text-green-500 hover:scale-105 transition-all">Home</Link>
          <Link href="/Services" className="text-gray-300 hover:text-green-500 hover:scale-105 transition-all">Services</Link>
          <Link href="/about" className="text-gray-300 hover:text-green-500 hover:scale-105 transition-all">About</Link>
          <Link href="/contact" className="text-gray-300 hover:text-green-500 hover:scale-105 transition-all">Contact</Link>
        </div>

        {/* Right side is intentionally left empty for symmetry */}
        <div className="w-20"></div>
      </nav>

      {/* Login Section */}
      <div className="flex justify-end pr-6 md:pr-100 min-h-[calc(100vh-80px)] items-center relative">
        {/* Animated Quotes */}
        <div className="hidden md:flex flex-col justify-center items-start pr-10 w-1/2 h-full">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ fontFamily: "Segoe UI, sans-serif", color: "white", fontSize: "40px" }}
          >
            Stay Motivated!!
          </h2>
          <p
            className="text-3xl leading-relaxed whitespace-pre-wrap"
            style={{
              fontFamily: "Segoe UI, sans-serif",
              color: "white",
              minHeight: "150px",
            }}
          >
            {displayedText}
          </p>
        </div>

        {/* Login Box */}
        <div className="w-full max-w-md p-12 rounded-2xl shadow-2xl bg-black/30 backdrop-blur-md border border-white/10 space-y-6 ml-10">
          <h2 className="text-3xl font-bold text-white text-center">Login</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-900/60 text-white rounded-md border border-gray-700 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-0.5 focus:ring-green-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-900/60 text-white rounded-md border border-gray-700 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-0.5 focus:ring-green-500"
          />

          <div className="text-right text-sm">
            <Link href="/forgot-password" className="text-white hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 transition-all"
          >
            {isLoading ? ( <span className="loading loading-spinner loading-md"></span>):("Sign In")}
          </button>

          <div className="text-center text-sm">
            Don’t have an account?{" "}
            <Link href="/register" className="font-bold hover:underline">
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-md shadow-lg z-50">
          {toastMessage}
        </div>
      )}

      <div
        className={`fixed top-20 right-5 px-5 py-3 rounded-xl shadow-lg z-50
    bg-gradient-to-r from-green-500/10 to-blue-500/10
    text-white border border-green-400/20 backdrop-blur-md
    ${isExiting ? "animate-exit-right" : "animate-enter-right"}
  `}
        style={{ whiteSpace: "pre-line" }}
      >
        {"This is the admin panel of a fitness tracking website\nEmail:admin@example.com\nPassword:abd"}
      </div>





    </div>
  );
}
