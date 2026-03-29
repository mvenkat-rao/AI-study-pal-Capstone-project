export interface QuizQuestion {
  id: number;
  subject: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: "easy" | "medium" | "hard";
  explanation: string;
}

interface QuestionSeed {
  prompt: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const subjectSeeds: Record<string, QuestionSeed[]> = {
  Mathematics: [
    { prompt: "What is the derivative of x²?", options: ["x", "2x", "2", "x²"], correctAnswer: 1, explanation: "Using the power rule, d/dx(x²) = 2x." },
    { prompt: "What is the integral of 2x dx?", options: ["x²", "x² + C", "2x²", "x + C"], correctAnswer: 1, explanation: "The antiderivative of 2x is x² + C." },
    { prompt: "What is 15% of 200?", options: ["15", "25", "30", "35"], correctAnswer: 2, explanation: "15% of 200 is 0.15 × 200 = 30." },
    { prompt: "Solve: 3x + 7 = 22.", options: ["x = 3", "x = 5", "x = 7", "x = 4"], correctAnswer: 1, explanation: "3x = 15, so x = 5." },
    { prompt: "What is the area of a circle with radius 5?", options: ["25π", "10π", "15π", "5π"], correctAnswer: 0, explanation: "Area = πr² = 25π." },
    { prompt: "What is the slope between points (1,2) and (3,6)?", options: ["1", "2", "3", "4"], correctAnswer: 1, explanation: "Slope = (6 - 2) / (3 - 1) = 2." },
    { prompt: "What is the probability of getting heads on one fair coin toss?", options: ["1/4", "1/3", "1/2", "1"], correctAnswer: 2, explanation: "A fair coin has two equally likely outcomes, so the probability is 1/2." },
    { prompt: "Simplify 2³ × 2².", options: ["16", "32", "64", "8"], correctAnswer: 1, explanation: "Add exponents with the same base: 2⁵ = 32." },
    { prompt: "What is the next term in the sequence 2, 5, 8, 11, ...?", options: ["12", "13", "14", "15"], correctAnswer: 2, explanation: "The pattern adds 3 each time, so the next term is 14." },
    { prompt: "Which formula gives the roots of ax² + bx + c = 0?", options: ["x = (-b ± √(b² - 4ac)) / 2a", "x = (b ± √(b² - 4ac)) / 2a", "x = (-b ± √(b² + 4ac)) / 2a", "x = (2a ± √(b² - 4ac)) / b"], correctAnswer: 0, explanation: "The quadratic formula is x = (-b ± √(b² - 4ac)) / 2a." },
  ],
  Science: [
    { prompt: "What is the chemical formula for water?", options: ["H2O", "CO2", "NaCl", "O2"], correctAnswer: 0, explanation: "Water consists of two hydrogen atoms and one oxygen atom." },
    { prompt: "What is Newton's second law of motion?", options: ["F = ma", "E = mc²", "P = mv", "V = IR"], correctAnswer: 0, explanation: "Force equals mass multiplied by acceleration." },
    { prompt: "Which organelle is called the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"], correctAnswer: 2, explanation: "Mitochondria generate most of the cell's ATP." },
    { prompt: "What is the speed of light in vacuum?", options: ["3 × 10⁶ m/s", "3 × 10⁸ m/s", "3 × 10¹⁰ m/s", "3 × 10⁴ m/s"], correctAnswer: 1, explanation: "The speed of light in vacuum is approximately 3 × 10⁸ m/s." },
    { prompt: "What is the pH of pure water?", options: ["5", "7", "9", "14"], correctAnswer: 1, explanation: "Pure water is neutral with pH 7." },
    { prompt: "Which type of bond involves sharing electrons?", options: ["Ionic", "Covalent", "Metallic", "Nuclear"], correctAnswer: 1, explanation: "Covalent bonds are formed by sharing electron pairs." },
    { prompt: "Which gas do plants primarily absorb for photosynthesis?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], correctAnswer: 2, explanation: "Plants absorb carbon dioxide and use it to make glucose." },
    { prompt: "Which organ pumps blood through the human body?", options: ["Liver", "Heart", "Lung", "Kidney"], correctAnswer: 1, explanation: "The heart pumps blood throughout the circulatory system." },
    { prompt: "What is the SI unit of force?", options: ["Joule", "Newton", "Pascal", "Watt"], correctAnswer: 1, explanation: "Force is measured in newtons (N)." },
    { prompt: "Which gas is most abundant in Earth's atmosphere?", options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"], correctAnswer: 2, explanation: "Nitrogen makes up most of Earth's atmosphere." },
  ],
  Python: [
    { prompt: "What is the output type of [] in Python?", options: ["list", "tuple", "dict", "set"], correctAnswer: 0, explanation: "Square brackets create a list in Python." },
    { prompt: "Which keyword defines a function in Python?", options: ["func", "def", "function", "define"], correctAnswer: 1, explanation: "Python uses the def keyword to define functions." },
    { prompt: "What does len('Hello') return?", options: ["4", "5", "6", "Error"], correctAnswer: 1, explanation: "The string 'Hello' contains 5 characters." },
    { prompt: "Which list method adds one item to the end of a list?", options: ["add()", "insert()", "append()", "extend()"], correctAnswer: 2, explanation: "append() adds a single item to the end of a list." },
    { prompt: "Which data structure stores key-value pairs in Python?", options: ["list", "tuple", "dictionary", "set"], correctAnswer: 2, explanation: "A dictionary stores values using keys." },
    { prompt: "Which loop is commonly used to iterate over a sequence in Python?", options: ["repeat", "for", "loop", "iterate"], correctAnswer: 1, explanation: "A for loop is used to iterate over items in a sequence." },
    { prompt: "Which built-in type is immutable?", options: ["list", "set", "tuple", "dict"], correctAnswer: 2, explanation: "Tuples are immutable, meaning their values cannot be changed after creation." },
    { prompt: "Which symbol starts a single-line comment in Python?", options: ["//", "#", "--", "/*"], correctAnswer: 1, explanation: "Python uses # for single-line comments." },
    { prompt: "What is pip commonly used for in Python?", options: ["Debugging", "Installing packages", "Drawing plots", "Creating classes"], correctAnswer: 1, explanation: "pip is Python's standard package installer." },
    { prompt: "What values does range(3) generate?", options: ["1, 2, 3", "0, 1, 2", "0, 1, 2, 3", "3, 2, 1"], correctAnswer: 1, explanation: "range(3) starts at 0 and stops before 3." },
  ],
  "Machine Learning": [
    { prompt: "What type of learning uses labeled data?", options: ["Unsupervised", "Supervised", "Reinforcement", "Online"], correctAnswer: 1, explanation: "Supervised learning uses labeled examples during training." },
    { prompt: "K-Means is mainly used for which task?", options: ["Classification", "Regression", "Clustering", "Forecasting"], correctAnswer: 2, explanation: "K-Means groups similar points into clusters." },
    { prompt: "What does overfitting mean?", options: ["Model is too simple", "Model memorizes training data", "Model has no features", "Model trains too fast"], correctAnswer: 1, explanation: "Overfitting happens when a model learns training noise instead of general patterns." },
    { prompt: "What is the purpose of cross-validation?", options: ["Speed up training", "Evaluate generalization", "Delete outliers", "Normalize labels"], correctAnswer: 1, explanation: "Cross-validation helps estimate model performance on unseen data." },
    { prompt: "Which metric is usually better for imbalanced classes?", options: ["Accuracy", "F1-score", "MSE", "R²"], correctAnswer: 1, explanation: "F1-score balances precision and recall on imbalanced data." },
    { prompt: "Why do we split data into train and test sets?", options: ["To reduce memory", "To check generalization", "To change labels", "To remove features"], correctAnswer: 1, explanation: "The test set helps evaluate how the model performs on unseen examples." },
    { prompt: "Why is feature scaling helpful for distance-based models?", options: ["It sorts rows", "It balances feature magnitudes", "It removes labels", "It increases classes"], correctAnswer: 1, explanation: "Scaling prevents larger-value features from dominating distances." },
    { prompt: "Classification models predict what kind of output?", options: ["A category", "A matrix", "A paragraph", "A file"], correctAnswer: 0, explanation: "Classification predicts discrete labels or categories." },
    { prompt: "Regression models usually predict what kind of output?", options: ["A boolean", "A string", "A continuous value", "A class name"], correctAnswer: 2, explanation: "Regression predicts numeric continuous values." },
    { prompt: "What is a Random Forest made of?", options: ["Many neural networks", "Many decision trees", "Only one tree", "Several regressions"], correctAnswer: 1, explanation: "Random Forest combines many decision trees into an ensemble." },
  ],
  "Deep Learning": [
    { prompt: "Which activation function outputs values between 0 and 1?", options: ["ReLU", "Sigmoid", "Tanh", "Linear"], correctAnswer: 1, explanation: "Sigmoid maps any input to a value between 0 and 1." },
    { prompt: "What is the main purpose of dropout?", options: ["Increase image size", "Prevent overfitting", "Sort data", "Normalize labels"], correctAnswer: 1, explanation: "Dropout randomly disables neurons during training to reduce overfitting." },
    { prompt: "Which neural network architecture is best known for image tasks?", options: ["CNN", "RNN", "GAN", "RBM"], correctAnswer: 0, explanation: "Convolutional Neural Networks are strong for image processing." },
    { prompt: "Which optimizer adapts learning rates for parameters?", options: ["SGD", "Adam", "Step", "None"], correctAnswer: 1, explanation: "Adam adapts learning rates using moment estimates." },
    { prompt: "What does a pooling layer do?", options: ["Adds noise", "Reduces spatial dimensions", "Increases image size", "Creates labels"], correctAnswer: 1, explanation: "Pooling compresses feature maps while retaining important information." },
    { prompt: "Which network type is designed for sequence data?", options: ["RNN", "CNN", "PCA", "KNN"], correctAnswer: 0, explanation: "RNN-based architectures are commonly used for sequential data." },
    { prompt: "What does backpropagation compute?", options: ["Gradients for weight updates", "Only labels", "Only predictions", "Only input size"], correctAnswer: 0, explanation: "Backpropagation computes gradients to update model parameters." },
    { prompt: "What is ReLU(x)?", options: ["x²", "max(0, x)", "1/x", "sin(x)"], correctAnswer: 1, explanation: "ReLU returns zero for negative values and x for positive values." },
    { prompt: "Transformers mainly rely on which mechanism?", options: ["Attention", "Clustering", "Compression", "Rotation"], correctAnswer: 0, explanation: "Transformers use attention to weigh relationships between tokens." },
    { prompt: "What does softmax produce in classification networks?", options: ["Probabilities", "Images", "Embeddings", "Trees"], correctAnswer: 0, explanation: "Softmax converts logits into a probability distribution." },
  ],
  NLP: [
    { prompt: "What is tokenization in NLP?", options: ["Encrypting text", "Splitting text into smaller units", "Translating text", "Compressing text"], correctAnswer: 1, explanation: "Tokenization breaks text into words, subwords, or sentences." },
    { prompt: "What does TF-IDF estimate?", options: ["Text color", "Word importance", "Sentence count", "Grammar level"], correctAnswer: 1, explanation: "TF-IDF scores how important a term is in a document collection." },
    { prompt: "What is stemming?", options: ["Adding suffixes", "Reducing words to a root form", "Sorting documents", "Classifying images"], correctAnswer: 1, explanation: "Stemming trims words to a simpler root form." },
    { prompt: "What does NER stand for?", options: ["Neural Error Rate", "Named Entity Recognition", "Natural Encoding Rule", "Node Edge Relation"], correctAnswer: 1, explanation: "NER identifies entities such as names, places, and organizations." },
    { prompt: "What does sentiment analysis try to detect?", options: ["Camera angle", "Positive or negative opinion", "File size", "Programming language"], correctAnswer: 1, explanation: "Sentiment analysis identifies emotional tone such as positive or negative." },
    { prompt: "What are stopwords?", options: ["Rare symbols", "Very common words often removed", "Typos", "SQL keywords"], correctAnswer: 1, explanation: "Stopwords are common words like 'the' and 'is' that are often removed." },
    { prompt: "What is lemmatization?", options: ["Random word deletion", "Reducing words to dictionary form", "Converting speech to image", "Counting punctuation"], correctAnswer: 1, explanation: "Lemmatization converts inflected words to their dictionary base form." },
    { prompt: "What are word embeddings?", options: ["Paragraph titles", "Dense vector representations of words", "Audio files", "Grammar mistakes"], correctAnswer: 1, explanation: "Embeddings map words to numeric vectors that capture semantic relationships." },
    { prompt: "What is a bigram?", options: ["One word", "Two consecutive tokens", "A paragraph", "A dataset split"], correctAnswer: 1, explanation: "A bigram is a sequence of two adjacent tokens." },
    { prompt: "Which model family is widely used for modern NLP?", options: ["Transformers", "K-Means", "Linear sorting", "Bubble trees"], correctAnswer: 0, explanation: "Transformer-based models power many modern NLP systems." },
  ],
  DSA: [
    { prompt: "Which data structure follows LIFO order?", options: ["Queue", "Stack", "Heap", "Graph"], correctAnswer: 1, explanation: "A stack follows Last-In, First-Out order." },
    { prompt: "Which data structure follows FIFO order?", options: ["Queue", "Stack", "Tree", "Set"], correctAnswer: 0, explanation: "A queue follows First-In, First-Out order." },
    { prompt: "What is the time complexity of binary search on a sorted array?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], correctAnswer: 1, explanation: "Binary search halves the search space each step, so it is O(log n)." },
    { prompt: "What is the time complexity of accessing arr[i] in an array?", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], correctAnswer: 0, explanation: "Array indexing is constant time because of contiguous memory access." },
    { prompt: "What is the time complexity of inserting at the head of a linked list?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], correctAnswer: 0, explanation: "Insertion at the head only updates a few pointers." },
    { prompt: "What prevents infinite recursion?", options: ["A base case", "A for loop", "A heap", "A pointer"], correctAnswer: 0, explanation: "A base case gives recursion a stopping condition." },
    { prompt: "Which traversal commonly uses a queue?", options: ["DFS", "BFS", "Inorder", "Postorder only"], correctAnswer: 1, explanation: "Breadth-first search explores level by level using a queue." },
    { prompt: "Which traversal commonly uses a stack or recursion?", options: ["BFS", "DFS", "Level sort", "Heap scan"], correctAnswer: 1, explanation: "Depth-first search uses a stack explicitly or through recursion." },
    { prompt: "What is the average-case lookup time of a hash map?", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], correctAnswer: 0, explanation: "Hash maps provide average-case constant-time lookup." },
    { prompt: "What is the time complexity of merge sort?", options: ["O(log n)", "O(n)", "O(n log n)", "O(n²)"], correctAnswer: 2, explanation: "Merge sort divides and merges data in O(n log n) time." },
  ],
};

const variationBuilders: Array<{
  difficulty: QuizQuestion["difficulty"];
  buildQuestion: (prompt: string) => string;
  rotateBy: number;
}> = [
  { difficulty: "easy", buildQuestion: (prompt) => prompt, rotateBy: 0 },
  { difficulty: "easy", buildQuestion: (prompt) => `Choose the correct answer: ${prompt}`, rotateBy: 1 },
  { difficulty: "medium", buildQuestion: (prompt) => `Practice check — ${prompt}`, rotateBy: 2 },
  { difficulty: "medium", buildQuestion: (prompt) => `During revision, answer this: ${prompt}`, rotateBy: 3 },
  { difficulty: "hard", buildQuestion: (prompt) => `Advanced concept check: ${prompt}`, rotateBy: 1 },
  { difficulty: "hard", buildQuestion: (prompt) => `Exam challenge: ${prompt}`, rotateBy: 2 },
];

const rotateOptions = (options: string[], correctAnswer: number, rotateBy: number) => {
  const amount = rotateBy % options.length;
  if (amount === 0) return { options, correctAnswer };

  const rotatedOptions = options.map((_, index) => options[(index + amount) % options.length]);
  const rotatedCorrectAnswer = (correctAnswer - amount + options.length) % options.length;

  return { options: rotatedOptions, correctAnswer: rotatedCorrectAnswer };
};

let currentId = 1;

export const quizData: QuizQuestion[] = Object.entries(subjectSeeds).flatMap(([subject, seeds]) =>
  seeds.flatMap((seed) =>
    variationBuilders.map((variation) => {
      const rotated = rotateOptions(seed.options, seed.correctAnswer, variation.rotateBy);

      return {
        id: currentId++,
        subject,
        question: variation.buildQuestion(seed.prompt),
        options: rotated.options,
        correctAnswer: rotated.correctAnswer,
        difficulty: variation.difficulty,
        explanation: `${seed.explanation} This ${variation.difficulty} question helps you revise ${subject.toLowerCase()} fundamentals.`,
      } satisfies QuizQuestion;
    }),
  ),
);

export const subjects = [...new Set(quizData.map(q => q.subject))];
