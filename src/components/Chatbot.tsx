import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Unlimited attempts

const studyResponses: Record<string, string> = {
  python: "Python is a versatile programming language! Key topics to study:\n\n• **Variables & Data Types**: int, float, str, list, dict, tuple, set\n• **Control Flow**: if/elif/else, for/while loops\n• **Functions**: def, parameters, return values, lambda\n• **OOP**: classes, inheritance, polymorphism\n• **Libraries**: NumPy, Pandas, Matplotlib, scikit-learn\n\nStart with basics and practice daily with small projects!",
  machine: "Machine Learning fundamentals:\n\n• **Supervised Learning**: Linear/Logistic Regression, Decision Trees, SVM, Random Forest\n• **Unsupervised Learning**: K-Means, PCA, DBSCAN\n• **Key Concepts**: Overfitting, Cross-validation, Feature Engineering\n• **Metrics**: Accuracy, Precision, Recall, F1-Score\n• **Libraries**: scikit-learn, XGBoost\n\nStart with scikit-learn tutorials and Kaggle datasets!",
  deep: "Deep Learning essentials:\n\n• **Neural Networks**: Perceptrons, activation functions (ReLU, Sigmoid)\n• **Architectures**: CNN (images), RNN/LSTM (sequences), Transformers (NLP)\n• **Training**: Backpropagation, Gradient Descent, Adam optimizer\n• **Regularization**: Dropout, Batch Normalization\n• **Frameworks**: TensorFlow/Keras, PyTorch\n\nStart with Keras for beginners - it's the most intuitive!",
  nlp: "Natural Language Processing topics:\n\n• **Text Processing**: Tokenization, Stemming, Lemmatization\n• **Representations**: Bag-of-Words, TF-IDF, Word Embeddings (Word2Vec, GloVe)\n• **Models**: Naive Bayes, LSTM, Transformers (BERT, GPT)\n• **Tasks**: Sentiment Analysis, NER, Text Classification, Summarization\n• **Libraries**: NLTK, spaCy, Hugging Face\n\nStart with NLTK for learning fundamentals!",
  math: "Mathematics for AI/ML:\n\n• **Linear Algebra**: Vectors, Matrices, Eigenvalues\n• **Calculus**: Derivatives, Gradients, Chain Rule\n• **Probability**: Bayes' Theorem, Distributions\n• **Statistics**: Mean, Variance, Hypothesis Testing\n• **Optimization**: Gradient Descent, Convex Optimization\n\nKhan Academy and 3Blue1Brown are excellent free resources!",
  study: "Effective study strategies:\n\n• **Pomodoro Technique**: 25 min study, 5 min break\n• **Active Recall**: Test yourself instead of re-reading\n• **Spaced Repetition**: Review at increasing intervals\n• **Feynman Technique**: Explain concepts simply\n• **Mind Mapping**: Visualize connections between topics\n\nConsistency beats intensity - study a little every day!",
  quiz: "To practice with quizzes:\n\n1. Go to the **Quiz** section from the navigation\n2. Select your subject (Math, Science, Python, ML, DL, NLP)\n3. Choose difficulty level\n4. Answer 30 multiple-choice questions\n5. Get instant feedback and explanations\n\nQuizzes help with active recall - one of the most effective study methods!",
  hello: "Hello! 👋 I'm your AI Study Pal assistant. I can help you with:\n\n• **Study tips** and strategies\n• **Subject explanations** (Python, ML, DL, NLP, Math, Science)\n• **Quiz guidance** and practice\n• **Resource suggestions**\n• **Study plan advice**\n• **Code examples** and explanations\n\nJust ask me anything about your studies!",
  hi: "Hi there! 👋 Welcome to AI Study Pal! How can I help you today? You can ask me about any subject, study techniques, coding problems, or how to use the app's features.",
  help: "Here's what I can help you with:\n\n🎯 **Study Plans**: Ask about creating study schedules\n📝 **Quizzes**: Get quiz tips and subject practice\n📖 **Summarization**: Learn about text summarization\n💡 **Study Tips**: Get effective study strategies\n🔬 **Subjects**: Python, ML, Deep Learning, NLP, Math, Science\n💻 **Code Examples**: Ask for code in Python, ML, etc.\n📊 **Diagrams**: Get ASCII diagrams for concepts\n\nJust type your question and I'll do my best to help!",
  resource: "Recommended study resources:\n\n• **Python**: python.org, Real Python, Automate the Boring Stuff\n• **ML**: Coursera (Andrew Ng), Kaggle Learn, scikit-learn docs\n• **Deep Learning**: fast.ai, deeplearning.ai, TensorFlow tutorials\n• **NLP**: Hugging Face course, Stanford NLP (YouTube)\n• **Math**: Khan Academy, 3Blue1Brown, MIT OpenCourseWare\n• **General**: GeeksForGeeks, W3Schools, Stack Overflow",
  exam: "Exam preparation tips:\n\n1. **Start Early**: Begin studying at least 2 weeks before\n2. **Make a Schedule**: Use our Study Plan generator\n3. **Practice Tests**: Take quizzes in our Quiz section\n4. **Review Notes**: Focus on weak areas\n5. **Get Enough Sleep**: 7-8 hours before the exam\n6. **Stay Hydrated**: Drink water during study sessions\n\nYou've got this! 💪",
  "for loop": "**Python For Loop Examples:**\n\n```python\n# Basic for loop\nfor i in range(5):\n    print(i)  # 0, 1, 2, 3, 4\n\n# Loop through a list\nfruits = ['apple', 'banana', 'cherry']\nfor fruit in fruits:\n    print(fruit)\n\n# Loop with enumerate\nfor index, fruit in enumerate(fruits):\n    print(f'{index}: {fruit}')\n\n# List comprehension\nsquares = [x**2 for x in range(10)]\nprint(squares)\n```",
  "while loop": "**Python While Loop Examples:**\n\n```python\n# Basic while loop\ncount = 0\nwhile count < 5:\n    print(count)\n    count += 1\n\n# While with break\nwhile True:\n    user = input('Enter quit to exit: ')\n    if user == 'quit':\n        break\n\n# While with continue\ni = 0\nwhile i < 10:\n    i += 1\n    if i % 2 == 0:\n        continue\n    print(i)  # prints odd numbers\n```",
  "if else": "**Python If/Else Examples:**\n\n```python\n# Basic if-else\nage = 18\nif age >= 18:\n    print('Adult')\nelse:\n    print('Minor')\n\n# If-elif-else\nscore = 85\nif score >= 90:\n    grade = 'A'\nelif score >= 80:\n    grade = 'B'\nelif score >= 70:\n    grade = 'C'\nelse:\n    grade = 'F'\nprint(f'Grade: {grade}')\n\n# Ternary operator\nresult = 'Pass' if score >= 60 else 'Fail'\n```",
  function: "**Python Functions:**\n\n```python\n# Basic function\ndef greet(name):\n    return f'Hello, {name}!'\n\nprint(greet('Venkat'))\n\n# Default parameters\ndef power(base, exp=2):\n    return base ** exp\n\n# *args and **kwargs\ndef summary(*args, **kwargs):\n    print(f'Args: {args}')\n    print(f'Kwargs: {kwargs}')\n\n# Lambda function\nsquare = lambda x: x ** 2\nprint(square(5))  # 25\n```",
  class: "**Python Classes & OOP:**\n\n```python\nclass Student:\n    def __init__(self, name, grade):\n        self.name = name\n        self.grade = grade\n\n    def is_passing(self):\n        return self.grade >= 60\n\n    def __str__(self):\n        return f'{self.name}: {self.grade}'\n\n# Inheritance\nclass GradStudent(Student):\n    def __init__(self, name, grade, thesis):\n        super().__init__(name, grade)\n        self.thesis = thesis\n\ns = Student('Venkat', 90)\nprint(s.is_passing())  # True\n```",
  list: "**Python Lists:**\n\n```python\n# Creating lists\nnums = [1, 2, 3, 4, 5]\nmixed = [1, 'hello', True, 3.14]\n\n# Common operations\nnums.append(6)\nnums.insert(0, 0)\nnums.remove(3)\npopped = nums.pop()\n\n# Slicing\nprint(nums[1:3])   # [2, 3]\nprint(nums[::-1])  # reversed\n\n# List comprehension\nevens = [x for x in range(20) if x % 2 == 0]\n\n# Sorting\nnums.sort()\nnums.sort(reverse=True)\n```",
  dictionary: "**Python Dictionaries:**\n\n```python\n# Creating a dict\nstudent = {\n    'name': 'Venkat',\n    'age': 21,\n    'subjects': ['ML', 'DL', 'NLP']\n}\n\n# Access & modify\nprint(student['name'])\nstudent['grade'] = 'A'\n\n# Methods\nkeys = student.keys()\nvalues = student.values()\nitems = student.items()\n\n# Dict comprehension\nsquares = {x: x**2 for x in range(6)}\n\n# Get with default\nage = student.get('age', 0)\n```",
  "linear regression": "**Linear Regression in Python:**\n\n```python\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.model_selection import train_test_split\nimport numpy as np\n\nX = np.array([[1], [2], [3], [4], [5]])\ny = np.array([2, 4, 5, 4, 5])\n\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42\n)\n\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\n\npredictions = model.predict(X_test)\nprint(f'Score: {model.score(X_test, y_test)}')\n```\n\n📊 **Diagram:**\n```\ny |\n  |       *  *\n  |    * /\n  |  * /\n  | /\n  |/__________ x\n  Linear Regression Line\n```",
  "neural network": "**Neural Network with Keras:**\n\n```python\nfrom tensorflow import keras\nfrom keras.models import Sequential\nfrom keras.layers import Dense\n\nmodel = Sequential([\n    Dense(64, activation='relu', input_shape=(10,)),\n    Dense(32, activation='relu'),\n    Dense(1, activation='sigmoid')\n])\n\nmodel.compile(\n    optimizer='adam',\n    loss='binary_crossentropy',\n    metrics=['accuracy']\n)\n```\n\n📊 **Architecture:**\n```\nInput(10) → [Dense 64 ReLU] → [Dense 32 ReLU] → [Dense 1 Sigmoid] → Output\n```",
  cnn: "**Convolutional Neural Network (CNN):**\n\n```python\nfrom keras.models import Sequential\nfrom keras.layers import Conv2D, MaxPooling2D\nfrom keras.layers import Flatten, Dense, Dropout\n\nmodel = Sequential([\n    Conv2D(32, (3,3), activation='relu',\n           input_shape=(28, 28, 1)),\n    MaxPooling2D((2, 2)),\n    Conv2D(64, (3,3), activation='relu'),\n    MaxPooling2D((2, 2)),\n    Flatten(),\n    Dense(128, activation='relu'),\n    Dropout(0.5),\n    Dense(10, activation='softmax')\n])\n```\n\n📊 **CNN Architecture:**\n```\nImage → [Conv2D] → [Pool] → [Conv2D] → [Pool] → [Flatten] → [Dense] → Output\n28×28    26×26×32   13×13    11×11×64   5×5      1600        128       10\n```",
  pandas: "**Pandas Data Analysis:**\n\n```python\nimport pandas as pd\n\ndf = pd.DataFrame({\n    'Name': ['Venkat', 'Ravi', 'Priya'],\n    'Subject': ['ML', 'DL', 'NLP'],\n    'Score': [92, 88, 95]\n})\n\nprint(df.describe())\nprint(df['Score'].mean())\n\nhigh_scores = df[df['Score'] > 90]\ndf.groupby('Subject')['Score'].mean()\n```",
  matplotlib: "**Matplotlib Visualization:**\n\n```python\nimport matplotlib.pyplot as plt\nimport numpy as np\n\nx = np.linspace(0, 10, 100)\nplt.plot(x, np.sin(x), label='sin(x)')\nplt.plot(x, np.cos(x), label='cos(x)')\nplt.legend()\nplt.title('Trigonometric Functions')\nplt.show()\n\nsubjects = ['ML', 'DL', 'NLP', 'Python']\nscores = [85, 90, 78, 92]\nplt.bar(subjects, scores, color='teal')\nplt.title('Subject Scores')\nplt.show()\n```",
  tokenization: "**NLP Tokenization with NLTK:**\n\n```python\nimport nltk\nfrom nltk.tokenize import word_tokenize, sent_tokenize\nfrom nltk.corpus import stopwords\nfrom nltk.stem import PorterStemmer\n\nnltk.download('punkt')\nnltk.download('stopwords')\n\ntext = \"AI Study Pal helps students learn.\"\nwords = word_tokenize(text)\nstop = set(stopwords.words('english'))\nfiltered = [w for w in words if w.lower() not in stop]\n\nps = PorterStemmer()\nstemmed = [ps.stem(w) for w in filtered]\n```",
  "k-means": "**K-Means Clustering:**\n\n```python\nfrom sklearn.cluster import KMeans\nimport numpy as np\nimport matplotlib.pyplot as plt\n\nX = np.random.randn(100, 2)\nkmeans = KMeans(n_clusters=3, random_state=42)\nkmeans.fit(X)\n\nplt.scatter(X[:, 0], X[:, 1], c=kmeans.labels_, cmap='viridis')\nplt.scatter(kmeans.cluster_centers_[:, 0], kmeans.cluster_centers_[:, 1],\n            c='red', marker='X', s=200)\nplt.title('K-Means Clustering')\nplt.show()\n```",
  transformer: "**Transformer Architecture Overview:**\n\n```\n┌─────────────────────────┐\n│      Output Probs       │\n├─────────────────────────┤\n│    Linear + Softmax     │\n├─────────────────────────┤\n│   ┌─── Decoder ────┐    │\n│   │ Masked Attn    │    │\n│   │ Cross Attn     │    │\n│   │ Feed Forward   │    │\n│   └────────────────┘    │\n├─────────────────────────┤\n│   ┌─── Encoder ────┐    │\n│   │ Self Attention  │    │\n│   │ Feed Forward   │    │\n│   └────────────────┘    │\n├─────────────────────────┤\n│  Positional Encoding    │\n│  Input Embeddings       │\n└─────────────────────────┘\n```\n\n**Key Concepts:**\n• **Self-Attention**: Weighs importance of each word\n• **Multi-Head**: Multiple attention perspectives\n• **Used in**: BERT, GPT, T5",
  bert: "**BERT (Bidirectional Encoder Representations):**\n\n```python\nfrom transformers import pipeline\n\nclassifier = pipeline('sentiment-analysis')\nresult = classifier('I love studying AI!')\nprint(result)\n# [{'label': 'POSITIVE', 'score': 0.99}]\n```\n\n**BERT is great for**: Classification, NER, Q&A, Summarization",
  sorting: "**Sorting Algorithms in Python:**\n\n```python\n# Bubble Sort\ndef bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr\n\n# Quick Sort\ndef quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr)//2]\n    left = [x for x in arr if x < pivot]\n    mid = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + mid + quick_sort(right)\n```",
  "data structure": "**Common Data Structures:**\n\n```python\n# Stack (LIFO)\nstack = []\nstack.append(1)\nstack.pop()\n\n# Queue (FIFO)\nfrom collections import deque\nqueue = deque()\nqueue.append(1)\nqueue.popleft()\n\n# Binary Tree\nclass TreeNode:\n    def __init__(self, val):\n        self.val = val\n        self.left = None\n        self.right = None\n```",
  algorithm: "**Algorithm Complexity:**\n\n```\nO(1)      - Constant  (array access)\nO(log n)  - Logarithmic (binary search)\nO(n)      - Linear (loop)\nO(n log n)- Linearithmic (merge sort)\nO(n²)     - Quadratic (bubble sort)\nO(2^n)    - Exponential (recursion)\n```\n\n```python\n# Binary Search - O(log n)\ndef binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1\n```",
  sql: "**SQL Basics for Data Science:**\n\n```sql\nCREATE TABLE students (\n    id INT PRIMARY KEY,\n    name VARCHAR(100),\n    subject VARCHAR(50),\n    score INT\n);\n\nSELECT * FROM students\nWHERE score > 80\nORDER BY score DESC;\n\nSELECT subject, AVG(score) as avg_score\nFROM students\nGROUP BY subject\nHAVING AVG(score) > 85;\n```",
  git: "**Git Version Control:**\n\n```bash\ngit init\ngit clone <url>\ngit add .\ngit commit -m \"Add feature\"\ngit push origin main\ngit branch feature-branch\ngit checkout feature-branch\ngit merge feature-branch\n```\n\n📊 **Git Workflow:**\n```\nWorking Dir → Staging → Local Repo → Remote\n  git add     git commit    git push\n```",
  numpy: "**NumPy Array Operations:**\n\n```python\nimport numpy as np\n\narr = np.array([1, 2, 3, 4, 5])\nmatrix = np.array([[1, 2], [3, 4]])\n\nprint(arr.shape, arr.dtype)\nprint(np.zeros((3, 3)))\nprint(np.ones((2, 4)))\nprint(np.random.randn(3, 3))\n\n# Operations\nprint(arr * 2)\nprint(np.dot(matrix, matrix))\nprint(matrix.T)  # transpose\n```",
  flask: "**Flask Web Application:**\n\n```python\nfrom flask import Flask, render_template, request\n\napp = Flask(__name__)\n\n@app.route('/')\ndef home():\n    return render_template('index.html')\n\n@app.route('/predict', methods=['POST'])\ndef predict():\n    data = request.form['input']\n    result = model.predict(data)\n    return render_template('result.html',\n                         prediction=result)\n\nif __name__ == '__main__':\n    app.run(debug=True)\n```",
  html: "**HTML Structure:**\n\n```html\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <title>AI Study Pal</title>\n    <link rel=\"stylesheet\" href=\"style.css\">\n</head>\n<body>\n    <header>\n        <h1>Welcome</h1>\n        <nav>\n            <a href=\"/\">Home</a>\n            <a href=\"/about\">About</a>\n        </nav>\n    </header>\n    <main>\n        <p>Content here</p>\n    </main>\n    <script src=\"app.js\"></script>\n</body>\n</html>\n```",
  css: "**CSS Styling Examples:**\n\n```css\n/* Flexbox layout */\n.container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 1rem;\n}\n\n/* Grid layout */\n.grid {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    gap: 20px;\n}\n\n/* Responsive */\n@media (max-width: 768px) {\n    .grid {\n        grid-template-columns: 1fr;\n    }\n}\n\n/* Animation */\n@keyframes fadeIn {\n    from { opacity: 0; }\n    to { opacity: 1; }\n}\n```",
  javascript: "**JavaScript Essentials:**\n\n```javascript\n// Variables\nconst name = 'Venkat';\nlet score = 85;\n\n// Arrow functions\nconst add = (a, b) => a + b;\n\n// Array methods\nconst nums = [1, 2, 3, 4, 5];\nconst doubled = nums.map(n => n * 2);\nconst evens = nums.filter(n => n % 2 === 0);\nconst sum = nums.reduce((a, b) => a + b, 0);\n\n// Async/Await\nasync function fetchData() {\n    const res = await fetch('/api/data');\n    const data = await res.json();\n    return data;\n}\n\n// Destructuring\nconst { x, y } = { x: 1, y: 2 };\n```",
  react: "**React Component Example:**\n\n```jsx\nimport { useState, useEffect } from 'react';\n\nfunction Counter() {\n    const [count, setCount] = useState(0);\n\n    useEffect(() => {\n        document.title = `Count: ${count}`;\n    }, [count]);\n\n    return (\n        <div>\n            <h1>{count}</h1>\n            <button onClick={() => setCount(c => c + 1)}>\n                Increment\n            </button>\n        </div>\n    );\n}\n\nexport default Counter;\n```",
  leetcode: "**LeetCode Problem-Solving Plan:**\n\n1. Start with **Arrays, Strings, Hash Maps, Stack, Queue**\n2. Learn patterns: **Two Pointers, Sliding Window, Binary Search, DFS, BFS**\n3. Move to **Trees, Graphs, Heaps, Dynamic Programming**\n4. For every problem, write:\n   • brute force\n   • optimized approach\n   • time complexity\n   • space complexity\n\n**Interview template:**\n```text\n1. Understand input/output\n2. Identify the pattern\n3. Write brute force\n4. Optimize\n5. Test edge cases\n```",
  dsa: "**DSA Roadmap:**\n\n• **Arrays & Strings**\n• **Hash Maps & Sets**\n• **Stack & Queue**\n• **Linked Lists**\n• **Trees & Binary Search Trees**\n• **Graphs**\n• **Heap / Priority Queue**\n• **Recursion & Backtracking**\n• **Dynamic Programming**\n\nIf you want, ask me about any one topic like **stack**, **graph**, **dp**, or **binary search**.",
  array: "**Array Problems:**\n\n```python\n# Reverse an array\ndef reverse_array(nums):\n    left, right = 0, len(nums) - 1\n    while left < right:\n        nums[left], nums[right] = nums[right], nums[left]\n        left += 1\n        right -= 1\n    return nums\n```\n\n**Common patterns:** prefix sum, sliding window, two pointers, hashing.",
  string: "**String Interview Tips:**\n\n```python\ndef is_palindrome(s):\n    cleaned = ''.join(ch.lower() for ch in s if ch.isalnum())\n    return cleaned == cleaned[::-1]\n```\n\nCommon string topics: palindrome, anagram, substring, frequency count, sliding window.",
  "linked list": "**Linked List Basics:**\n\n```python\nclass ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef traverse(head):\n    while head:\n        print(head.val)\n        head = head.next\n```\n\nKey interview topics: reverse list, middle node, cycle detection, merge two sorted lists.",
  stack: "**Stack (LIFO):**\n\n```python\nstack = []\nstack.append(10)\nstack.append(20)\nprint(stack.pop())  # 20\n```\n\nUse stacks for: parentheses matching, undo operations, DFS, monotonic stack problems.",
  queue: "**Queue (FIFO):**\n\n```python\nfrom collections import deque\nq = deque([1, 2, 3])\nq.append(4)\nprint(q.popleft())  # 1\n```\n\nQueues are useful for BFS, scheduling, and first-in-first-out processing.",
  tree: "**Binary Tree Traversals:**\n\n```python\ndef inorder(root):\n    if not root:\n        return\n    inorder(root.left)\n    print(root.val)\n    inorder(root.right)\n```\n\nLearn preorder, inorder, postorder, level order, height, diameter, and BST rules.",
  graph: "**Graph Basics:**\n\n```python\ngraph = {\n    'A': ['B', 'C'],\n    'B': ['D'],\n    'C': [],\n    'D': []\n}\n```\n\nTopics to learn: DFS, BFS, topological sort, shortest path, connected components.",
  recursion: "**Recursion Template:**\n\n```python\ndef factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n```\n\nAlways define:\n• base case\n• recursive case\n• shrinking input\n• dry run with a small example",
  "dynamic programming": "**Dynamic Programming Steps:**\n\n1. Define the state\n2. Write the recurrence\n3. Set base cases\n4. Choose memoization or tabulation\n\n```python\ndef climb_stairs(n):\n    if n <= 2:\n        return n\n    a, b = 1, 2\n    for _ in range(3, n + 1):\n        a, b = b, a + b\n    return b\n```",
  dp: "**DP Quick Guide:**\n\nUse DP when a problem has:\n• overlapping subproblems\n• optimal substructure\n\nPopular problems: Fibonacci, Climbing Stairs, Knapsack, Longest Common Subsequence, Coin Change.",
  "binary search": "**Binary Search:**\n\n```python\ndef binary_search(nums, target):\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] == target:\n            return mid\n        if nums[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n```\n\nTime complexity: **O(log n)**",
  bfs: "**Breadth-First Search (BFS):**\n\n```python\nfrom collections import deque\n\ndef bfs(graph, start):\n    q = deque([start])\n    visited = {start}\n    while q:\n        node = q.popleft()\n        print(node)\n        for nei in graph[node]:\n            if nei not in visited:\n                visited.add(nei)\n                q.append(nei)\n```",
  dfs: "**Depth-First Search (DFS):**\n\n```python\ndef dfs(graph, node, visited=None):\n    if visited is None:\n        visited = set()\n    if node in visited:\n        return\n    visited.add(node)\n    print(node)\n    for nei in graph[node]:\n        dfs(graph, nei, visited)\n```",
  "sliding window": "**Sliding Window Pattern:**\n\n```python\ndef max_sum_subarray(nums, k):\n    window_sum = sum(nums[:k])\n    best = window_sum\n    for i in range(k, len(nums)):\n        window_sum += nums[i] - nums[i-k]\n        best = max(best, window_sum)\n    return best\n```\n\nUse this for substring and subarray problems.",
  "two pointer": "**Two Pointer Pattern:**\n\n```python\ndef two_sum_sorted(nums, target):\n    left, right = 0, len(nums) - 1\n    while left < right:\n        total = nums[left] + nums[right]\n        if total == target:\n            return [left, right]\n        if total < target:\n            left += 1\n        else:\n            right -= 1\n```",
  heap: "**Heap / Priority Queue:**\n\n```python\nimport heapq\nnums = [5, 1, 9, 2]\nheapq.heapify(nums)\nheapq.heappush(nums, 0)\nprint(heapq.heappop(nums))  # 0\n```\n\nHeaps are used in top-k problems, scheduling, and Dijkstra's algorithm.",
  hashmap: "**Hash Map / Dictionary:**\n\n```python\ndef frequency_count(nums):\n    freq = {}\n    for num in nums:\n        freq[num] = freq.get(num, 0) + 1\n    return freq\n```\n\nUse hash maps for fast lookup, counting, grouping, and complement problems like Two Sum.",
  interview: "**Coding Interview Strategy:**\n\n• Clarify the problem\n• Ask about constraints\n• Start with brute force\n• Optimize step by step\n• Explain time and space complexity\n• Test edge cases\n\nAsk me any coding topic and I will give you explanation + code.",
  leet: "Ask me for **LeetCode**, **arrays**, **strings**, **linked list**, **tree**, **graph**, **dp**, **bfs**, **dfs**, or **binary search** and I’ll give you coding help with examples.",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes("code") && lower.includes("python")) {
    return "What Python topic do you need code for? I can help with:\n\n• **Loops**: for loop, while loop\n• **Conditions**: if/else statements\n• **Functions**: def, lambda\n• **OOP**: classes, inheritance\n• **Data Structures**: list, dictionary\n• **ML**: linear regression, k-means, neural network\n• **NLP**: tokenization, BERT\n• **Data**: pandas, matplotlib, numpy\n• **Web**: flask, html, css, javascript, react\n\nJust type the topic name!";
  }
  if (lower.includes("diagram") || lower.includes("flowchart")) {
    return "I can show diagrams for various topics! Try asking about:\n\n📊 **Neural Network** architecture\n📊 **CNN** pipeline\n📊 **Transformer** architecture\n📊 **K-Means** clustering\n📊 **Data Structures** (stack, queue, tree)\n📊 **Algorithm** complexity\n📊 **Git** workflow\n📊 **Linear Regression** visualization\n\nJust type the topic name!";
  }
  if (lower.includes("code") || lower.includes("program") || lower.includes("write")) {
    return "I can provide code examples! Try asking about:\n\n💻 **Python**: for loop, while loop, if else, function, class, list, dictionary\n💻 **ML**: linear regression, k-means, neural network\n💻 **DL**: CNN, transformer, BERT\n💻 **Data**: pandas, matplotlib, numpy\n💻 **Web**: flask, html, css, javascript, react\n💻 **CS**: sorting, data structure, algorithm, SQL, git\n\nJust type the topic name!";
  }

  for (const [key, value] of Object.entries(studyResponses)) {
    if (lower.includes(key)) return value;
  }
  if (lower.includes("thank")) return "You're welcome! 😊 Keep up the great work with your studies. Feel free to ask anything else!";
  if (lower.includes("how are")) return "I'm doing great, thanks for asking! I'm here and ready to help you study. What topic would you like to explore?";
  return `Great question! Here are some suggestions based on your query:\n\n• Try exploring the **Study Plan** section to create a personalized schedule\n• Check out the **Quiz** section for practice questions\n• Use the **Summarizer** to condense your study materials\n• Visit **Study Tips** for effective learning strategies\n\n💻 **Coding help**: ask for **LeetCode**, **DSA**, **arrays**, **graph**, **dp**, **react**, or **python**\n📊 **Ask for diagrams**: Type "diagram" or topics like "transformer", "CNN"\n\nI can help with Python, ML, Deep Learning, NLP, Math, Data Structures, Algorithms, LeetCode, SQL, Web Dev, and more!`;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! 👋 I'm your AI Study Pal. Ask me anything about your studies!\n\n💻 **Code Examples**: Python, ML, DL, NLP, Web Dev, LeetCode, DSA\n📊 **Diagrams**: Neural Networks, CNN, Transformers\n📖 **Theory**: Any subject topic\n\nTry: \"for loop\", \"binary search\", \"leetcode\", \"graph\", \"react\"" },
  ]);
  const [input, setInput] = useState("");
  const [attempts, setAttempts] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === "#chatbot") setIsOpen(true);
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleToggleChat = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        window.location.hash = "chatbot";
      } else if (window.location.hash === "#chatbot") {
        window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
      }
      return next;
    });
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    const response = getResponse(input.trim());
    setMessages((prev) => [...prev, userMsg, { role: "assistant", content: response }]);
    setInput("");
    setAttempts((a) => a + 1);
  };

  const renderContent = (text: string) => {
    const parts = text.split(/(```[\s\S]*?```)/g);
    return parts.map((part, i) => {
      if (part.startsWith("```")) {
        const code = part.replace(/```\w*\n?/, "").replace(/```$/, "");
        return (
          <pre key={i} className="bg-background/80 rounded-md p-2 my-1 text-xs overflow-x-auto font-mono whitespace-pre">
            {code}
          </pre>
        );
      }
      const boldParts = part.split(/(\*\*.*?\*\*)/g);
      return (
        <span key={i}>
          {boldParts.map((bp, j) => {
            if (bp.startsWith("**") && bp.endsWith("**")) {
              return <strong key={j}>{bp.slice(2, -2)}</strong>;
            }
            return bp;
          })}
        </span>
      );
    });
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={handleToggleChat}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full gradient-primary shadow-lg hover:shadow-hover transition-all duration-300"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-primary-foreground" />
        ) : (
          <MessageCircle className="h-6 w-6 text-primary-foreground" />
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[520px] w-[400px] max-w-[calc(100vw-3rem)] flex-col rounded-xl border border-border bg-card shadow-2xl animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-xl gradient-primary px-4 py-3">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary-foreground" />
              <span className="font-heading font-semibold text-primary-foreground">AI Study Pal Chat</span>
            </div>
            <span className="text-xs text-primary-foreground/80">Unlimited</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent">
                    <Bot className="h-4 w-4 text-accent-foreground" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-line ${
                    msg.role === "user"
                      ? "gradient-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {renderContent(msg.content)}
                </div>
                {msg.role === "user" && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <User className="h-4 w-4 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-3">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about any topic, code, diagrams..."
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
              />
              <button
                type="submit"
                
                className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
