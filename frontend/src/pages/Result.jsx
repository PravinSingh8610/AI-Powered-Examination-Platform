import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const navigate = useNavigate();
  const location = useLocation();

  // =====================================================
  // RESULT DATA
  // =====================================================

  // Result data Exam.jsx se aayega.
  // Agar direct Result page open kiya gaya hai,
  // to demo data use hoga.
  const resultData = location.state || {
    totalQuestions: 30,
    attempted: 0,
    correct: 0,
    wrong: 0,
    unattempted: 30,
    violations: 0,
    timeTaken: "00:00",
  };

  const {
    totalQuestions,
    attempted,
    correct,
    wrong,
    unattempted,
    violations,
    timeTaken,
  } = resultData;

  // =====================================================
  // SAVE RESULT TO LOCAL STORAGE
  // =====================================================

  useEffect(() => {
    if (!location.state) {
      return;
    }

    try {
      const resultToSave = {
        totalQuestions,
        attempted,
        correct,
        wrong,
        unattempted,
        violations,
        timeTaken,
        percentage: totalQuestions
          ? Math.round((correct / totalQuestions) * 100)
          : 0,
      };

      localStorage.setItem("examResult", JSON.stringify(resultToSave));
    } catch (error) {
      console.error("Failed to save exam result:", error);
    }
  }, [
    location.state,
    totalQuestions,
    attempted,
    correct,
    wrong,
    unattempted,
    violations,
    timeTaken,
  ]);

  // =====================================================
  // CALCULATE PERCENTAGE
  // =====================================================

  const percentage = useMemo(() => {
    if (!totalQuestions) {
      return 0;
    }

    return Math.round((correct / totalQuestions) * 100);
  }, [correct, totalQuestions]);

  // =====================================================
  // PASS / FAIL
  // =====================================================

  const passed = percentage >= 40;

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* ========================= HEADER ========================= */}

      <header className="border-b border-slate-800 bg-slate-900 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Logo */}

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
              🛡️
            </div>

            <div>
              <h1 className="font-bold">AI-Proctor</h1>

              <p className="text-xs text-slate-500">
                Java Full Stack Examination
              </p>
            </div>
          </div>

          {/* Completed Badge */}

          <div className="rounded-full bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-400">
            ✓ Exam Completed
          </div>
        </div>
      </header>

      {/* ========================= MAIN ========================= */}

      <main className="mx-auto max-w-5xl px-6 py-10">
        {/* ========================= RESULT HEADER ========================= */}

        <section className="text-center">
          <div
            className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${
              passed ? "bg-green-500/10" : "bg-red-500/10"
            }`}
          >
            <span className="text-4xl">{passed ? "🎉" : "📚"}</span>
          </div>

          <h2 className="mt-5 text-3xl font-bold">Exam Completed</h2>

          <p className="mt-2 text-slate-400">Java Full Stack Examination</p>
        </section>

        {/* ========================= SCORE CARD ========================= */}

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Your Score
            </p>

            <div
              className={`mt-3 text-6xl font-bold ${
                passed ? "text-green-400" : "text-red-400"
              }`}
            >
              {percentage}%
            </div>

            <p className="mt-2 text-slate-400">
              {correct} out of {totalQuestions} answers correct
            </p>
          </div>

          {/* SCORE PROGRESS */}

          <div className="mx-auto mt-8 max-w-xl">
            <div className="h-3 overflow-hidden rounded-full bg-slate-800">
              <div
                className={`h-full rounded-full transition-all ${
                  passed ? "bg-green-500" : "bg-red-500"
                }`}
                style={{
                  width: `${percentage}%`,
                }}
              />
            </div>
          </div>

          {/* PASS / FAIL */}

          <div className="mt-8 flex justify-center">
            <div
              className={`rounded-full px-6 py-3 text-sm font-bold ${
                passed
                  ? "bg-green-500/10 text-green-400"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              {passed ? "🟢 PASSED" : "🔴 FAILED"}
            </div>
          </div>
        </section>

        {/* ========================= STATISTICS ========================= */}

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* TOTAL */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Total Questions</span>

              <span className="text-2xl">📝</span>
            </div>

            <p className="mt-3 text-3xl font-bold">{totalQuestions}</p>
          </div>

          {/* CORRECT */}

          <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Correct</span>

              <span className="text-2xl">✅</span>
            </div>

            <p className="mt-3 text-3xl font-bold text-green-400">{correct}</p>
          </div>

          {/* WRONG */}

          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Wrong</span>

              <span className="text-2xl">❌</span>
            </div>

            <p className="mt-3 text-3xl font-bold text-red-400">{wrong}</p>
          </div>

          {/* UNATTEMPTED */}

          <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Unattempted</span>

              <span className="text-2xl">⏳</span>
            </div>

            <p className="mt-3 text-3xl font-bold text-yellow-400">
              {unattempted}
            </p>
          </div>
        </section>

        {/* ========================= EXAM DETAILS ========================= */}

        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-lg font-bold">Exam Details</h3>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {/* EXAM */}

            <div className="rounded-xl bg-slate-950 p-4">
              <p className="text-xs text-slate-500">Exam</p>

              <p className="mt-1 font-semibold">Java Full Stack Examination</p>
            </div>

            {/* TIME */}

            <div className="rounded-xl bg-slate-950 p-4">
              <p className="text-xs text-slate-500">Time Taken</p>

              <p className="mt-1 font-semibold">{timeTaken}</p>
            </div>

            {/* ATTEMPTED */}

            <div className="rounded-xl bg-slate-950 p-4">
              <p className="text-xs text-slate-500">Attempted</p>

              <p className="mt-1 font-semibold">
                {attempted} / {totalQuestions}
              </p>
            </div>

            {/* VIOLATIONS */}

            <div className="rounded-xl bg-slate-950 p-4">
              <p className="text-xs text-slate-500">Proctoring Violations</p>

              <p
                className={`mt-1 font-semibold ${
                  violations > 0 ? "text-red-400" : "text-green-400"
                }`}
              >
                {violations}
              </p>
            </div>
          </div>
        </section>

        {/* ========================= PERFORMANCE ========================= */}

        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-lg font-bold">Performance Summary</h3>

          <div className="mt-5 space-y-4">
            {/* CORRECT */}

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-400">Correct Answers</span>

                <span className="text-green-400">{correct}</span>
              </div>

              <div className="h-2 rounded-full bg-slate-800">
                <div
                  className="h-2 rounded-full bg-green-500"
                  style={{
                    width: `${
                      totalQuestions ? (correct / totalQuestions) * 100 : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* WRONG */}

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-400">Wrong Answers</span>

                <span className="text-red-400">{wrong}</span>
              </div>

              <div className="h-2 rounded-full bg-slate-800">
                <div
                  className="h-2 rounded-full bg-red-500"
                  style={{
                    width: `${
                      totalQuestions ? (wrong / totalQuestions) * 100 : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* UNATTEMPTED */}

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-400">Unattempted</span>

                <span className="text-yellow-400">{unattempted}</span>
              </div>

              <div className="h-2 rounded-full bg-slate-800">
                <div
                  className="h-2 rounded-full bg-yellow-500"
                  style={{
                    width: `${
                      totalQuestions ? (unattempted / totalQuestions) * 100 : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ========================= AI PROCTORING ========================= */}

        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold">AI Proctoring Report</h3>

              <p className="mt-1 text-sm text-slate-500">
                Examination monitoring summary
              </p>
            </div>

            <div
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                violations === 0
                  ? "bg-green-500/10 text-green-400"
                  : "bg-yellow-500/10 text-yellow-400"
              }`}
            >
              {violations === 0
                ? "✓ Clean"
                : `⚠ ${violations} Violation${violations > 1 ? "s" : ""}`}
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-slate-950 p-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{violations === 0 ? "🟢" : "🟠"}</span>

              <div>
                <p className="font-medium">
                  {violations === 0
                    ? "No suspicious activity detected"
                    : "Suspicious activity was detected"}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {violations === 0
                    ? "Camera, face detection and examination monitoring completed successfully."
                    : "Please review the violation count before evaluating the examination."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================= ACTION BUTTONS ========================= */}

        <section className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => navigate("/student-dashboard")}
            className="rounded-xl border border-slate-700 px-6 py-3 font-semibold transition hover:bg-slate-800"
          >
            ← Back to Dashboard
          </button>

          <button
            onClick={() => navigate("/exam")}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
          >
            🔄 Retake Exam
          </button>
        </section>

        {/* ========================= FOOTER ========================= */}

        <p className="mt-8 text-center text-xs text-slate-600">
          AI-Proctor • Java Full Stack Examination
        </p>
      </main>
    </div>
  );
}

export default Result;
