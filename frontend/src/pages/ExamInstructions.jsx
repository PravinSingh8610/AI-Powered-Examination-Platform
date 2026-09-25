import { useNavigate } from "react-router-dom";

function ExamInstructions() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">

      <div className="mx-auto max-w-4xl">

        {/* ================= HEADER ================= */}
        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl">
            📝
          </div>

          <h1 className="mt-5 text-3xl font-bold">
            Exam Instructions
          </h1>

          <p className="mt-2 text-slate-400">
            Please read all instructions carefully before starting.
          </p>

        </div>


        {/* ================= EXAM INFO ================= */}
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <h2 className="text-xl font-bold">
            Java Full Stack
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Online Technical Assessment
          </p>


          <div className="mt-5 grid gap-4 sm:grid-cols-3">

            {/* Questions */}
            <div className="rounded-xl bg-slate-950 p-4">

              <p className="text-sm text-slate-500">
                Questions
              </p>

              <p className="mt-2 text-xl font-bold">
                30
              </p>

            </div>


            {/* Duration */}
            <div className="rounded-xl bg-slate-950 p-4">

              <p className="text-sm text-slate-500">
                Duration
              </p>

              <p className="mt-2 text-xl font-bold">
                30 Minutes
              </p>

            </div>


            {/* Proctoring */}
            <div className="rounded-xl bg-slate-950 p-4">

              <p className="text-sm text-slate-500">
                Proctoring
              </p>

              <p className="mt-2 text-xl font-bold text-green-400">
                AI Enabled
              </p>

            </div>

          </div>

        </div>


        {/* ================= EXAM RULES ================= */}
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <h2 className="text-xl font-bold">
            Examination Rules
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Please follow these rules during the examination.
          </p>


          <div className="mt-5 space-y-4">

            {/* Rule 1 */}
            <div className="flex gap-3">

              <span className="text-green-400">
                ✓
              </span>

              <p className="text-slate-300">
                Allow camera access before starting the examination.
              </p>

            </div>


            {/* Rule 2 */}
            <div className="flex gap-3">

              <span className="text-green-400">
                ✓
              </span>

              <p className="text-slate-300">
                Keep your face clearly visible in the camera throughout
                the examination.
              </p>

            </div>


            {/* Rule 3 */}
            <div className="flex gap-3">

              <span className="text-yellow-400">
                ⚠
              </span>

              <p className="text-slate-300">
                Do not switch browser tabs or windows during the exam.
              </p>

            </div>


            {/* Rule 4 */}
            <div className="flex gap-3">

              <span className="text-yellow-400">
                ⚠
              </span>

              <p className="text-slate-300">
                Multiple faces may be detected as a proctoring violation.
              </p>

            </div>


            {/* Rule 5 */}
            <div className="flex gap-3">

              <span className="text-red-400">
                !
              </span>

              <p className="text-slate-300">
                Suspicious activities may be recorded in the violation
                log.
              </p>

            </div>


            {/* Rule 6 */}
            <div className="flex gap-3">

              <span className="text-red-400">
                !
              </span>

              <p className="text-slate-300">
                Make sure your internet connection remains stable during
                the examination.
              </p>

            </div>

          </div>

        </div>


        {/* ================= PROCTORING INFORMATION ================= */}
        <div className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600/20 text-2xl">
              🛡️
            </div>

            <div>

              <h3 className="font-semibold text-blue-400">
                AI Proctoring Enabled
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Your webcam and browser activity may be monitored during
                the examination to maintain examination integrity.
              </p>

            </div>

          </div>

        </div>


        {/* ================= START EXAM ================= */}
        <div className="mt-8 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 text-center">

          <p className="text-sm text-slate-400">
            Make sure your camera and microphone are working before you
            continue.
          </p>


          {/* CONNECTED BUTTON */}
          <button
            onClick={() => navigate("/exam")}
            className="mt-5 rounded-xl bg-blue-600 px-10 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Continue to Exam →
          </button>

        </div>


        {/* ================= BACK BUTTON ================= */}
        <div className="mt-5 text-center">

          <button
            onClick={() => navigate("/student-dashboard")}
            className="text-sm text-slate-500 transition hover:text-white"
          >
            ← Back to Dashboard
          </button>

        </div>

      </div>

    </div>
  );
}

export default ExamInstructions;