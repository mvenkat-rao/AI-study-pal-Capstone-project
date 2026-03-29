import { Mail, Phone, User, BookOpen, Target, BarChart3, Sun, Copy } from "lucide-react";
import { useState } from "react";

const About = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const openExternalLink = (url: string) => {
    const openedWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (!openedWindow) window.location.assign(url);
  };

  return (
    <div className="min-h-screen py-12 bg-muted/30">
      <div className="container mx-auto px-4 max-w-3xl space-y-8">

        {/* Developer Information */}
        <div className="rounded-xl border border-border bg-card p-8 shadow-card">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
            <User className="h-6 w-6 text-primary" />
            Developer Information
          </h2>

          <div className="flex flex-col items-center mb-8">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary/20 mb-4">
              <User className="h-14 w-14 text-primary" />
            </div>
            <h3 className="font-heading text-xl font-bold text-primary">Mallapuram Venkatarao</h3>
            <p className="text-muted-foreground">AI & Computer Science Student</p>
          </div>

          <div className="space-y-1">
            {/* Email */}
            <div className="flex items-center justify-between rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium text-foreground">Email</span>
              </div>
              <div className="flex items-center gap-2">
                <a href="mailto:venkatmallapuram7@gmail.com" className="text-sm text-foreground hover:text-primary">
                  venkatmallapuram7@gmail.com
                </a>
                <button onClick={() => copyToClipboard("venkatmallapuram7@gmail.com", "email")} className="p-1 rounded hover:bg-muted">
                  <Copy className={`h-4 w-4 ${copiedField === "email" ? "text-primary" : "text-muted-foreground"}`} />
                </button>
              </div>
            </div>

            {/* Phone 1 */}
            <div className="flex items-center justify-between rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium text-foreground">Phone 1</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-foreground">9177916981</span>
                <button onClick={() => copyToClipboard("9177916981", "phone1")} className="p-1 rounded hover:bg-muted">
                  <Copy className={`h-4 w-4 ${copiedField === "phone1" ? "text-primary" : "text-muted-foreground"}`} />
                </button>
              </div>
            </div>

            {/* Phone 2 */}
            <div className="flex items-center justify-between rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium text-foreground">Phone 2</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-foreground">9390038437</span>
                <button onClick={() => copyToClipboard("9390038437", "phone2")} className="p-1 rounded hover:bg-muted">
                  <Copy className={`h-4 w-4 ${copiedField === "phone2" ? "text-primary" : "text-muted-foreground"}`} />
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              {/* LinkedIn */}
              <button
                type="button"
                onClick={() => openExternalLink("https://www.linkedin.com/in/mallapuram-venkatarao-0ab7a42b1/")}
                className="flex items-center gap-2 rounded-lg border border-primary/30 px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/5 transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </button>

              {/* Instagram */}
              <button
                type="button"
                onClick={() => openExternalLink("https://www.instagram.com/venkatmallapuram7/")}
                className="flex items-center gap-2 rounded-lg border border-primary/30 px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/5 transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                Instagram
              </button>

              {/* LeetCode */}
              <button
                type="button"
                onClick={() => openExternalLink("https://leetcode.com/u/Venkataraomallapuram/")}
                className="flex items-center gap-2 rounded-lg border border-primary/30 px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/5 transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/></svg>
                LeetCode
              </button>

              {/* GitHub */}
              <button
                type="button"
                onClick={() => openExternalLink("https://github.com/mvenkat-rao")}
                className="flex items-center gap-2 rounded-lg border border-primary/30 px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/5 transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                GitHub
              </button>
            </div>
          </div>
        </div>

        {/* Project Overview */}
        <div className="rounded-xl border border-border bg-card p-8 shadow-card">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            Project Overview
          </h2>
          <p className="text-foreground mb-6 leading-relaxed">
            AI Study Pal is a comprehensive capstone project that demonstrates the practical application of AI course curriculum topics including Python programming, Machine Learning, Deep Learning, and Natural Language Processing.
          </p>

          <h3 className="font-heading text-lg font-semibold text-primary mb-3 flex items-center gap-2">
            <Target className="h-5 w-5" /> Project Objectives
          </h3>
          <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
            <li>• Develop AI-powered study assistant with contextual awareness</li>
            <li>• Enable automated quiz generation and resource suggestions</li>
            <li>• Integrate text summarization and motivational feedback systems</li>
            <li>• Ensure practical, believable, and user-friendly outputs</li>
          </ul>

          <h3 className="font-heading text-lg font-semibold text-primary mb-3 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" /> Evaluation Metrics
          </h3>
          <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
            <li>• ML Models: Accuracy and F1-score for classification</li>
            <li>• DL Models: Human evaluation for quality assessment</li>
            <li>• Web App: Usability and output clarity testing</li>
          </ul>

          <h3 className="font-heading text-lg font-semibold text-primary mb-3 flex items-center gap-2">
            <Sun className="h-5 w-5" /> Key Benefits
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Curriculum alignment with core AI topics</li>
            <li>• Beginner-friendly with room for complexity</li>
            <li>• Positive educational impact and engagement</li>
            <li>• Scalable architecture for future enhancements</li>
          </ul>
        </div>

        {/* Technology Stack */}
        <div className="rounded-xl border border-border bg-card p-8 shadow-card">
          <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Technologies & Tools</h2>
          <div className="flex flex-wrap gap-2">
            {["Python", "React", "TypeScript", "Pandas", "Scikit-learn", "Keras", "NLTK", "Flask", "TailwindCSS", "Machine Learning"].map((tech) => (
              <span key={tech} className="rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
