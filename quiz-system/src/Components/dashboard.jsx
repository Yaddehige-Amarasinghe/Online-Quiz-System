import React, { useState, useEffect } from 'react';
import './dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState({
    name: "Alex Johnson",
    level: 12,
    xp: 2450,
    streak: 7,
    totalQuizzes: 34,
    accuracy: 87
  });

  const [achievements, setAchievements] = useState([
    { id: 1, name: "Quiz Master", description: "Complete 50 quizzes", progress: 68, icon: "🏆", unlocked: false },
    { id: 2, name: "Streak Warrior", description: "7-day streak", progress: 100, icon: "🔥", unlocked: true },
    { id: 3, name: "Perfect Score", description: "Get 100% on 5 quizzes", progress: 80, icon: "⭐", unlocked: false },
    { id: 4, name: "Speed Demon", description: "Complete quiz in under 2 minutes", progress: 100, icon: "⚡", unlocked: true },
    { id: 5, name: "Category Conqueror", description: "Complete all quizzes in a category", progress: 0, icon: "🎖️", unlocked: false }
  ]);

  const [quizModules, setQuizModules] = useState([
    {
      id: 1,
      title: "JavaScript Fundamentals",
      difficulty: "Beginner",
      questions: [
        { id: 1, text: "What is the correct syntax for declaring a variable in JavaScript?", options: ["var x", "variable x", "v x", "let x"], correct: 0, explanation: "In JavaScript, variables can be declared jouéSystem: using var, let, or const." },
        { id: 2, text: "Which method converts a string to an integer?", options: ["parseInt()", "toString()", "parseFloat()", "number()"], correct: 0, explanation: "parseInt() converts a string to an integer." },
        { id: 3, text: "What does === mean in JavaScript?", options: ["Assignment", "Equality", "Strict Equality", "Comparison"], correct: 2, explanation: "=== checks for strict equality (value and type)." },
        { id: 4, text: "Which keyword is used to define a function?", options: ["func", "function", "def", "lambda"], correct: 1, explanation: "The function keyword defines a function in JavaScript." },
        { id: 5, text: "What is the result of '2' + 2?", options: ["4", "22", "NaN", "undefined"], correct: 1, explanation: "String concatenation occurs with + when a string is involved." }
      ],
      duration: "15 min",
      completed: true,
      score: 85,
      xpReward: 150,
      category: "Programming",
      currentQuestion: 0,
      userAnswers: []
    },
    {
      id: 2,
      title: "React Hooks Deep Dive",
      difficulty: "Advanced",
      questions: [
        { id: 1, text: "What does useState do?", options: ["Manages state", "Fetches data", "Handles events", "Renders components"], correct: 0, explanation: "useState manages state in functional components." },
        { id: 2, text: "Which hook handles side effects?", options: ["useEffect", "useState", "useReducer", "useContext"], correct: 0, explanation: "useEffect handles side effects like data fetching." },
        { id: 3, text: "What does useRef return?", options: ["State", "Mutable object", "Context", "Callback"], correct: 1, explanation: "useRef returns a mutable ref object." },
        { id: 4, text: "How to memoize a component?", options: ["useMemo", "useCallback", "React.memo", "useEffect"], correct: 2, explanation: "React.memo memoizes a component to prevent unnecessary renders." },
        { id: 5, text: "What is the purpose of useReducer?", options: ["State management", "Context sharing", "Effect handling", "Ref management"], correct: 0, explanation: "useReducer is used for complex state management." }
      ],
      duration: "20 min",
      completed: false,
      score: null,
      xpReward: 300,
      category: "Programming",
      currentQuestion: 0,
      userAnswers: []
    },
    {
      id: 3,
      title: "CSS Grid Mastery",
      difficulty: "Intermediate",
      questions: [
        { id: 1, text: "What property defines a grid container?", options: ["display: grid", "grid-template", "grid-area", "grid-column"], correct: 0, explanation: "display: grid establishes a grid container." },
        { id: 2, text: "How to define grid columns?", options: ["grid-template-columns", "grid-columns", "columns", "grid-template-rows"], correct: 0, explanation: "grid-template-columns defines the columns of a grid." },
        { id: 3, text: "What does grid-gap do?", options: ["Sets item size", "Sets spacing", "Aligns items", "Defines tracks"], correct: 1, explanation: "grid-gap sets spacing between grid items." },
        { id: 4, text: "How to span an item across multiple columns?", options: ["grid-column", "grid-row", "span", "grid-area"], correct: 0, explanation: "grid-column specifies how many columns an item spans." },
        { id: 5, text: "What aligns items in a grid?", options: ["justify-items", "align-items", "place-items", "All of the above"], correct: 3, explanation: "All these properties align grid items." }
      ],
      duration: "12 min",
      completed: true,
      score: 92,
      xpReward: 200,
      category: "Design",
      currentQuestion: 0,
      userAnswers: []
    },
    {
      id: 4,
      title: "Node.js Express",
      difficulty: "Intermediate",
      questions: [
        { id: 1, text: "What is Express.js?", options: ["Database", "Framework", "Language", "Module"], correct: 1, explanation: "Express.js is a web framework for Node.js." },
        { id: 2, text: "How to create a route in Express?", options: ["app.route()", "app.get()", "router.get()", "Both b and c"], correct: 3, explanation: "Both app.get() and router.get() create routes." },
        { id: 3, text: "What middleware does?", options: ["Handles requests", "Serves static files", "Processes data", "All of the above"], correct: 3, explanation: "Middleware handles various request processing tasks." },
        { id: 4, text: "How to serve static files?", options: ["express.static()", "app.static()", "serve.static()", "static.serve()"], correct: 0, explanation: "express.static() serves static files." },
        { id: 5, text: "What is req.params?", options: ["Query parameters", "Route parameters", "Body data", "Headers"], correct: 1, explanation: "req.params contains route parameters." }
      ],
      duration: "18 min",
      completed: false,
      score: null,
      xpReward: 250,
      category: "Backend",
      currentQuestion: 0,
      userAnswers: []
    },
    {
      id: 5,
      title: "Database Design",
      difficulty: "Advanced",
      questions: [
        { id: 1, text: "What is normalization?", options: ["Data duplication", "Reducing redundancy", "Query optimization", "Indexing"], correct: 1, explanation: "Normalization reduces data redundancy." },
        { id: 2, text: "What is a primary key?", options: ["Unique identifier", "Foreign key", "Index", "Constraint"], correct: 0, explanation: "A primary key uniquely identifies a record." },
        { id: 3, text: "What does 3NF stand for?", options: ["Third Normal Form", "Three Field Norm", "Triple Normal Form", "Third Field Norm"], correct: 0, explanation: "3NF is Third Normal Form for database normalization." },
        { id: 4, text: "What is a foreign key?", options: ["Primary key", "Reference to another table", "Unique key", "Index"], correct: 1, explanation: "A foreign key references a primary key in another table." },
        { id: 5, text: "What is a join?", options: ["Combining tables", "Splitting tables", "Indexing tables", "Dropping tables"], correct: 0, explanation: "A join combines data from multiple tables." }
      ],
      duration: "25 min",
      completed: false,
      score: null,
      xpReward: 350,
      category: "Database",
      currentQuestion: 0,
      userAnswers: []
    },
    {
      id: 6,
      title: "API Integration",
      difficulty: "Intermediate",
      questions: [
        { id: 1, text: "What does REST stand for?", options: ["Representational State Transfer", "Remote State Transfer", "Restful Service Transfer", "Resource State Transfer"], correct: 0, explanation: "REST stands for Representational State Transfer." },
        { id: 2, text: "What is a GET request used for?", options: ["Update data", "Delete data", "Retrieve data", "Create data"], correct: 2, explanation: "GET requests retrieve data from a server." },
        { id: 3, text: "What does JSON stand for?", options: ["JavaScript Object Notation", "Java Serialized Object", "JavaScript Online Notation", "JSON Object Notation"], correct: 0, explanation: "JSON is JavaScript Object Notation." },
        { id: 4, text: "What is an API endpoint?", options: ["Server", "URL for a resource", "Database", "Client"], correct: 1, explanation: "An API endpoint is a URL that provides access to a resource." },
        { id: 5, text: "What is CORS?", options: ["Cross-Origin Resource Sharing", "Cross-Origin Request Security", "Client-Origin Resource Sharing", "Cross-Origin Response Sharing"], correct: 0, explanation: "CORS allows controlled access to resources across origins." }
      ],
      duration: "10 min",
      completed: true,
      score: 78,
      xpReward: 175,
      category: "Integration",
      currentQuestion: 0,
      userAnswers: []
    }
  ]);

  const [leaderboard] = useState([
    { rank: 1, name: "Sarah Chen", xp: 3850, streak: 12 },
    { rank: 2, name: "Mike Rodriguez", xp: 3200, streak: 8 },
    { rank: 3, name: "Alex Johnson", xp: 2450, streak: 7 },
    { rank: 4, name: "Emma Wilson", xp: 2100, streak: 5 },
    { rank: 5, name: "David Kim", xp: 1950, streak: 3 }
  ]);

  const [filter, setFilter] = useState({
    category: "All",
    difficulty: "All",
    status: "All",
    questionCount: "All"
  });

  const [sortBy, setSortBy] = useState("title");
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const levelProgress = (user.xp % 200) / 200 * 100;

  const addNotification = (message) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(notif => notif.id !== id));
    }, 3000);
  };

  const checkAchievements = () => {
    const completedQuizzes = quizModules.filter(quiz => quiz.completed).length;
    const categories = [...new Set(quizModules.map(quiz => quiz.category))];
    const categoryCompletion = categories.map(category => ({
      category,
      completed: quizModules.filter(q => q.category === category && q.completed).length,
      total: quizModules.filter(q => q.category === category).length
    }));

    const updatedAchievements = achievements.map(ach => {
      if (ach.id === 1 && completedQuizzes >= 50 && !ach.unlocked) {
        addNotification("Achievement Unlocked: Quiz Master!");
        return { ...ach, unlocked: true, progress: 100 };
      }
      if (ach.id === 5) {
        const completedCategories = categoryCompletion.filter(c => c.completed === c.total).length;
        const progress = Math.round((completedCategories / categories.length) * 100);
        if (progress === 100 && !ach.unlocked) {
          addNotification("Achievement Unlocked: Category Conqueror!");
          return { ...ach, unlocked: true, progress: 100 };
        }
        return { ...ach, progress };
      }
      return ach;
    });
    setAchievements(updatedAchievements);
  };

  useEffect(() => {
    checkAchievements();
  }, [quizModules]);

  const getStreakMultiplier = () => {
    if (user.streak >= 7) return 1.5;
    if (user.streak >= 3) return 1.2;
    return 1;
  };

  const handleQuizStart = (quizId) => {
    const quiz = quizModules.find(q => q.id === quizId);
    // Reset quiz state when starting (or restarting) a quiz
    setQuizModules(prev =>
      prev.map(q =>
        q.id === quizId
          ? { ...q, currentQuestion: 0, userAnswers: [], completed: false, score: null }
          : q
      )
    );
    setActiveQuiz(quiz);
  };

  const handleAnswerSubmit = (quizId, questionId, answerIndex) => {
    setQuizModules(prev =>
      prev.map(quiz => {
        if (quiz.id === quizId) {
          const newAnswers = [...quiz.userAnswers, { questionId, answerIndex }];
          const nextQuestion = quiz.currentQuestion + 1;
          if (nextQuestion >= quiz.questions.length) {
            const correctAnswers = newAnswers.filter((ans, i) => ans.answerIndex === quiz.questions.find(q => q.id === ans.questionId).correct).length;
            const score = Math.round((correctAnswers / quiz.questions.length) * 100);
            const multiplier = getStreakMultiplier();
            const xpEarned = Math.round(quiz.xpReward * multiplier);
            setUser(prevUser => ({
              ...prevUser,
              xp: prevUser.xp + xpEarned,
              totalQuizzes: prevUser.totalQuizzes + 1,
              accuracy: Math.round(((prevUser.accuracy * prevUser.totalQuizzes + score) / (prevUser.totalQuizzes + 1))),
              level: Math.floor((prevUser.xp + xpEarned) / 200) + 1,
              streak: prevUser.streak + 1
            }));
            addNotification(`Quiz completed! Earned ${xpEarned} XP (x${multiplier} multiplier)`);
            setActiveQuiz(null);
            return { ...quiz, completed: true, score, userAnswers: newAnswers, currentQuestion: 0 };
          }
          return { ...quiz, currentQuestion: nextQuestion, userAnswers: newAnswers };
        }
        return quiz;
      })
    );
  };

  const handleChallengeAccept = () => {
    const multiplier = getStreakMultiplier();
    const xpEarned = Math.round(500 * multiplier);
    setUser(prev => ({
      ...prev,
      xp: prev.xp + xpEarned,
      streak: prev.streak + 1,
      totalQuizzes: prev.totalQuizzes + 1,
      level: Math.floor((prev.xp + xpEarned) / 200) + 1
    }));
    addNotification(`Daily Challenge completed! Earned ${xpEarned} XP (x${multiplier} multiplier)`);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const filteredQuizzes = quizModules
    .filter(quiz => {
      return (
        (filter.category === "All" || quiz.category === filter.category) &&
        (filter.difficulty === "All" || quiz.difficulty === filter.difficulty) &&
        (filter.status === "All" ||
         (filter.status === "Completed" && quiz.completed) ||
         (filter.status === "Not Started" && !quiz.completed)) &&
        (filter.questionCount === "All" ||
         (filter.questionCount === "Less than 10" && quiz.questions.length < 10) ||
         (filter.questionCount === "10-20" && quiz.questions.length >= 10 && quiz.questions.length <= 20) ||
         (filter.questionCount === "More than 20" && quiz.questions.length > 20))
      );
    })
    .sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "difficulty") {
        const order = { Beginner: 1, Intermediate: 2, Advanced: 3 };
        return order[a.difficulty] - order[b.difficulty];
      }
      if (sortBy === "xpReward") return b.xpReward - a.xpReward;
      if (sortBy === "questions") return b.questions.length - a.questions.length;
      return 0;
    });

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        {/* Notifications */}
        <div className="notification-container">
          {notifications.map(notif => (
            <div key={notif.id} className="notification">
              {notif.message}
            </div>
          ))}
        </div>

        {/* Header Section */}
        <div className="header-section">
          <div className="header-card">
            <div className="header-content">
              <div className="user-info">
                <h1 className="welcome-title">Welcome back, {user.name}! 🎯</h1>
                <p className="welcome-subtitle">Ready to level up your skills today? Streak Multiplier: x{getStreakMultiplier()}</p>
              </div>
              <div className="level-section">
                <div className="level-info">
                  <div className="level-number">Level {user.level}</div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${levelProgress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="level-badge">
                  <span className="crown-icon">👑</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card stat-card-blue">
            <div className="stat-content">
              <div className="stat-info">
                <div className="stat-number">{user.xp.toLocaleString()}</div>
                <div className="stat-label">Total XP</div>
              </div>
              <div className="stat-icon">⭐</div>
            </div>
          </div>
          
          <div className="stat-card stat-card-green">
            <div className="stat-content">
              <div className="stat-info">
                <div className="stat-number">{user.streak}</div>
                <div className="stat-label">Day Streak</div>
              </div>
              <div className="stat-icon">🔥</div>
            </div>
          </div>
          
          <div className="stat-card stat-card-purple">
            <div className="stat-content">
              <div className="stat-info">
                <div className="stat-number">{user.totalQuizzes}</div>
                <div className="stat-label">Quizzes Completed</div>
              </div>
              <div className="stat-icon">📚</div>
            </div>
          </div>
          
          <div className="stat-card stat-card-orange">
            <div className="stat-content">
              <div className="stat-info">
                <div className="stat-number">{user.accuracy}%</div>
                <div className="stat-label">Accuracy Rate</div>
              </div>
              <div className="stat-icon">🎯</div>
            </div>
          </div>
        </div>

        <div className="main-grid">
          {/* Quiz Modules */}
          <div className="quiz-modules-section">
            <div className="section-card">
              <div className="quiz-controls">
                <h2 className="section-title">Quiz Modules</h2>
                <div className="filters">
                  <select
                    name="category"
                    value={filter.category}
                    onChange={handleFilterChange}
                    className="filter-select"
                  >
                    <option value="All">All Categories</option>
                    <option value="Programming">Programming</option>
                    <option value="Design">Design</option>
                    <option value="Backend">Backend</option>
                    <option value="Database">Database</option>
                    <option value="Integration">Integration</option>
                  </select>
                  <select
                    name="difficulty"
                    value={filter.difficulty}
                    onChange={handleFilterChange}
                    className="filter-select"
                  >
                    <option value="All">All Difficulties</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                  <select
                    name="status"
                    value={filter.status}
                    onChange={handleFilterChange}
                    className="filter-select"
                  >
                    <option value="All">All Status</option>
                    <option value="Completed">Completed</option>
                    <option value="Not Started">Not Started</option>
                  </select>
                  <select
                    name="questionCount"
                    value={filter.questionCount}
                    onChange={handleFilterChange}
                    className="filter-select"
                  >
                    <option value="All">All Questions</option>
                    <option value="Less than 10">Less than 10</option>
                    <option value="10-20">10-20</option>
                    <option value="More than 20">More than 20</option>
                  </select>
                  <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="filter-select"
                  >
                    <option value="title">Sort by Title</option>
                    <option value="difficulty">Sort by Difficulty</option>
                    <option value="xpReward">Sort by XP Reward</option>
                    <option value="questions">Sort by Question Count</option>
                  </select>
                </div>
              </div>
              <div className="quiz-grid">
                {filteredQuizzes.length > 0 ? (
                  filteredQuizzes.map((quiz) => (
                    <div key={quiz.id} className="quiz-card">
                      <div className="quiz-header">
                        <div className={`category-dot category-${quiz.category.toLowerCase()}`}></div>
                        <span className={`difficulty-badge difficulty-${quiz.difficulty.toLowerCase()}`}>
                          {quiz.difficulty}
                        </span>
                      </div>
                      <h3 className="quiz-title">{quiz.title}</h3>
                      <div className="quiz-meta">
                        <span className="quiz-meta-item">📚 {quiz.questions.length} questions</span>
                        <span className="quiz-meta-item">⏱️ {quiz.duration}</span>
                      </div>
                      <div className="quiz-footer">
                        <div className="quiz-actions">
                          <button
                            className="start-quiz-btn"
                            onClick={() => handleQuizStart(quiz.id)}
                          >
                            {quiz.completed ? 'Retake Quiz' : 'Start Quiz'}
                          </button>
                          <span className="xp-reward">+{quiz.xpReward} XP</span>
                        </div>
                        {quiz.completed && (
                          <div className="completed-info">
                            <div className="score-info">🏆 Score: {quiz.score}%</div>
                          </div>
                        )}
                      </div>
                      {quiz.completed && (
                        <div className="quiz-progress">
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{ width: `${(quiz.userAnswers.length / quiz.questions.length) * 100}%` }}
                            ></div>
                          </div>
                          <span className="progress-text">
                            {quiz.userAnswers.length}/{quiz.questions.length} questions answered
                          </span>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="no-quizzes">No quizzes match your filters.</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            {/* Leaderboard */}
            <div className="section-card">
              <h2 className="section-title">🏆 Leaderboard</h2>
              <div className="leaderboard-list">
                {leaderboard.map((player) => (
                  <div
                    key={player.rank}
                    className={`leaderboard-item ${player.name === user.name ? 'current-user' : ''}`}
                  >
                    <div className="rank-badge">{player.rank}</div>
                    <div className="player-info">
                      <div className="player-name">{player.name}</div>
                      <div className="player-xp">{player.xp.toLocaleString()} XP</div>
                    </div>
                    <div className="player-streak">🔥 {player.streak}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="section-card">
              <h2 className="section-title">🏅 Achievements</h2>
              <div className="achievements-list">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`achievement-item ${achievement.unlocked ? 'unlocked' : ''}`}
                  >
                    <div className="achievement-header">
                      <div className="achievement-icon">{achievement.icon}</div>
                      <div className="achievement-info">
                        <div className="achievement-name">{achievement.name}</div>
                        <div className="achievement-description">{achievement.description}</div>
                      </div>
                    </div>
                    <div className="achievement-progress">
                      <div
                        className="achievement-progress-fill"
                        style={{ width: `${achievement.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Daily Challenge */}
        <div className="daily-challenge">
          <div className="challenge-content">
            <div className="challenge-info">
              <h2 className="challenge-title">⚡ Daily Challenge</h2>
              <p className="challenge-description">
                Complete today's special challenge for bonus XP! (x{getStreakMultiplier()} multiplier)
              </p>
              <div className="challenge-tags">
                <span className="challenge-tag">+500 XP</span>
                <span className="challenge-tag">Advanced</span>
                <span className="challenge-tag">15 min</span>
              </div>
            </div>
            <button
              className="challenge-btn"
              onClick={handleChallengeAccept}
            >
              Accept Challenge
            </button>
          </div>
        </div>

        {/* Quiz Modal */}
        {activeQuiz && (
          <div className="quiz-modal">
            <div className="quiz-modal-content">
              <h2>{activeQuiz.title}</h2>
              <p>Question {activeQuiz.currentQuestion + 1}/{activeQuiz.questions.length}</p>
              <div className="question">
                <p className="question-text">{activeQuiz.questions[activeQuiz.currentQuestion].text}</p>
                <div className="options">
                  {activeQuiz.questions[activeQuiz.currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      className={`option-btn ${activeQuiz.userAnswers.find(ans => ans.questionId === activeQuiz.questions[activeQuiz.currentQuestion].id)?.answerIndex === index ? 'selected' : ''}`}
                      onClick={() => handleAnswerSubmit(activeQuiz.id, activeQuiz.questions[activeQuiz.currentQuestion].id, index)}
                      disabled={activeQuiz.userAnswers.find(ans => ans.questionId === activeQuiz.questions[activeQuiz.currentQuestion].id)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {activeQuiz.userAnswers.find(ans => ans.questionId === activeQuiz.questions[activeQuiz.currentQuestion].id) && (
                  <div className="explanation">
                    <p><strong>Correct Answer:</strong> {activeQuiz.questions[activeQuiz.currentQuestion].options[activeQuiz.questions[activeQuiz.currentQuestion].correct]}</p>
                    <p>{activeQuiz.questions[activeQuiz.currentQuestion].explanation}</p>
                  </div>
                )}
              </div>
              <button
                className="close-modal-btn"
                onClick={() => setActiveQuiz(null)}
              >
                Close Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;