import { useState } from "react";
import { Lightbulb, BookOpen, ExternalLink } from "lucide-react";

const tipsBySubject: Record<string, { tips: string[]; resources: { name: string; url: string }[] }> = {
  Mathematics: {
    tips: [
      "Practice solving problems daily — math is learned by doing, not reading.",
      "Break complex problems into smaller steps before solving.",
      "Memorize key formulas and review them weekly.",
      "Use visualization for geometry and graph-based problems.",
      "Teach concepts to others — it solidifies your understanding.",
      "Focus on understanding 'why' a formula works, not just 'how'.",
    ],
    resources: [
      { name: "Khan Academy - Math", url: "https://www.khanacademy.org/math" },
      { name: "Wolfram Alpha", url: "https://www.wolframalpha.com" },
      { name: "Desmos Graphing Calculator", url: "https://www.desmos.com" },
    ],
  },
  Science: {
    tips: [
      "Connect concepts to real-world examples for better retention.",
      "Draw diagrams for biology and chemistry topics.",
      "Practice unit conversions regularly for physics.",
      "Create flashcards for key terminology.",
      "Watch experiment videos to understand practical applications.",
      "Review the scientific method and apply it to your studies.",
    ],
    resources: [
      { name: "Khan Academy - Science", url: "https://www.khanacademy.org/science" },
      { name: "PhET Simulations", url: "https://phet.colorado.edu" },
      { name: "National Geographic Education", url: "https://education.nationalgeographic.org" },
    ],
  },
  Python: {
    tips: [
      "Code every day — even 15 minutes of practice helps.",
      "Build small projects to apply what you learn.",
      "Read other people's code on GitHub for new patterns.",
      "Use Python's built-in help() function to explore modules.",
      "Practice debugging — it's a crucial developer skill.",
      "Learn keyboard shortcuts in your IDE for faster coding.",
    ],
    resources: [
      { name: "Python Official Docs", url: "https://docs.python.org/3/" },
      { name: "Real Python Tutorials", url: "https://realpython.com" },
      { name: "HackerRank Python", url: "https://www.hackerrank.com/domains/python" },
    ],
  },
  "Machine Learning": {
    tips: [
      "Start with simple algorithms before moving to complex ones.",
      "Always visualize your data before building models.",
      "Understand the math behind algorithms, not just the code.",
      "Use cross-validation to evaluate model performance.",
      "Learn to identify overfitting vs underfitting.",
      "Practice with Kaggle datasets for real-world experience.",
    ],
    resources: [
      { name: "Kaggle Learn", url: "https://www.kaggle.com/learn" },
      { name: "scikit-learn Documentation", url: "https://scikit-learn.org" },
      { name: "Google ML Crash Course", url: "https://developers.google.com/machine-learning/crash-course" },
    ],
  },
  "Deep Learning": {
    tips: [
      "Understand neural network basics before diving into architectures.",
      "Experiment with hyperparameters to build intuition.",
      "Start with Keras/TensorFlow for beginner-friendly APIs.",
      "Visualize model training with loss/accuracy plots.",
      "Use transfer learning to save time on common tasks.",
      "Study the math of backpropagation thoroughly.",
    ],
    resources: [
      { name: "fast.ai Courses", url: "https://www.fast.ai" },
      { name: "TensorFlow Tutorials", url: "https://www.tensorflow.org/tutorials" },
      { name: "deeplearning.ai", url: "https://www.deeplearning.ai" },
    ],
  },
  NLP: {
    tips: [
      "Learn text preprocessing thoroughly — it's the foundation.",
      "Understand the difference between rule-based and ML-based NLP.",
      "Practice with real text datasets (news, reviews, tweets).",
      "Study word embeddings to understand semantic meaning.",
      "Experiment with pre-trained models like BERT.",
      "Build a sentiment analysis project as your first NLP task.",
    ],
    resources: [
      { name: "NLTK Documentation", url: "https://www.nltk.org" },
      { name: "Hugging Face Course", url: "https://huggingface.co/course" },
      { name: "spaCy Tutorials", url: "https://spacy.io/usage" },
    ],
  },
};

const subjectKeys = Object.keys(tipsBySubject);

const StudyTips = () => {
  const [subject, setSubject] = useState("Python");
  const [inputText, setInputText] = useState("");
  const [extractedKeywords, setExtractedKeywords] = useState<string[]>([]);

  const current = tipsBySubject[subject];

  const extractKeywords = () => {
    if (!inputText.trim()) return;
    const stopWords = new Set(["the", "a", "an", "is", "are", "was", "were", "in", "on", "at", "to", "for", "of", "and", "or", "but", "not", "with", "this", "that", "it", "as", "by", "from", "be", "has", "have", "had", "do", "does", "did", "will", "would", "can", "could", "should", "may", "might"]);
    const words = inputText.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(Boolean);
    const freq: Record<string, number> = {};
    words.forEach((w) => {
      if (w.length > 2 && !stopWords.has(w)) freq[w] = (freq[w] || 0) + 1;
    });
    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
    setExtractedKeywords(sorted.slice(0, 10).map(([w]) => w));
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
            <Lightbulb className="inline h-8 w-8 mr-2 text-primary" />
            Study Tips & Resources
          </h1>
          <p className="text-muted-foreground">Get subject-specific tips and extract keywords from your notes.</p>
        </div>

        {/* Subject Selector */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {subjectKeys.map((s) => (
            <button
              key={s}
              onClick={() => setSubject(s)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                subject === s
                  ? "gradient-primary text-primary-foreground"
                  : "border border-border bg-card text-foreground hover:bg-muted"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Tips */}
        <div className="grid gap-6 md:grid-cols-2 mb-10">
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h2 className="font-heading text-lg font-semibold text-foreground mb-4">
              💡 Tips for {subject}
            </h2>
            <ul className="space-y-3">
              {current.tips.map((tip, i) => (
                <li key={i} className="flex gap-3 text-sm text-foreground">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                    {i + 1}
                  </span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h2 className="font-heading text-lg font-semibold text-foreground mb-4">
              <BookOpen className="inline h-5 w-5 mr-1" /> Recommended Resources
            </h2>
            <ul className="space-y-3">
              {current.resources.map((r) => (
                <li key={r.name}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    {r.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Keyword Extractor */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h2 className="font-heading text-lg font-semibold text-foreground mb-4">
            🔍 NLP Keyword Extractor
          </h2>
          <p className="text-sm text-muted-foreground mb-3">
            Paste your notes or study material to extract key terms using NLP tokenization.
          </p>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your study notes here..."
            rows={4}
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none mb-3"
          />
          <button
            onClick={extractKeywords}
            disabled={!inputText.trim()}
            className="rounded-lg gradient-primary px-6 py-2.5 font-medium text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            Extract Keywords
          </button>

          {extractedKeywords.length > 0 && (
            <div className="mt-4 animate-fade-in">
              <p className="text-sm font-medium text-foreground mb-2">Extracted Keywords:</p>
              <div className="flex flex-wrap gap-2">
                {extractedKeywords.map((kw) => (
                  <span key={kw} className="rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyTips;
