import { useState } from "react";
import { FileText, Sparkles } from "lucide-react";

function summarizeText(text: string): { summary: string; keywords: string[]; wordCount: { original: number; summary: number } } {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const words = text.split(/\s+/).filter(Boolean);
  const originalCount = words.length;

  // Simple extractive summarization: score sentences by word frequency
  const freq: Record<string, number> = {};
  words.forEach((w) => {
    const key = w.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (key.length > 3) freq[key] = (freq[key] || 0) + 1;
  });

  const scored = sentences.map((s) => {
    const sWords = s.split(/\s+/);
    const score = sWords.reduce((acc, w) => {
      const key = w.toLowerCase().replace(/[^a-z0-9]/g, "");
      return acc + (freq[key] || 0);
    }, 0) / Math.max(sWords.length, 1);
    return { sentence: s.trim(), score };
  });

  scored.sort((a, b) => b.score - a.score);
  const topCount = Math.min(10, Math.max(3, Math.ceil(sentences.length * 0.25)));
  const topSentences = scored.slice(0, topCount).map((s) => s.sentence);

  // Maintain original order
  const ordered = sentences.filter((s) => topSentences.includes(s.trim()));
  const summary = ordered.join(" ");

  // Keywords
  const sortedWords = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  const keywords = sortedWords.slice(0, 8).map(([w]) => w);

  return {
    summary: summary || text.slice(0, 200) + "...",
    keywords,
    wordCount: { original: originalCount, summary: summary.split(/\s+/).length },
  };
}

const Summarizer = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState<ReturnType<typeof summarizeText> | null>(null);
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const isValidWordCount = wordCount >= 30 && wordCount <= 200;

  const handleSummarize = () => {
    if (!isValidWordCount) return;
    setResult(summarizeText(text));
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
            <FileText className="inline h-8 w-8 mr-2 text-primary" />
            Text Summarizer
          </h1>
          <p className="text-muted-foreground">Paste your study material and get a concise summary with key terms.</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-card mb-8">
          <label className="block text-sm font-medium text-foreground mb-2">Paste your text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write or paste 30 to 200 words of study material here..."
            rows={12}
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-muted-foreground">{wordCount} words</span>
            <button
              onClick={handleSummarize}
              disabled={!isValidWordCount}
              className="inline-flex items-center gap-2 rounded-lg gradient-primary px-6 py-2.5 font-medium text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Sparkles className="h-4 w-4" /> Summarize
            </button>
          </div>
          <p className={`mt-2 text-xs ${isValidWordCount || wordCount === 0 ? "text-muted-foreground" : "text-destructive"}`}>
            Enter between 30 and 200 words for summarization.
          </p>
        </div>

        {result && (
          <div className="space-y-6 animate-fade-in">
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h2 className="font-heading text-lg font-semibold text-foreground mb-3">Summary</h2>
              <p className="text-foreground leading-relaxed">{result.summary}</p>
              <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
                <span>Original: {result.wordCount.original} words</span>
                <span>Summary: {result.wordCount.summary} words</span>
                <span>Reduced by {Math.round((1 - result.wordCount.summary / result.wordCount.original) * 100)}%</span>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h2 className="font-heading text-lg font-semibold text-foreground mb-3">Key Terms</h2>
              <div className="flex flex-wrap gap-2">
                {result.keywords.map((kw) => (
                  <span key={kw} className="rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summarizer;
