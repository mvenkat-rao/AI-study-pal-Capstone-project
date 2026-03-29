import { useState, useMemo } from "react";
import { Brain, CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react";
import { quizData, subjects, type QuizQuestion } from "@/data/quizData";

const Quiz = () => {
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [difficulty, setDifficulty] = useState<"all" | "easy" | "medium" | "hard">("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const filteredQuestions = useMemo(() => {
    let qs = quizData;
    if (selectedSubject !== "All") qs = qs.filter((q) => q.subject === selectedSubject);
    if (difficulty !== "all") qs = qs.filter((q) => q.difficulty === difficulty);
    return qs;
  }, [selectedSubject, difficulty]);

  const currentQ = filteredQuestions[currentIndex];

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowExplanation(true);
    if (idx === currentQ.correctAnswer) setScore((s) => s + 1);
    setAnswered((a) => a + 1);
  };

  const nextQuestion = () => {
    if (currentIndex + 1 >= filteredQuestions.length) {
      setShowResult(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setShowExplanation(false);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setAnswered(0);
    setShowResult(false);
    setQuizStarted(false);
    setShowExplanation(false);
  };

  const getFeedback = () => {
    const pct = (score / filteredQuestions.length) * 100;
    if (pct >= 90) return { text: "Outstanding! You're a master! 🏆", color: "text-success" };
    if (pct >= 70) return { text: "Great job! Keep it up! 🌟", color: "text-primary" };
    if (pct >= 50) return { text: "Good effort! Review the topics you missed. 💪", color: "text-secondary" };
    return { text: "Keep practicing! You'll improve! 📚", color: "text-destructive" };
  };

  const getDifficultyBadgeClass = (level: QuizQuestion["difficulty"]) => {
    if (level === "easy") return "bg-success/10 text-success";
    if (level === "medium") return "bg-secondary/10 text-secondary";
    return "bg-destructive/10 text-destructive";
  };

  if (showResult) {
    const feedback = getFeedback();
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-2xl text-center animate-fade-in">
          <Trophy className="h-16 w-16 mx-auto text-secondary mb-4" />
          <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Quiz Complete!</h1>
          <div className="rounded-xl border border-border bg-card p-8 shadow-card mb-6">
            <div className="font-heading text-5xl font-bold text-primary mb-2">
              {score}/{filteredQuestions.length}
            </div>
            <p className="text-muted-foreground mb-4">
              {Math.round((score / filteredQuestions.length) * 100)}% correct
            </p>
            <p className={`text-lg font-semibold ${feedback.color}`}>{feedback.text}</p>
          </div>
          <button
            onClick={resetQuiz}
            className="inline-flex items-center gap-2 rounded-lg gradient-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <RotateCcw className="h-4 w-4" /> Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
              <Brain className="inline h-8 w-8 mr-2 text-primary" />
              Smart Quiz System
            </h1>
            <p className="text-muted-foreground">Test your knowledge across multiple subjects with 420 questions and 3 difficulty levels.</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <div className="grid gap-6 sm:grid-cols-2 mb-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="All">All Subjects</option>
                  {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="all">All Levels</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {filteredQuestions.length} questions available • 60 questions per subject
            </p>
            <button
              onClick={() => filteredQuestions.length > 0 && setQuizStarted(true)}
              disabled={filteredQuestions.length === 0}
              className="w-full rounded-lg gradient-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentIndex + 1} of {filteredQuestions.length}</span>
            <span>Score: {score}/{answered}</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full gradient-primary transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / filteredQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
              {currentQ.subject}
            </span>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${getDifficultyBadgeClass(currentQ.difficulty)}`}>
              {currentQ.difficulty}
            </span>
          </div>

          <h2 className="font-heading text-xl font-semibold text-foreground mb-6">{currentQ.question}</h2>

          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              let cls = "border border-border bg-background hover:bg-muted";
              if (selected !== null) {
                if (idx === currentQ.correctAnswer) cls = "border-2 border-success bg-success/5";
                else if (idx === selected) cls = "border-2 border-destructive bg-destructive/5";
              }
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={selected !== null}
                  className={`w-full flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition-all ${cls}`}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-xs font-medium">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-foreground">{opt}</span>
                  {selected !== null && idx === currentQ.correctAnswer && (
                    <CheckCircle className="ml-auto h-5 w-5 text-success" />
                  )}
                  {selected !== null && idx === selected && idx !== currentQ.correctAnswer && (
                    <XCircle className="ml-auto h-5 w-5 text-destructive" />
                  )}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className="mt-4 rounded-lg bg-accent/50 p-4 text-sm text-accent-foreground animate-fade-in">
              <strong>Explanation:</strong> {currentQ.explanation}
            </div>
          )}

          {selected !== null && (
            <button
              onClick={nextQuestion}
              className="mt-6 w-full rounded-lg gradient-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              {currentIndex + 1 >= filteredQuestions.length ? "See Results" : "Next Question"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
