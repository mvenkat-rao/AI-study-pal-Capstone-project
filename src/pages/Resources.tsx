import { useState } from "react";
import { Search, ExternalLink, BookOpen, Globe, FileText, Star, Play } from "lucide-react";

interface Resource {
  name: string;
  description: string;
  url: string;
  subject: string;
  type: string;
  free: boolean;
  rating: number;
}

const resources: Resource[] = [
  // Mathematics
  { name: "Khan Academy Mathematics", description: "Comprehensive math courses from basic arithmetic to advanced calculus with interactive exercises.", url: "https://www.khanacademy.org/math", subject: "Mathematics", type: "Course", free: true, rating: 4.9 },
  { name: "MIT OpenCourseWare Mathematics", description: "Free lecture notes, exams, and videos from MIT's mathematics courses.", url: "https://ocw.mit.edu/courses/mathematics/", subject: "Mathematics", type: "Course", free: true, rating: 4.8 },
  { name: "Wolfram Alpha", description: "Computational knowledge engine for solving mathematical problems step-by-step.", url: "https://www.wolframalpha.com", subject: "Mathematics", type: "Tool", free: false, rating: 4.7 },
  { name: "3Blue1Brown - Essence of Linear Algebra", description: "Visual and intuitive video series on linear algebra concepts.", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab", subject: "Mathematics", type: "Video", free: true, rating: 4.9 },
  { name: "3Blue1Brown - Essence of Calculus", description: "Beautiful visual explanations of calculus fundamentals.", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr", subject: "Mathematics", type: "Video", free: true, rating: 4.9 },
  { name: "Professor Leonard - Calculus Full Course", description: "Complete calculus course with clear explanations on YouTube.", url: "https://www.youtube.com/playlist?list=PLF797E961509B4EB5", subject: "Mathematics", type: "Video", free: true, rating: 4.8 },
  // Physics
  { name: "PhET Interactive Simulations", description: "Interactive physics simulations for understanding concepts through visualization.", url: "https://phet.colorado.edu", subject: "Physics", type: "Tool", free: true, rating: 4.8 },
  { name: "Feynman Lectures on Physics", description: "Classic physics lectures by Nobel laureate Richard Feynman, available online.", url: "https://www.feynmanlectures.caltech.edu", subject: "Physics", type: "Book", free: true, rating: 4.9 },
  { name: "Physics Classroom", description: "Comprehensive physics tutorials with animations and interactive exercises.", url: "https://www.physicsclassroom.com", subject: "Physics", type: "Course", free: true, rating: 4.6 },
  { name: "Walter Lewin MIT Physics Lectures", description: "Legendary MIT physics lectures by Prof. Walter Lewin on YouTube.", url: "https://www.youtube.com/playlist?list=PLUdYlQf0_sSsb2tNcA3gtgOt8LGH6tJbr", subject: "Physics", type: "Video", free: true, rating: 4.8 },
  { name: "MinutePhysics", description: "Quick, entertaining physics explanations in short YouTube videos.", url: "https://www.youtube.com/@MinutePhysics", subject: "Physics", type: "Video", free: true, rating: 4.7 },
  // Computer Science
  { name: "LeetCode", description: "Platform for practicing coding problems and preparing for technical interviews.", url: "https://leetcode.com", subject: "Computer Science", type: "Tool", free: false, rating: 4.5 },
  { name: "FreeCodeCamp", description: "Learn to code with free interactive lessons, projects, and certifications.", url: "https://www.freecodecamp.org", subject: "Computer Science", type: "Course", free: true, rating: 4.8 },
  { name: "Coursera Computer Science", description: "University-level computer science courses from top institutions worldwide.", url: "https://www.coursera.org/browse/computer-science", subject: "Computer Science", type: "Course", free: false, rating: 4.7 },
  { name: "CS50 Harvard Introduction to CS", description: "Harvard's famous introductory computer science course on YouTube.", url: "https://www.youtube.com/@cs50", subject: "Computer Science", type: "Video", free: true, rating: 4.9 },
  { name: "GeeksForGeeks", description: "Comprehensive computer science portal with tutorials, problems, and interview prep.", url: "https://www.geeksforgeeks.org", subject: "Computer Science", type: "Tool", free: true, rating: 4.6 },
  { name: "Introduction to Algorithms (CLRS)", description: "The definitive textbook on algorithms, covering all fundamental topics.", url: "https://mitpress.mit.edu/books/introduction-algorithms-fourth-edition", subject: "Computer Science", type: "Book", free: false, rating: 4.8 },
  { name: "Fireship - CS Concepts in 100 Seconds", description: "Quick and fun CS concept explanations in bite-sized YouTube videos.", url: "https://www.youtube.com/@Fireship", subject: "Computer Science", type: "Video", free: true, rating: 4.8 },
  // Python
  { name: "Python.org Official Tutorial", description: "The official Python tutorial covering all fundamental concepts and advanced features.", url: "https://docs.python.org/3/tutorial/", subject: "Python", type: "Documentation", free: true, rating: 4.9 },
  { name: "Real Python", description: "In-depth Python tutorials, articles, and courses for all skill levels.", url: "https://realpython.com", subject: "Python", type: "Course", free: false, rating: 4.8 },
  { name: "Python for Everybody (Coursera)", description: "University of Michigan's popular Python course for beginners.", url: "https://www.coursera.org/specializations/python", subject: "Python", type: "Course", free: true, rating: 4.7 },
  { name: "Automate the Boring Stuff with Python", description: "Free online book teaching Python programming for practical tasks.", url: "https://automatetheboringstuff.com", subject: "Python", type: "Book", free: true, rating: 4.6 },
  { name: "Corey Schafer Python Tutorials", description: "Excellent Python video tutorials covering basics to advanced topics.", url: "https://www.youtube.com/@coreyms", subject: "Python", type: "Video", free: true, rating: 4.8 },
  { name: "Learn Python - Full Course (freeCodeCamp)", description: "Complete Python programming course for beginners in one video.", url: "https://www.youtube.com/watch?v=rfscVS0vtbw", subject: "Python", type: "Video", free: true, rating: 4.7 },
  { name: "Tech With Tim - Python Projects", description: "Python project tutorials for all levels on YouTube.", url: "https://www.youtube.com/@TechWithTim", subject: "Python", type: "Video", free: true, rating: 4.6 },
  // AI/ML
  { name: "Andrew Ng's Machine Learning Course", description: "Stanford's famous machine learning course taught by Andrew Ng.", url: "https://www.coursera.org/learn/machine-learning", subject: "AI/ML", type: "Course", free: true, rating: 4.9 },
  { name: "Fast.ai Practical Deep Learning", description: "Practical deep learning course focusing on real-world applications.", url: "https://www.fast.ai", subject: "AI/ML", type: "Course", free: true, rating: 4.8 },
  { name: "MIT Introduction to Machine Learning", description: "MIT's comprehensive introduction to machine learning concepts and algorithms.", url: "https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-036-introduction-to-machine-learning-fall-2020/", subject: "AI/ML", type: "Course", free: true, rating: 4.7 },
  { name: "Google AI Education", description: "Free courses and resources for learning AI and machine learning from Google.", url: "https://ai.google/education/", subject: "AI/ML", type: "Course", free: true, rating: 4.6 },
  { name: "Kaggle Learn", description: "Free micro-courses in data science and machine learning with hands-on practice.", url: "https://www.kaggle.com/learn", subject: "AI/ML", type: "Course", free: true, rating: 4.7 },
  { name: "Elements of AI (University of Helsinki)", description: "Introduction to AI concepts designed for everyone, no programming required.", url: "https://www.elementsofai.com", subject: "AI/ML", type: "Course", free: true, rating: 4.5 },
  { name: "TensorFlow Official Tutorials", description: "Official tutorials and guides for learning TensorFlow and deep learning.", url: "https://www.tensorflow.org/tutorials", subject: "AI/ML", type: "Documentation", free: true, rating: 4.6 },
  { name: "Sentdex ML & DL Tutorials", description: "Practical machine learning and deep learning video tutorials with Python.", url: "https://www.youtube.com/@sentdex", subject: "AI/ML", type: "Video", free: true, rating: 4.7 },
  { name: "StatQuest with Josh Starmer", description: "Clearly explained statistics and machine learning concepts with fun videos.", url: "https://www.youtube.com/@statquest", subject: "AI/ML", type: "Video", free: true, rating: 4.9 },
  { name: "Hands-On Machine Learning (O'Reilly)", description: "Practical guide to ML with Scikit-Learn, Keras, and TensorFlow.", url: "https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125967/", subject: "AI/ML", type: "Book", free: false, rating: 4.8 },
  { name: "Deep Learning Book (Goodfellow)", description: "The comprehensive deep learning textbook by Goodfellow, Bengio & Courville.", url: "https://www.deeplearningbook.org", subject: "AI/ML", type: "Book", free: true, rating: 4.7 },
  { name: "Two Minute Papers", description: "AI research papers explained in short, accessible YouTube videos.", url: "https://www.youtube.com/@TwoMinutePapers", subject: "AI/ML", type: "Video", free: true, rating: 4.8 },
  { name: "Yannic Kilcher - ML Paper Explanations", description: "In-depth explanations of latest ML research papers on YouTube.", url: "https://www.youtube.com/@YannicKilcher", subject: "AI/ML", type: "Video", free: true, rating: 4.7 },
  // Chemistry
  { name: "Crash Course Chemistry", description: "Engaging video series covering fundamental chemistry concepts with Hank Green.", url: "https://www.youtube.com/playlist?list=PL8dPuuaLjXtPHzzYuWy6fYEaX9mQQ8oGr", subject: "Chemistry", type: "Video", free: true, rating: 4.7 },
  { name: "ChemSpider", description: "Free chemical structure database providing access to chemical information.", url: "https://www.chemspider.com", subject: "Chemistry", type: "Tool", free: true, rating: 4.4 },
  { name: "Chemistry LibreTexts", description: "Free online chemistry textbook with comprehensive topic coverage.", url: "https://chem.libretexts.org", subject: "Chemistry", type: "Book", free: true, rating: 4.6 },
  { name: "NileRed Chemistry Experiments", description: "Fascinating chemistry experiments and explanations on YouTube.", url: "https://www.youtube.com/@NileRed", subject: "Chemistry", type: "Video", free: true, rating: 4.9 },
  // Biology
  { name: "Crash Course Biology", description: "Fast-paced, entertaining video series covering biology topics from cells to ecosystems.", url: "https://www.youtube.com/playlist?list=PL3EED4C1D684D3ADF", subject: "Biology", type: "Video", free: true, rating: 4.8 },
  { name: "National Center for Biotechnology Information", description: "Comprehensive database of biological information and research articles.", url: "https://www.ncbi.nlm.nih.gov", subject: "Biology", type: "Documentation", free: true, rating: 4.6 },
  { name: "Biology LibreTexts", description: "Free online biology textbook with detailed explanations and diagrams.", url: "https://bio.libretexts.org", subject: "Biology", type: "Book", free: true, rating: 4.5 },
  { name: "Kurzgesagt – Biology & Science", description: "Beautifully animated science and biology videos on YouTube.", url: "https://www.youtube.com/@kurzgesagt", subject: "Biology", type: "Video", free: true, rating: 4.9 },
  // General
  { name: "Coursera", description: "Online learning platform with courses from universities and companies worldwide.", url: "https://www.coursera.org", subject: "General", type: "Course", free: false, rating: 4.6 },
  { name: "edX", description: "Free online courses from Harvard, MIT, and other top universities.", url: "https://www.edx.org", subject: "General", type: "Course", free: true, rating: 4.5 },
  { name: "W3Schools", description: "Web development tutorials and references for HTML, CSS, JS, Python, SQL and more.", url: "https://www.w3schools.com", subject: "General", type: "Tool", free: true, rating: 4.5 },
  { name: "Traversy Media - Web Dev Tutorials", description: "Practical web development tutorials and crash courses on YouTube.", url: "https://www.youtube.com/@TraversyMedia", subject: "General", type: "Video", free: true, rating: 4.8 },
  { name: "The Coding Train", description: "Creative coding tutorials and challenges on YouTube.", url: "https://www.youtube.com/@TheCodingTrain", subject: "General", type: "Video", free: true, rating: 4.7 },
];

const subjects = ["All Subjects", ...Array.from(new Set(resources.map((r) => r.subject)))];
const types = ["All Types", ...Array.from(new Set(resources.map((r) => r.type)))];

const iconMap: Record<string, typeof BookOpen> = {
  Course: BookOpen,
  Tool: Globe,
  Book: FileText,
  Documentation: FileText,
  Video: Play,
};

const RatingStars = ({ rating }: { rating: number }) => {
  const full = Math.floor(rating);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`h-4 w-4 ${i <= full ? "fill-yellow-400 text-yellow-400" : i - 0.5 <= rating ? "fill-yellow-400/50 text-yellow-400" : "text-muted-foreground/30"}`} />
      ))}
      <span className="text-sm text-muted-foreground ml-1">{rating}</span>
    </div>
  );
};

const Resources = () => {
  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedType, setSelectedType] = useState("All Types");

  const openExternalLink = (url: string) => {
    const openedWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (!openedWindow) window.location.assign(url);
  };

  const filtered = resources.filter((r) => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase());
    const matchSubject = selectedSubject === "All Subjects" || r.subject === selectedSubject;
    const matchType = selectedType === "All Types" || r.type === selectedType;
    return matchSearch && matchSubject && matchType;
  });

  const totalFree = resources.filter((r) => r.free).length;
  const totalSubjects = new Set(resources.map((r) => r.subject)).size;
  const totalTypes = new Set(resources.map((r) => r.type)).size;

  return (
    <div className="min-h-screen py-12 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
            <Search className="inline h-8 w-8 mr-2 text-primary" />
            Find Resources
          </h1>
          <p className="text-muted-foreground">Browse courses, books, videos, tools, and documentation for every subject.</p>
        </div>

        {/* Filters */}
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search resources..."
              className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {types.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Resource Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {filtered.map((r) => {
            const Icon = iconMap[r.type] || BookOpen;
            return (
              <div key={r.name} className="rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">{r.subject}</span>
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">{r.type}</span>
                    {r.free && <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Free</span>}
                  </div>
                </div>
                <h3 className="font-heading text-base font-semibold text-foreground mb-2">{r.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{r.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <RatingStars rating={r.rating} />
                  <button
                    type="button"
                    onClick={() => openExternalLink(r.url)}
                    className="inline-flex items-center gap-1 rounded-lg gradient-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Visit
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">No resources found matching your filters.</div>
        )}

        {/* Stats */}
        <div className="grid gap-6 sm:grid-cols-4 text-center">
          <div>
            <div className="font-heading text-3xl font-bold text-primary">{resources.length}</div>
            <div className="text-sm text-muted-foreground">Total Resources</div>
          </div>
          <div>
            <div className="font-heading text-3xl font-bold text-primary">{totalFree}</div>
            <div className="text-sm text-muted-foreground">Free Resources</div>
          </div>
          <div>
            <div className="font-heading text-3xl font-bold text-primary">{totalSubjects}</div>
            <div className="text-sm text-muted-foreground">Subjects Covered</div>
          </div>
          <div>
            <div className="font-heading text-3xl font-bold text-primary">{totalTypes}</div>
            <div className="text-sm text-muted-foreground">Resource Types</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
