import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();

  // =====================================================
  // USER
  // =====================================================

  const [userName, setUserName] = useState("Student");

  // =====================================================
  // LATEST EXAM RESULT
  // =====================================================

  const [latestResult, setLatestResult] = useState(null);

  // =====================================================
  // LOAD USER + RESULT
  // =====================================================

  useEffect(() => {
    // -----------------------------
    // Load user name
    // -----------------------------

    const storedUser =
      localStorage.getItem("user") ||
      localStorage.getItem("student") ||
      localStorage.getItem("userName");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        if (parsedUser?.name) {
          setUserName(parsedUser.name);
        } else if (parsedUser?.username) {
          setUserName(parsedUser.username);
        } else if (parsedUser?.email) {
          setUserName(parsedUser.email);
        }
      } catch {
        // If stored value is plain text
        setUserName(storedUser);
      }
    }

    // -----------------------------
    // Load latest exam result
    // -----------------------------

    const savedResult = localStorage.getItem("examResult");

    if (savedResult) {
      try {
        const parsedResult = JSON.parse(savedResult);

        setLatestResult(parsedResult);
      } catch (error) {
        console.error("Failed to load exam result:", error);

        setLatestResult(null);
      }
    }
  }, []);

  // =====================================================
  // HANDLE LOGOUT
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("student");
    localStorage.removeItem("userName");

    navigate("/login");
  };

  // =====================================================
  // RESULT VALUES
  // =====================================================

  const totalQuestions = latestResult?.totalQuestions || 0;

  const attempted = latestResult?.attempted || 0;

  const correct = latestResult?.correct || 0;

  const wrong = latestResult?.wrong || 0;

  const unattempted = latestResult?.unattempted || 0;

  const violations = latestResult?.violations || 0;

  const percentage =
    latestResult?.percentage ??
    (totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0);

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* =================================================
          HEADER
      ================================================= */}

      <header className="border-b border-slate-800 bg-slate-900 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* LOGO */}

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
              🛡️
            </div>

            <div>
              <h1 className="font-bold">AI-Proctor</h1>

              <p className="text-xs text-slate-500">Student Portal</p>
            </div>
          </div>

          {/* USER */}

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">{userName}</p>

              <p className="text-xs text-slate-500">Student</p>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold transition hover:bg-slate-800"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* =================================================
            WELCOME
        ================================================= */}

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm font-semibold text-blue-400">
            Student Dashboard
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Welcome back, {userName}! 👋
          </h2>

          <p className="mt-2 text-slate-400">
            Manage your examinations and view your performance from here.
          </p>
        </section>

        {/* =================================================
            STATISTICS
        ================================================= */}

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* TOTAL EXAMS */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Total Exams</span>

              <span className="text-2xl">📝</span>
            </div>

            <p className="mt-3 text-3xl font-bold">{latestResult ? 1 : 0}</p>

            <p className="mt-1 text-xs text-slate-500">Exams completed</p>
          </div>

          {/* ATTEMPTED */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Attempted</span>

              <span className="text-2xl">✍️</span>
            </div>

            <p className="mt-3 text-3xl font-bold">{attempted}</p>

            <p className="mt-1 text-xs text-slate-500">Questions attempted</p>
          </div>

          {/* CORRECT */}

          <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Correct</span>

              <span className="text-2xl">✅</span>
            </div>

            <p className="mt-3 text-3xl font-bold text-green-400">{correct}</p>

            <p className="mt-1 text-xs text-slate-500">Correct answers</p>
          </div>

          {/* SCORE */}

          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Latest Score</span>

              <span className="text-2xl">🏆</span>
            </div>

            <p className="mt-3 text-3xl font-bold text-blue-400">
              {latestResult ? `${percentage}%` : "--"}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Latest examination score
            </p>
          </div>
        </section>

        {/* =================================================
            UPCOMING EXAM
        ================================================= */}

        <section className="mt-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Available Exams</h2>

            <p className="mt-1 text-sm text-slate-500">
              Select an examination to continue.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              {/* EXAM INFO */}

              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600/10 text-3xl">
                  💻
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold">
                      Java Full Stack Examination
                    </h3>

                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
                      Available
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-400">
                    Test your knowledge of Java, Spring Boot, React, SQL and
                    Full Stack Development.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
                    <span>📝 30 Questions</span>

                    <span>⏱️ 30 Minutes</span>

                    <span>🛡️ AI Proctored</span>
                  </div>
                </div>
              </div>

              {/* START BUTTON */}

              <button
                onClick={() => navigate("/exam-instructions")}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
              >
                Start Exam →
              </button>
            </div>
          </div>
        </section>

        {/* =================================================
            RECENT RESULT
        ================================================= */}

        <section className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Recent Results</h2>

              <p className="mt-1 text-sm text-slate-500">
                Your latest examination performance.
              </p>
            </div>

            {latestResult && (
              <button
                onClick={() =>
                  navigate("/result", {
                    state: latestResult,
                  })
                }
                className="text-sm font-semibold text-blue-400 hover:text-blue-300"
              >
                View Full Result →
              </button>
            )}
          </div>

          {/* NO RESULT */}

          {!latestResult && (
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-8 text-center">
              <div className="text-4xl">📊</div>

              <h3 className="mt-3 font-semibold">No exam completed yet</h3>

              <p className="mt-2 text-sm text-slate-500">
                Complete your first examination to see your result here.
              </p>
            </div>
          )}

          {/* RESULT */}

          {latestResult && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                {/* RESULT INFO */}

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-bold">
                      Java Full Stack Examination
                    </h3>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        percentage >= 40
                          ? "bg-green-500/10 text-green-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {percentage >= 40 ? "Passed" : "Failed"}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    Examination completed successfully.
                  </p>

                  {/* RESULT STATS */}

                  <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div>
                      <p className="text-xs text-slate-500">Score</p>

                      <p className="mt-1 font-bold text-blue-400">
                        {percentage}%
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">Correct</p>

                      <p className="mt-1 font-bold text-green-400">{correct}</p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">Wrong</p>

                      <p className="mt-1 font-bold text-red-400">{wrong}</p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">Unattempted</p>

                      <p className="mt-1 font-bold text-yellow-400">
                        {unattempted}
                      </p>
                    </div>
                  </div>
                </div>

                {/* RESULT BUTTON */}

                <button
                  onClick={() =>
                    navigate("/result", {
                      state: latestResult,
                    })
                  }
                  className="rounded-xl border border-slate-700 px-6 py-3 font-semibold transition hover:bg-slate-800"
                >
                  View Result
                </button>
              </div>
            </div>
          )}
        </section>

        {/* =================================================
            QUICK ACTIONS
        ================================================= */}

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {/* START EXAM */}

          <button
            onClick={() => navigate("/exam-instructions")}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:border-blue-500"
          >
            <div className="text-3xl">🚀</div>

            <h3 className="mt-4 font-bold">Start Examination</h3>

            <p className="mt-1 text-sm text-slate-500">
              Begin your Java Full Stack exam.
            </p>
          </button>

          {/* RESULT */}

          <button
            disabled={!latestResult}
            onClick={() =>
              navigate("/result", {
                state: latestResult,
              })
            }
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:border-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <div className="text-3xl">📈</div>

            <h3 className="mt-4 font-bold">View Result</h3>

            <p className="mt-1 text-sm text-slate-500">
              Check your latest examination result.
            </p>
          </button>

          {/* PROCTORING */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="text-3xl">🛡️</div>

            <h3 className="mt-4 font-bold">AI Proctoring</h3>

            <p className="mt-1 text-sm text-slate-500">
              Camera and face monitoring is enabled during examinations.
            </p>
          </div>
        </section>

        {/* =================================================
            EXAM STATUS
        ================================================= */}

        {latestResult && (
          <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="font-bold">Latest Exam Summary</h3>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl bg-slate-950 p-4">
                <p className="text-xs text-slate-500">Total Questions</p>

                <p className="mt-2 text-2xl font-bold">{totalQuestions}</p>
              </div>

              <div className="rounded-xl bg-slate-950 p-4">
                <p className="text-xs text-slate-500">Attempted</p>

                <p className="mt-2 text-2xl font-bold">{attempted}</p>
              </div>

              <div className="rounded-xl bg-slate-950 p-4">
                <p className="text-xs text-slate-500">Proctoring Violations</p>

                <p
                  className={`mt-2 text-2xl font-bold ${
                    violations > 0 ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {violations}
                </p>
              </div>

              <div className="rounded-xl bg-slate-950 p-4">
                <p className="text-xs text-slate-500">Time Taken</p>

                <p className="mt-2 text-2xl font-bold">
                  {latestResult.timeTaken || "--"}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* =================================================
            FOOTER
        ================================================= */}

        <p className="mt-10 pb-6 text-center text-xs text-slate-600">
          AI-Proctor • Student Examination Portal
        </p>
      </main>
    </div>
  );
}

export default StudentDashboard;
