
http://localhost:8080/


# Artificial Intelligence Capstone Project

## Project Name: AI Study Pal

---

# Step 1: Project Planning

## Define Goal

Create an AI based web application that helps students with:

* Study plans
* Quiz generation
* Text summarization
* Motivational feedback
* Study tips
* Downloadable schedules

## Final Output:

Student enters subject + study hours → Website gives complete study support.

---

# Step 2: Setup Environment

## Install Tools

```python
pip install pandas matplotlib scikit-learn tensorflow nltk flask
```

## Software Required

* Anaconda
* Jupyter Notebook
* Visual Studio Code

---

# Step 3: Create Dataset

Create CSV file:

## study_data.csv

| Subject | Text                               |
| ------- | ---------------------------------- |
| Python  | Python is programming language     |
| ML      | Machine learning uses algorithms   |
| NLP     | NLP processes language             |
| DL      | Deep learning uses neural networks |

## Code

```python
import pandas as pd

df = pd.read_csv("study_data.csv")
print(df.head())
```

---

# Step 4: Data Cleaning

Tasks:

* Remove duplicates
* Convert lowercase
* Remove null values

## Code

```python
df.drop_duplicates(inplace=True)
df.dropna(inplace=True)
df["Text"] = df["Text"].str.lower()
print(df)
```

---

# Step 5: Perform EDA

## Subject Count Chart

```python
import matplotlib.pyplot as plt

df["Subject"].value_counts().plot(kind="pie", autopct="%1.1f%%")
plt.title("Subjects Distribution")
plt.show()
```

## Diagram

```text
Python   25%
ML       25%
DL       25%
NLP      25%
```

---

# Step 6: AI Study Plan Generator

User enters:

* Subject = Python
* Hours = 3

## Logic:

Generate timetable.

## Code

```python
subject = "Python"
hours = 3

for i in range(1, hours+1):
    print("Hour", i, "-", subject, "Study")
```

## Output

```text
Hour 1 - Python Study
Hour 2 - Python Study
Hour 3 - Python Study
```

---

# Step 7: Machine Learning Quiz Difficulty Classification

Use Logistic Regression.

## Example Dataset

| Question               | Level  |
| ---------------------- | ------ |
| What is Python?        | Easy   |
| Explain Neural Network | Medium |

## Code

```python
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression

x = ["what is python", "define list", "explain neural network"]
y = ["Easy", "Easy", "Medium"]

cv = CountVectorizer()
X = cv.fit_transform(x)

model = LogisticRegression()
model.fit(X, y)

pred = model.predict(cv.transform(["what is tuple"]))
print(pred)
```

---

# Step 8: Quiz Generator

## Example Output

1. What is Python?
   A) Animal
   B) Language 
   C) Car

2. AI stands for?
   A) Artificial Intelligence 

3. NLP used for?
   A) Language Processing 

---

# Step 9: K-Means Resource Suggestion

Recommend links based on subject group.

## Code

```python
from sklearn.cluster import KMeans

data = [[1],[2],[10],[11]]
km = KMeans(n_clusters=2)
km.fit(data)
print(km.labels_)
```

## Example Suggestion

* Python → Official Docs
* ML → Tutorials
* NLP → Wikipedia

---

# Step 10: Deep Learning Text Summarizer

Use Keras basic model.

## Code

```python
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense

model = Sequential()
model.add(Dense(10, input_shape=(5,), activation='relu'))
model.add(Dense(1))
model.compile(loss='mse', optimizer='adam')
```

## Example

Input Text = 200 words
Output Summary = 50 words

---

# Step 11: Motivational Feedback Generator

## Code

```python
score = 80

if score > 70:
    print("Great job! Keep learning.")
else:
    print("Practice more, you can do it!")
```

---

# Step 12: NLP Keyword Extraction

Use NLTK.

## Code

```python
import nltk
from nltk.tokenize import word_tokenize

text = "Python machine learning is powerful"
words = word_tokenize(text)
print(words)
```

## Output

```text
['Python','machine','learning','is','powerful']
```

## Study Tip Example

* Review machine learning daily
* Practice Python coding

---

# Step 13: Flask Web Application

## Structure

```text
project/
 app.py
 templates/
   index.html
```

## app.py

```python
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/", methods=["GET","POST"])
def home():
    result = ""
    if request.method == "POST":
        subject = request.form["subject"]
        hours = request.form["hours"]
        result = f"Study {subject} for {hours} hours"
    return render_template("index.html", result=result)

app.run()
```

---

# Step 14: HTML Frontend

## index.html

```html
<html>
<body>
<h2>AI Study Pal</h2>

<form method="post">
<input type="text" name="subject" placeholder="Subject">
<input type="number" name="hours" placeholder="Hours">
<button type="submit">Generate</button>
</form>

<p>{{result}}</p>

</body>
</html>
```

---

# Step 15: Download CSV Schedule

```python
import pandas as pd

plan = {"Hour":[1,2,3], "Task":["Read","Practice","Quiz"]}
df = pd.DataFrame(plan)
df.to_csv("schedule.csv", index=False)
```

---

# Step 16: Testing

Check:

* Login works
* Quiz works
* Summary generated
* CSV downloads
* Website opens

---

# Step 17: Evaluation Metrics

## ML Model

* Accuracy
* F1 Score

## Web App

* Easy to use
* Fast output

---

# Step 18: Final Deliverables

* Dataset
* Python code
* ML models
* Quiz system
* Summarizer
* Flask website
* CSV schedule
* PPT + Report

---

# Final Workflow Diagram

```text
User Input
   ↓
Subject + Hours
   ↓
AI Engine
 ├─ Study Plan
 ├─ Quiz
 ├─ Summary
 ├─ Feedback
 ├─ Tips
   ↓
Flask Website
   ↓
Download Schedule
```

---

# Resume Points

* Developed AI Study Assistant using Python
* Implemented ML quiz classifier using Logistic Regression
* Used NLP for keyword extraction
* Built Flask web app for student support
* Generated downloadable schedules

---

# Conclusion

AI Study Pal is a beginner-friendly capstone project combining Python, ML, DL, NLP, and Web Development into one practical educational system.
