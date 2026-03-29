import { useState } from "react";
import { Calendar, Download, Clock, BookOpen } from "lucide-react";

const subjects = ["Mathematics", "Science", "Python", "Machine Learning", "Deep Learning", "NLP", "General Studies"];

interface PlanEntry {
  day: string;
  time: string;
  topic: string;
  activity: string;
}

function generatePlan(subject: string, hours: number, days: number): PlanEntry[] {
  const topicsBySubject: Record<string, { topic: string; activity: string }[]> = {
    Mathematics: [
      { topic: "Algebra & Equations", activity: "Solve 10 practice problems" },
      { topic: "Calculus - Derivatives", activity: "Study rules and solve examples" },
      { topic: "Calculus - Integrals", activity: "Practice integration techniques" },
      { topic: "Linear Algebra", activity: "Work with matrices and vectors" },
      { topic: "Probability & Statistics", activity: "Solve probability problems" },
      { topic: "Geometry & Trigonometry", activity: "Review formulas and practice" },
      { topic: "Review & Practice Test", activity: "Take a timed practice exam" },
    ],
    Science: [
      { topic: "Physics - Mechanics", activity: "Study Newton's laws with examples" },
      { topic: "Chemistry - Atomic Structure", activity: "Review periodic table and bonding" },
      { topic: "Biology - Cell Biology", activity: "Study cell structure and functions" },
      { topic: "Physics - Thermodynamics", activity: "Solve heat and energy problems" },
      { topic: "Chemistry - Reactions", activity: "Balance equations and practice" },
      { topic: "Biology - Genetics", activity: "Study DNA and heredity" },
      { topic: "Review & Mixed Problems", activity: "Cross-topic practice test" },
    ],
    Python: [
      { topic: "Variables & Data Types", activity: "Write 5 small programs" },
      { topic: "Control Flow", activity: "Practice if/else and loops" },
      { topic: "Functions & Modules", activity: "Create reusable functions" },
      { topic: "Data Structures", activity: "Work with lists, dicts, sets" },
      { topic: "File I/O & Exceptions", activity: "Read/write files, handle errors" },
      { topic: "OOP Concepts", activity: "Build a class-based project" },
      { topic: "Libraries (NumPy, Pandas)", activity: "Data manipulation exercises" },
    ],
    "Machine Learning": [
      { topic: "ML Fundamentals", activity: "Study types of ML algorithms" },
      { topic: "Linear Regression", activity: "Implement from scratch" },
      { topic: "Classification (Logistic Reg)", activity: "Train and evaluate model" },
      { topic: "Decision Trees & Random Forest", activity: "Build tree-based models" },
      { topic: "Clustering (K-Means)", activity: "Cluster sample datasets" },
      { topic: "Model Evaluation", activity: "Cross-validation and metrics" },
      { topic: "Feature Engineering", activity: "Practice feature selection" },
    ],
    "Deep Learning": [
      { topic: "Neural Network Basics", activity: "Study perceptrons and activation" },
      { topic: "Forward & Backpropagation", activity: "Calculate gradients manually" },
      { topic: "CNN Architecture", activity: "Build image classifier" },
      { topic: "RNN & LSTM", activity: "Sequence prediction exercise" },
      { topic: "Training Techniques", activity: "Experiment with optimizers" },
      { topic: "Regularization", activity: "Apply dropout and batch norm" },
      { topic: "Transfer Learning", activity: "Fine-tune pre-trained model" },
    ],
    NLP: [
      { topic: "Text Preprocessing", activity: "Tokenization and cleaning" },
      { topic: "Bag-of-Words & TF-IDF", activity: "Build text representations" },
      { topic: "Word Embeddings", activity: "Explore Word2Vec/GloVe" },
      { topic: "Text Classification", activity: "Sentiment analysis project" },
      { topic: "Named Entity Recognition", activity: "Extract entities from text" },
      { topic: "Sequence Models for NLP", activity: "LSTM text generation" },
      { topic: "Transformers & BERT", activity: "Fine-tune for classification" },
    ],
    "General Studies": [
      { topic: "Reading & Note-Taking", activity: "Summarize key chapters" },
      { topic: "Concept Mapping", activity: "Create mind maps" },
      { topic: "Practice Problems", activity: "Solve mixed exercises" },
      { topic: "Review Previous Material", activity: "Revise past topics" },
      { topic: "Group Discussion Topics", activity: "Prepare discussion points" },
      { topic: "Mock Test Preparation", activity: "Timed practice session" },
      { topic: "Final Review", activity: "Quick revision of all topics" },
    ],
  };

  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const topics = topicsBySubject[subject] || topicsBySubject["General Studies"];
  const plan: PlanEntry[] = [];

  for (let i = 0; i < days; i++) {
    const t = topics[i % topics.length];
    plan.push({
      day: dayNames[i % 7],
      time: `${hours} hour${hours > 1 ? "s" : ""}`,
      topic: t.topic,
      activity: t.activity,
    });
  }
  return plan;
}

function downloadCSV(plan: PlanEntry[], subject: string) {
  const header = "Day,Time,Topic,Activity\n";
  const rows = plan.map((p) => `${p.day},${p.time},"${p.topic}","${p.activity}"`).join("\n");
  const blob = new Blob([header + rows], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `study_plan_${subject.toLowerCase().replace(/\s/g, "_")}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

const StudyPlan = () => {
  const [subject, setSubject] = useState("Mathematics");
  const [hours, setHours] = useState(2);
  const [days, setDays] = useState(7);
  const [plan, setPlan] = useState<PlanEntry[] | null>(null);
  const [motivation, setMotivation] = useState("");

  const motivations = [
    "You're doing amazing! Keep pushing forward! 🌟",
    "Every study session brings you closer to your goals! 💪",
    "Consistency is key - you've got this! 🔑",
    "Great choice of subject! Your future self will thank you! 🎯",
    "Success is the sum of small efforts repeated daily! ⭐",
  ];

  const handleGenerate = () => {
    const p = generatePlan(subject, hours, days);
    setPlan(p);
    setMotivation(motivations[Math.floor(Math.random() * motivations.length)]);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
            <Calendar className="inline h-8 w-8 mr-2 text-primary" />
            AI Study Plan Generator
          </h1>
          <p className="text-muted-foreground">Create a personalized study schedule tailored to your needs.</p>
        </div>

        {/* Form */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card mb-8">
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <Clock className="inline h-4 w-4 mr-1" /> Hours/Day
              </label>
              <input
                type="number"
                min={1}
                max={12}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <BookOpen className="inline h-4 w-4 mr-1" /> Number of Days
              </label>
              <input
                type="number"
                min={1}
                max={30}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <button
            onClick={handleGenerate}
            className="mt-6 w-full rounded-lg gradient-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Generate Study Plan
          </button>
        </div>

        {/* Motivation */}
        {motivation && (
          <div className="rounded-lg bg-accent border border-primary/20 p-4 mb-6 text-center text-accent-foreground font-medium animate-fade-in">
            {motivation}
          </div>
        )}

        {/* Plan Table */}
        {plan && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-xl font-semibold text-foreground">
                Your {subject} Study Plan
              </h2>
              <button
                onClick={() => downloadCSV(plan, subject)}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                <Download className="h-4 w-4" /> Download CSV
              </button>
            </div>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Day</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Time</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Topic</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {plan.map((p, i) => (
                    <tr key={i} className="border-t border-border hover:bg-muted/50 transition-colors">
                      <td className="px-4 py-3 font-medium text-foreground">{p.day}</td>
                      <td className="px-4 py-3 text-muted-foreground">{p.time}</td>
                      <td className="px-4 py-3 text-foreground">{p.topic}</td>
                      <td className="px-4 py-3 text-muted-foreground">{p.activity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyPlan;
