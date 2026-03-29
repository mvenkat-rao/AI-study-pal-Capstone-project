import { Link } from "react-router-dom";
import { BookOpen, Brain, FileText, Lightbulb, MessageCircle, Calendar } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
const features = [
  { icon: Calendar, title: "Study Plans", description: "Generate personalized study schedules based on your subject and available hours.", link: "/study-plan", color: "bg-accent text-accent-foreground" },
  { icon: Brain, title: "Smart Quizzes", description: "Practice 400+ multiple-choice questions across easy, medium, and hard levels.", link: "/quiz", color: "bg-accent text-accent-foreground" },
  { icon: FileText, title: "Text Summarizer", description: "Summarize long notes and study material from 2 to 20 lines.", link: "/summarizer", color: "bg-accent text-accent-foreground" },
  { icon: Lightbulb, title: "Study Tips", description: "Get NLP-powered study tips and keyword extraction from your notes.", link: "/study-tips", color: "bg-accent text-accent-foreground" },
  { icon: MessageCircle, title: "AI Chatbot", description: "Ask coding, LeetCode, DSA, and study questions and get instant help.", link: "#chatbot", color: "bg-accent text-accent-foreground" },
  { icon: BookOpen, title: "Resources", description: "Discover curated study resources for every subject.", link: "/resources", color: "bg-accent text-accent-foreground" },
];

const Index = () => {
  const openChatbot = () => {
    window.location.hash = "chatbot";
    window.dispatchEvent(new Event("hashchange"));
  };

  return (
    <div className="min-h-screen">
      {/* Hero - text only, no image */}
      <section className="relative py-20 overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" width={1920} height={900} />
        <div className="absolute inset-0 bg-background/60" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl gradient-primary mb-6">
            <BookOpen className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            AI Study Pal
          </h1>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Core Features</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Everything you need to supercharge your study sessions.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              f.link === "#chatbot" ? (
                <button
                  key={f.title}
                  type="button"
                  onClick={openChatbot}
                  className="group rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 text-left"
                >
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${f.color}`}>
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-card-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.description}</p>
                </button>
              ) : (
                <Link
                  key={f.title}
                  to={f.link}
                  className="group rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${f.color}`}>
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-card-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.description}</p>
                </Link>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-3 text-center">
            <div>
              <div className="font-heading text-4xl font-bold text-primary">420</div>
              <div className="text-muted-foreground mt-1">Quiz Questions</div>
            </div>
            <div>
              <div className="font-heading text-4xl font-bold text-primary">7</div>
              <div className="text-muted-foreground mt-1">Subject Areas</div>
            </div>
            <div>
              <div className="font-heading text-4xl font-bold text-primary">∞</div>
              <div className="text-muted-foreground mt-1">Chat Attempts</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} AI Study Pal. Built by Venkatarao Mallapuram.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
