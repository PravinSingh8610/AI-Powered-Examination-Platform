import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaceDetector, FilesetResolver } from "@mediapipe/tasks-vision";

function Exam() {
  const navigate = useNavigate();

  // =====================================================
  // QUESTIONS - 30 QUESTIONS
  // =====================================================

  const questions = [
    {
      question: "Which keyword is used to create a class in Java?",
      options: ["function", "class", "object", "struct"],
      answer: "class",
    },
    {
      question:
        "Which annotation is commonly used to create a REST controller in Spring Boot?",
      options: ["@Service", "@Entity", "@RestController", "@Repository"],
      answer: "@RestController",
    },
    {
      question: "Which React Hook is used to manage state?",
      options: ["useEffect", "useState", "useContext", "useRef"],
      answer: "useState",
    },
    {
      question: "Which database is commonly used with Spring Boot?",
      options: ["MongoDB", "MySQL", "SQLite", "Redis"],
      answer: "MySQL",
    },
    {
      question: "Which protocol is commonly used by REST APIs?",
      options: ["HTTP", "FTP", "SMTP", "SSH"],
      answer: "HTTP",
    },
    {
      question: "Which keyword is used for inheritance in Java?",
      options: ["implements", "extends", "inherits", "super"],
      answer: "extends",
    },
    {
      question: "Which keyword is used to implement an interface in Java?",
      options: ["extends", "implements", "interface", "inherit"],
      answer: "implements",
    },
    {
      question: "Which collection does not allow duplicate elements?",
      options: ["List", "ArrayList", "Set", "LinkedList"],
      answer: "Set",
    },
    {
      question: "Which method is the entry point of a Java application?",
      options: ["start()", "run()", "main()", "execute()"],
      answer: "main()",
    },
    {
      question: "Which keyword is used to create an object in Java?",
      options: ["class", "new", "object", "create"],
      answer: "new",
    },
    {
      question: "Which React Hook is used for side effects?",
      options: ["useState", "useEffect", "useMemo", "useRef"],
      answer: "useEffect",
    },
    {
      question: "What does JSX stand for?",
      options: [
        "JavaScript XML",
        "Java Syntax XML",
        "Java Extended XML",
        "JSON XML",
      ],
      answer: "JavaScript XML",
    },
    {
      question: "Which command creates a new React project using Vite?",
      options: [
        "npm create vite@latest",
        "npm react create",
        "npm start vite",
        "npm install react-project",
      ],
      answer: "npm create vite@latest",
    },
    {
      question: "Which HTTP method is commonly used to retrieve data?",
      options: ["POST", "GET", "PUT", "DELETE"],
      answer: "GET",
    },
    {
      question: "Which HTTP method is commonly used to create new data?",
      options: ["GET", "POST", "DELETE", "PATCH"],
      answer: "POST",
    },
    {
      question: "Which annotation marks a Java class as a JPA entity?",
      options: ["@Table", "@Entity", "@Database", "@Model"],
      answer: "@Entity",
    },
    {
      question: "Which Spring annotation is used for dependency injection?",
      options: ["@Autowired", "@InjectBean", "@Dependency", "@Wire"],
      answer: "@Autowired",
    },
    {
      question: "Which ORM framework is commonly used with Spring Boot?",
      options: ["Hibernate", "React", "Bootstrap", "Express"],
      answer: "Hibernate",
    },
    {
      question: "Which SQL command is used to retrieve data?",
      options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
      answer: "SELECT",
    },
    {
      question: "Which SQL clause is used to filter rows?",
      options: ["ORDER BY", "GROUP BY", "WHERE", "HAVING"],
      answer: "WHERE",
    },
    {
      question: "Which SQL clause is used to filter grouped records?",
      options: ["WHERE", "HAVING", "ORDER BY", "LIMIT"],
      answer: "HAVING",
    },
    {
      question:
        "Which Java feature allows the same method name with different parameters?",
      options: [
        "Method Overloading",
        "Method Overriding",
        "Inheritance",
        "Encapsulation",
      ],
      answer: "Method Overloading",
    },
    {
      question: "Which OOP concept hides internal implementation details?",
      options: ["Inheritance", "Polymorphism", "Encapsulation", "Abstraction"],
      answer: "Abstraction",
    },
    {
      question: "Which Java keyword prevents a variable from being modified?",
      options: ["static", "final", "private", "constant"],
      answer: "final",
    },
    {
      question: "Which data structure follows FIFO?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      answer: "Queue",
    },
    {
      question: "Which keyword is used to handle exceptions in Java?",
      options: ["try", "catch", "throw", "All of these"],
      answer: "All of these",
    },
    {
      question: "Which React Hook is used to access a DOM element directly?",
      options: ["useState", "useEffect", "useRef", "useMemo"],
      answer: "useRef",
    },
    {
      question:
        "Which Spring Boot file is commonly used to configure application properties?",
      options: [
        "application.properties",
        "config.java",
        "spring.config",
        "settings.xml",
      ],
      answer: "application.properties",
    },
    {
      question: "Which SQL command is used to add a new row to a table?",
      options: ["INSERT", "UPDATE", "CREATE", "ALTER"],
      answer: "INSERT",
    },
    {
      question: "Which data structure follows LIFO?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      answer: "Stack",
    },
  ];

  // =====================================================
  // TIMER
  // =====================================================

  const EXAM_DURATION = 30 * 60;

  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION);

  // =====================================================
  // QUESTIONS / ANSWERS
  // =====================================================

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  // =====================================================
  // SUBMISSION CONTROL
  // =====================================================

  const submittedRef = useRef(false);

  // =====================================================
  // CAMERA
  // =====================================================

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraStatus, setCameraStatus] = useState("Starting...");
  const [cameraError, setCameraError] = useState("");

  // =====================================================
  // MEDIAPIPE
  // =====================================================

  const faceDetectorRef = useRef(null);
  const detectionTimerRef = useRef(null);

  const [faceCount, setFaceCount] = useState(0);
  const [faceStatus, setFaceStatus] = useState("Starting...");

  // =====================================================
  // VIOLATIONS
  // =====================================================

  const [violations, setViolations] = useState([]);

  const lastViolationRef = useRef({
    type: "",
    time: 0,
  });

  // =====================================================
  // ADD VIOLATION
  // =====================================================

  const addViolation = (type, message) => {
    const now = Date.now();

    const last = lastViolationRef.current;

    // Same violation ko 3 seconds ke andar repeat nahi karna
    if (last.type === type && now - last.time < 3000) {
      return;
    }

    lastViolationRef.current = {
      type,
      time: now,
    };

    setViolations((previous) => [
      ...previous,
      {
        id: `${now}-${Math.random()}`,
        type,
        message,
        time: new Date().toLocaleTimeString(),
      },
    ]);
  };

  // =====================================================
  // CAMERA START
  // =====================================================

  useEffect(() => {
    let mounted = true;

    const startCamera = async () => {
      try {
        console.log("Camera: Starting...");

        setCameraStatus("Requesting camera...");
        setCameraError("");

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error("Camera API is not supported by this browser.");
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: {
              ideal: 1280,
            },
            height: {
              ideal: 720,
            },
            facingMode: "user",
          },
          audio: false,
        });

        if (!mounted) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          await new Promise((resolve) => {
            if (
              videoRef.current.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA
            ) {
              resolve();
            } else {
              videoRef.current.onloadedmetadata = resolve;
            }
          });

          try {
            await videoRef.current.play();
          } catch (error) {
            console.warn("Video play warning:", error);
          }
        }

        console.log("Camera: Started successfully");

        setCameraStatus("Active");
      } catch (error) {
        console.error("Camera Error:", error);

        if (!mounted) {
          return;
        }

        setCameraStatus("Blocked");

        setCameraError(
          "Camera access failed. Please allow camera permission and reload the page.",
        );
      }
    };

    startCamera();

    return () => {
      mounted = false;

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());

        streamRef.current = null;
      }
    };
  }, []);

  // =====================================================
  // INITIALIZE MEDIAPIPE
  // =====================================================

  useEffect(() => {
    let mounted = true;

    const initializeFaceDetector = async () => {
      try {
        console.log("MediaPipe: Loading LOCAL WASM...");

        setFaceStatus("Loading AI...");

        const vision = await FilesetResolver.forVisionTasks("/mediapipe");

        console.log("MediaPipe: WASM Loaded");

        const detector = await FaceDetector.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "/mediapipe/blaze_face_short_range.tflite",
            delegate: "CPU",
          },

          runningMode: "VIDEO",

          minDetectionConfidence: 0.5,
        });

        console.log("MediaPipe: Face Detector Created");

        if (!mounted) {
          detector.close();
          return;
        }

        faceDetectorRef.current = detector;

        setFaceStatus("AI Ready");

        console.log("MediaPipe: AI Ready");
      } catch (error) {
        console.error("MEDIAPIPE INITIALIZATION ERROR:", error);

        if (!mounted) {
          return;
        }

        setFaceStatus("AI Error");
      }
    };

    initializeFaceDetector();

    return () => {
      mounted = false;

      if (detectionTimerRef.current) {
        clearInterval(detectionTimerRef.current);
        detectionTimerRef.current = null;
      }

      if (faceDetectorRef.current) {
        try {
          faceDetectorRef.current.close();
        } catch (error) {
          console.warn("Detector close warning:", error);
        }

        faceDetectorRef.current = null;
      }
    };
  }, []);

  // =====================================================
  // FACE DETECTION LOOP
  // =====================================================

  useEffect(() => {
    const detectFaces = () => {
      const detector = faceDetectorRef.current;
      const video = videoRef.current;

      if (!detector || !video) {
        return;
      }

      if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
        return;
      }

      if (video.videoWidth === 0 || video.videoHeight === 0) {
        return;
      }

      try {
        const timestamp = performance.now();

        const result = detector.detectForVideo(video, timestamp);

        const count = result?.detections?.length || 0;

        setFaceCount(count);

        if (count === 0) {
          setFaceStatus("No Face");

          addViolation("Face Missing", "No face detected in the camera.");
        } else if (count === 1) {
          setFaceStatus("Face Detected");
        } else {
          setFaceStatus("Multiple Faces");

          addViolation(
            "Multiple Faces",
            `${count} faces detected in the camera.`,
          );
        }
      } catch (error) {
        console.error("Face Detection Error:", error);
      }
    };

    const waitForDetector = setInterval(() => {
      if (faceDetectorRef.current && !detectionTimerRef.current) {
        console.log("Face Detection: Starting...");

        detectionTimerRef.current = setInterval(detectFaces, 1000);
      }
    }, 500);

    return () => {
      clearInterval(waitForDetector);

      if (detectionTimerRef.current) {
        clearInterval(detectionTimerRef.current);

        detectionTimerRef.current = null;
      }
    };
  }, []);

  // =====================================================
  // TIMER
  // =====================================================

  useEffect(() => {
    if (timeLeft <= 0 || submittedRef.current) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          clearInterval(timer);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  // =====================================================
  // SAVE + NAVIGATE RESULT
  // =====================================================

  const finishExam = ({ autoSubmit = false } = {}) => {
    if (submittedRef.current) {
      return;
    }

    submittedRef.current = true;

    const answered = Object.keys(answers).length;

    const correct = questions.reduce((total, item, index) => {
      return total + (answers[index] === item.answer ? 1 : 0);
    }, 0);

    const wrong = answered - correct;

    const unattempted = questions.length - answered;

    const elapsedSeconds = EXAM_DURATION - timeLeft;

    const takenMinutes = Math.floor(elapsedSeconds / 60);

    const takenSeconds = elapsedSeconds % 60;

    const timeTaken = autoSubmit
      ? "30:00"
      : `${String(takenMinutes).padStart(2, "0")}:${String(
          takenSeconds,
        ).padStart(2, "0")}`;

    const resultData = {
      totalQuestions: questions.length,
      attempted: answered,
      correct,
      wrong,
      unattempted,
      violations: violations.length,
      timeTaken,
      percentage: Math.round((correct / questions.length) * 100),
    };

    // Save result for StudentDashboard
    localStorage.setItem("examResult", JSON.stringify(resultData));

    // Stop camera before leaving exam
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());

      streamRef.current = null;
    }

    navigate("/result", {
      state: resultData,
      replace: true,
    });
  };

  // =====================================================
  // AUTO SUBMIT WHEN TIME IS OVER
  // =====================================================

  useEffect(() => {
    if (timeLeft !== 0 || submittedRef.current) {
      return;
    }

    finishExam({
      autoSubmit: true,
    });
  }, [timeLeft]);

  // =====================================================
  // TAB SWITCH
  // =====================================================

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        addViolation(
          "Tab Switch",
          "Student switched away from the examination tab.",
        );
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // =====================================================
  // WINDOW FOCUS
  // =====================================================

  useEffect(() => {
    const handleWindowBlur = () => {
      addViolation("Window Focus Lost", "Examination window lost focus.");
    };

    window.addEventListener("blur", handleWindowBlur);

    return () => {
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, []);

  // =====================================================
  // TIMER FORMAT
  // =====================================================

  const minutes = Math.floor(timeLeft / 60);

  const seconds = timeLeft % 60;

  const isTimeLow = timeLeft <= 5 * 60;

  // =====================================================
  // ANSWER SELECT
  // =====================================================

  const selectAnswer = (option) => {
    if (submittedRef.current) {
      return;
    }

    setAnswers((previous) => ({
      ...previous,
      [currentQuestion]: option,
    }));
  };

  const question = questions[currentQuestion];

  // =====================================================
  // SUBMIT EXAM
  // =====================================================

  const submitExam = () => {
    if (submittedRef.current) {
      return;
    }

    const answered = Object.keys(answers).length;

    const correct = questions.reduce((total, item, index) => {
      return total + (answers[index] === item.answer ? 1 : 0);
    }, 0);

    const wrong = answered - correct;

    const unattempted = questions.length - answered;

    const confirmSubmit = window.confirm(
      `You answered ${answered} out of ${questions.length} questions.

Correct: ${correct}
Wrong: ${wrong}
Unattempted: ${unattempted}
Violations: ${violations.length}

Do you want to submit the exam?`,
    );

    if (!confirmSubmit) {
      return;
    }

    finishExam();
  };

  // =====================================================
  // TEST VIOLATION
  // =====================================================

  const testViolation = () => {
    addViolation("Test Violation", "This is a test proctoring violation.");
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* =================================================
          HEADER
      ================================================= */}

      <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-6 py-4">
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

        {/* TIMER */}

        <div
          className={`rounded-xl border px-5 py-3 text-center ${
            isTimeLow
              ? "border-red-500/30 bg-red-500/10"
              : "border-slate-700 bg-slate-800"
          }`}
        >
          <p className="text-xs text-slate-400">TIME LEFT</p>

          <p
            className={`text-xl font-bold ${
              isTimeLow ? "text-red-400" : "text-white"
            }`}
          >
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </p>
        </div>
      </header>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="grid gap-6 p-6 lg:grid-cols-[1fr_340px]">
        {/* =================================================
            QUESTION SECTION
        ================================================= */}

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-blue-400">
              QUESTION {currentQuestion + 1} OF {questions.length}
            </p>

            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">
              {Object.keys(answers).length} Answered
            </span>
          </div>

          {/* PROGRESS */}

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>

          <h2 className="mt-6 text-2xl font-bold leading-relaxed">
            {question.question}
          </h2>

          {/* OPTIONS */}

          <div className="mt-8 space-y-4">
            {question.options.map((option, index) => {
              const selected = answers[currentQuestion] === option;

              return (
                <button
                  key={option}
                  onClick={() => selectAnswer(option)}
                  className={`w-full rounded-xl border p-4 text-left transition ${
                    selected
                      ? "border-blue-500 bg-blue-500/10 text-blue-300"
                      : "border-slate-700 bg-slate-950 text-slate-300 hover:border-blue-500"
                  }`}
                >
                  <span
                    className={`mr-3 inline-flex h-8 w-8 items-center justify-center rounded-lg ${
                      selected
                        ? "bg-blue-600 text-white"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>

                  {option}
                </button>
              );
            })}
          </div>

          {/* NAVIGATION */}

          <div className="mt-8 flex justify-between">
            <button
              disabled={currentQuestion === 0}
              onClick={() => setCurrentQuestion((previous) => previous - 1)}
              className="rounded-xl border border-slate-700 px-6 py-3 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Previous
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={submitExam}
                className="rounded-xl bg-green-600 px-6 py-3 font-semibold transition hover:bg-green-700"
              >
                Submit Exam
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion((previous) => previous + 1)}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
              >
                Next →
              </button>
            )}
          </div>
        </section>

        {/* =================================================
            RIGHT PANEL
        ================================================= */}

        <aside className="space-y-6">
          {/* =================================================
              AI PROCTORING
          ================================================= */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">AI Proctoring</h3>

              <span
                className={`rounded-full px-3 py-1 text-xs ${
                  cameraStatus === "Active"
                    ? "bg-green-500/10 text-green-400"
                    : cameraStatus === "Blocked"
                      ? "bg-red-500/10 text-red-400"
                      : "bg-yellow-500/10 text-yellow-400"
                }`}
              >
                ● {cameraStatus}
              </span>
            </div>

            {/* VIDEO */}

            <div className="relative mt-4 aspect-video overflow-hidden rounded-xl bg-black">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="h-full w-full object-cover"
              />

              {/* CAMERA STATUS */}

              {cameraStatus === "Active" && (
                <div className="absolute left-3 top-3 rounded-full bg-green-600/90 px-3 py-1 text-xs font-semibold">
                  ● Camera Active
                </div>
              )}

              {/* FACE STATUS */}

              <div
                className={`absolute bottom-3 left-3 rounded-full px-3 py-1 text-xs font-semibold ${
                  faceStatus === "Face Detected"
                    ? "bg-green-600/90"
                    : faceStatus === "Multiple Faces"
                      ? "bg-red-600/90"
                      : faceStatus === "No Face"
                        ? "bg-red-600/90"
                        : faceStatus === "AI Error"
                          ? "bg-red-600/90"
                          : "bg-yellow-600/90"
                }`}
              >
                👤 {faceStatus}
              </div>

              {/* CAMERA ERROR */}

              {cameraError && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950 p-5 text-center">
                  <div>
                    <div className="text-4xl">⚠️</div>

                    <p className="mt-3 text-sm text-red-400">{cameraError}</p>

                    <p className="mt-2 text-xs text-slate-500">
                      Allow camera permission and reload the page.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* STATUS */}

            <div className="mt-4 space-y-3 text-sm">
              {/* CAMERA */}

              <div className="flex justify-between">
                <span className="text-slate-400">Camera</span>

                <span
                  className={
                    cameraStatus === "Active"
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {cameraStatus === "Active" ? "✓ Active" : "✕ Inactive"}
                </span>
              </div>

              {/* FACE */}

              <div className="flex justify-between">
                <span className="text-slate-400">Face Detection</span>

                <span
                  className={
                    faceCount === 1 ? "text-green-400" : "text-red-400"
                  }
                >
                  {faceCount === 1
                    ? "✓ 1 Face"
                    : faceCount === 0
                      ? "⚠ No Face"
                      : `⚠ ${faceCount} Faces`}
                </span>
              </div>

              {/* AI */}

              <div className="flex justify-between">
                <span className="text-slate-400">AI Status</span>

                <span
                  className={
                    faceStatus === "Face Detected"
                      ? "text-green-400"
                      : faceStatus === "AI Error"
                        ? "text-red-400"
                        : "text-yellow-400"
                  }
                >
                  {faceStatus}
                </span>
              </div>

              {/* TAB */}

              <div className="flex justify-between">
                <span className="text-slate-400">Tab Monitoring</span>

                <span className="text-green-400">✓ Active</span>
              </div>

              {/* WINDOW */}

              <div className="flex justify-between">
                <span className="text-slate-400">Window Monitoring</span>

                <span className="text-green-400">✓ Active</span>
              </div>
            </div>
          </div>

          {/* =================================================
              QUESTION NAVIGATOR
          ================================================= */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Questions</h3>

              <span className="text-xs text-slate-500">
                {questions.length} Questions
              </span>
            </div>

            <div className="mt-4 grid grid-cols-5 gap-2">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`h-10 rounded-lg text-sm font-semibold transition ${
                    currentQuestion === index
                      ? "bg-blue-600 text-white"
                      : answers[index]
                        ? "bg-green-600/20 text-green-400"
                        : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {/* LEGEND */}

            <div className="mt-4 flex flex-wrap gap-3 text-xs">
              <span className="text-slate-500">
                <span className="mr-1 inline-block h-2 w-2 rounded-full bg-blue-600" />
                Current
              </span>

              <span className="text-slate-500">
                <span className="mr-1 inline-block h-2 w-2 rounded-full bg-green-500" />
                Answered
              </span>

              <span className="text-slate-500">
                <span className="mr-1 inline-block h-2 w-2 rounded-full bg-slate-700" />
                Unanswered
              </span>
            </div>
          </div>

          {/* =================================================
              VIOLATIONS
          ================================================= */}

          <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Proctoring Violations
              </span>

              <span
                className={`font-bold ${
                  violations.length > 0 ? "text-red-400" : "text-green-400"
                }`}
              >
                {violations.length}
              </span>
            </div>

            {violations.length === 0 && (
              <p className="mt-2 text-xs text-slate-500">
                No suspicious activity detected.
              </p>
            )}

            {violations.length > 0 && (
              <div className="mt-4 space-y-2">
                {violations
                  .slice(-5)
                  .reverse()
                  .map((violation) => (
                    <div
                      key={violation.id}
                      className="rounded-lg border border-red-500/20 bg-red-500/5 p-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-red-400">
                          ⚠️ {violation.type}
                        </span>

                        <span className="text-xs text-slate-500">
                          {violation.time}
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-slate-500">
                        {violation.message}
                      </p>
                    </div>
                  ))}
              </div>
            )}

            {/* TEST BUTTON */}

            <button
              onClick={testViolation}
              className="mt-4 w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-700"
            >
              Test Violation
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default Exam;
