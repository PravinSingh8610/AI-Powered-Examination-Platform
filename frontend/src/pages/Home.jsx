import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
              🛡️
            </div>

            <div>
              <h2 className="font-bold">AI-Proctor</h2>
              <p className="text-xs text-slate-500">Smart Examination</p>
            </div>
          </Link>

          {/* Navigation */}
          <div className="hidden gap-8 md:flex">
            <a href="#features" className="text-slate-300 hover:text-blue-400">
              Features
            </a>

            <a
              href="#how-it-works"
              className="text-slate-300 hover:text-blue-400"
            >
              How It Works
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="flex gap-3">
            <Link
              to="/login"
              className="rounded-lg px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold hover:bg-blue-700"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <div className="mb-6 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
              🛡️ AI-Powered Examination Platform
            </div>

            <h1 className="text-5xl font-bold leading-tight md:text-6xl">
              Smart Exams.
              <span className="block text-blue-500">Smarter Proctoring.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
              Conduct secure online examinations with AI-powered proctoring,
              real-time monitoring and automated suspicious activity detection.
            </p>

            <div className="mt-8 flex gap-4">
              {/* Start Examination -> Login */}
              <Link
                to="/login"
                className="rounded-xl bg-blue-600 px-7 py-3.5 font-semibold hover:bg-blue-700"
              >
                🚀 Start Examination
              </Link>

              <a
                href="#features"
                className="rounded-xl border border-slate-700 px-7 py-3.5 font-semibold text-slate-300 hover:border-blue-500"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-2xl">
            <div className="mb-5 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />

              <div className="ml-3 flex-1 rounded-lg bg-slate-800 px-4 py-2 text-xs text-slate-500">
                ai-proctor.com/examination
              </div>
            </div>

            <div className="rounded-xl bg-slate-800 p-5">
              <div className="flex justify-between">
                <span className="text-slate-400">Current Examination</span>

                <span className="text-green-400">● Live</span>
              </div>

              <h3 className="mt-5 text-2xl font-bold">Java Full Stack</h3>

              <p className="mt-2 text-sm text-slate-500">
                30 Questions • 30 Minutes
              </p>

              <div className="mt-6 h-2 rounded-full bg-slate-700">
                <div className="h-2 w-2/3 rounded-full bg-blue-600" />
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-slate-950 p-3 text-center">
                  <p className="font-bold">20</p>
                  <p className="text-xs text-slate-500">Questions</p>
                </div>

                <div className="rounded-lg bg-slate-950 p-3 text-center">
                  <p className="font-bold text-blue-400">18:42</p>
                  <p className="text-xs text-slate-500">Remaining</p>
                </div>

                <div className="rounded-lg bg-slate-950 p-3 text-center">
                  <p className="font-bold text-green-400">0</p>
                  <p className="text-xs text-slate-500">Violations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-slate-800 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-blue-500">POWERFUL FEATURES</p>

            <h2 className="mt-3 text-4xl font-bold">
              Secure Online Examination
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Everything required to conduct reliable and secure online
              examinations.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "📷",
                "Face Detection",
                "Detect and monitor the candidate's face.",
              ],
              [
                "👥",
                "Multiple Face Detection",
                "Detect multiple people during an exam.",
              ],
              [
                "🖥️",
                "Tab Monitoring",
                "Monitor tab switching and window focus.",
              ],
              ["📊", "Violation Logs", "Maintain detailed proctoring records."],
            ].map(([icon, title, description]) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-blue-500"
              >
                <div className="text-3xl">{icon}</div>

                <h3 className="mt-5 text-lg font-semibold">{title}</h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-slate-900/50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-blue-500">HOW IT WORKS</p>

            <h2 className="mt-3 text-4xl font-bold">
              Simple Examination Process
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {[
              ["01", "Register", "Create your student account."],
              ["02", "Login", "Login securely to your account."],
              ["03", "Take Exam", "Enable camera and start examination."],
              ["04", "Get Result", "View your result after submission."],
            ].map(([number, title, description]) => (
              <div key={number} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 font-bold">
                  {number}
                </div>

                <h3 className="mt-5 font-semibold">{title}</h3>

                <p className="mt-3 text-sm text-slate-500">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-800 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-bold">
            Ready to Start Your Examination?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Login to your student account and continue to your examination
            dashboard.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/login"
              className="rounded-xl bg-blue-600 px-7 py-3.5 font-semibold hover:bg-blue-700"
            >
              Login & Start Exam
            </Link>

            <Link
              to="/register"
              className="rounded-xl border border-slate-700 px-7 py-3.5 font-semibold text-slate-300 hover:border-blue-500"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-slate-500">
          © 2026 AI-Proctor — Online Examination & Proctoring Platform
        </div>
      </footer>
    </div>
  );
}

export default Home;
