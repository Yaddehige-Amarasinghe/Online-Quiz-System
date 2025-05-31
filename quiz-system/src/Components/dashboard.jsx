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

  const [achievements] = useState([
    { id: 1, name: "Quiz Master", description: "Complete 50 quizzes", progress: 68, icon: "🏆", unlocked: false },
    { id: 2, name: "Streak Warrior", description: "7-day streak", progress: 100, icon: "🔥", unlocked: true },
    { id: 3, name: "Perfect Score", description: "Get 100% on 5 quizzes", progress: 80, icon: "⭐", unlocked: false },
    { id: 4, name: "Speed Demon", description: "Complete quiz in under 2 minutes", progress: 100, icon: "⚡", unlocked: true }
  ]);

  const [quizModules, setQuizModules] = useState([
    {
      id: 1,
      title: "JavaScript Fundamentals",
      difficulty: "Beginner",
      questions: 20,
      duration: "15 min",
      completed: true,
      score: 85,
      xpReward: 150,
      category: "Programming"
    },
    {
      id: 2,
      title: "React Hooks Deep Dive",
      difficulty: "Advanced",
      questions: 25,
      duration: "20 min",
      completed: false,
      score: null,
      xpReward: 300,
      category: "Programming"
    },
    {
      id: 3,
      title: "CSS Grid Mastery",
      difficulty: "Intermediate",
      questions: 18,
      duration: "12 min",
      completed: true,
      score: 92,
      xpReward: 200,
      category: "Design"
    },
    {
      id: 4,
      title: "Node.js Express",
      difficulty: "Intermediate",
      questions: 22,
      duration: "18 min",
      completed: false,
      score: null,
      xpReward: 250,
      category: "Backend"
    },
    {
      id: 5,
      title: "Database Design",
      difficulty: "Advanced",
      questions: 30,
      duration: "25 min",
      completed: false,
      score: null,
      xpReward: 350,
      category: "Database"
    },
    {
      id: 6,
      title: "API Integration",
      difficulty: "Intermediate",
      questions: 15,
      duration: "10 min",
      completed: true,
      score: 78,
      xpReward: 175,
      category: "Integration"
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
    status: "All"
  });

  const [sortBy, setSortBy] = useState("title");

  const levelProgress = (user.xp % 200) / 200 * 100;

  const handleQuizStart = (quizId) => {
    const updatedQuizzes = quizModules.map(quiz => {
      if (quiz.id === quizId && !quiz.completed) {
        const score = Math.floor(Math.random() * 21) + 80; // Random score 80-100
        const newXp = user.xp + quiz.xpReward;
        setUser(prev => ({
          ...prev,
          xp: newXp,
          totalQuizzes: prev.totalQuizzes + 1,
          accuracy: Math.round(((prev.accuracy * prev.totalQuizzes + score) / (prev.totalQuizzes + 1))),
          level: Math.floor(newXp / 200) + 1
        }));
        return { ...quiz, completed: true, score };
      }
      return quiz;
    });
    setQuizModules(updatedQuizzes);
    console.log(`Started and completed quiz ${quizId}`);
  };

  const handleChallengeAccept = () => {
    setUser(prev => ({
      ...prev,
      xp: prev.xp + 500,
      streak: prev.streak + 1,
      totalQuizzes: prev.totalQuizzes + 1,
      level: Math.floor((prev.xp + 500) / 200) + 1
    }));
    console.log("Daily challenge accepted");
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
         (filter.status === "Not Started" && !quiz.completed))
      );
    })
    .sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "difficulty") {
        const order = { Beginner: 1, Intermediate: 2, Advanced: 3 };
        return order[a.difficulty] - order[b.difficulty];
      }
      if (sortBy === "xpReward") return b.xpReward - a.xpReward;
      return 0;
    });

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        {/* Header Section */}
        <div className="header-section">
          <div className="header-card">
            <div className="header-content">
              <div className="user-info">
                <h1 className="welcome-title">Welcome back, {user.name}! 🎯</h1>
                <p className="welcome-subtitle">Ready to level up your skills today?</p>
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
                    value={sortBy} 
                    onChange={handleSortChange}
                    className="filter-select"
                  >
                    <option value="title">Sort by Title</option>
                    <option value="difficulty">Sort by Difficulty</option>
                    <option value="xpReward">Sort by XP Reward</option>
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
                        <span className="quiz-meta-item">📚 {quiz.questions} questions</span>
                        <span className="quiz-meta-item">⏱️ {quiz.duration}</span>
                      </div>
                      <div className="quiz-footer">
                        {quiz.completed ? (
                          <div className="completed-info">
                            <div className="score-info">🏆 Score: {quiz.score}%</div>
                            <span className="xp-reward">+{quiz.xpReward} XP</span>
                          </div>
                        ) : (
                          <div className="quiz-actions">
                            <button 
                              className="start-quiz-btn"
                              onClick={() => handleQuizStart(quiz.id)}
                            >
                              Start Quiz
                            </button>
                            <span className="xp-reward">+{quiz.xpReward} XP</span>
                          </div>
                        )}
                      </div>
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
                Complete today's special challenge for bonus XP!
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
      </div>
    </div>
  );
};

export default Dashboard;