import React, { useState, useEffect } from 'react';
import './Dashboard.css';

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
    { 
      id: 1, 
      name: "Quiz Master", 
      description: "Complete 50 quizzes", 
      progress: 68, 
      icon: "🏆", 
      unlocked: false 
    },
    { 
      id: 2, 
      name: "Streak Warrior", 
      description: "7-day streak", 
      progress: 100, 
      icon: "🔥", 
      unlocked: true 
    },
    { 
      id: 3, 
      name: "Perfect Score", 
      description: "Get 100% on 5 quizzes", 
      progress: 80, 
      icon: "⭐", 
      unlocked: false 
    },
    { 
      id: 4, 
      name: "Speed Demon", 
      description: "Complete quiz in under 2 minutes", 
      progress: 100, 
      icon: "⚡", 
      unlocked: true 
    }
  ]);

  const [quizModules] = useState([
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

  const levelProgress = (user.xp % 200) / 200 * 100;

  const handleQuizStart = (quizId) => {
    console.log(`Starting quiz ${quizId}`);
    // Add quiz start logic here
  };

  const handleChallengeAccept = () => {
    console.log("Daily challenge accepted");
    // Add challenge logic here
  };

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
              <h2 className="section-title">Quiz Modules</h2>
              <div className="quiz-grid">
                {quizModules.map((quiz) => (
                  <div key={quiz.id} className="quiz-card">
                    <div className="quiz-header">
                      <div className={`category-dot category-${quiz.category.toLowerCase()}`}></div>
                      <span className={`difficulty-badge difficulty-${quiz.difficulty.toLowerCase()}`}>
                        {quiz.difficulty}
                      </span>
                    </div>
                    
                    <h3 className="quiz-title">{quiz.title}</h3>
                    
                    <div className="quiz-meta">
                      <span className="quiz-meta-item">
                        📚 {quiz.questions} questions
                      </span>
                      <span className="quiz-meta-item">
                        ⏱️ {quiz.duration}
                      </span>
                    </div>
                    
                    <div className="quiz-footer">
                      {quiz.completed ? (
                        <div className="completed-info">
                          <div className="score-info">
                            🏆 Score: {quiz.score}%
                          </div>
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
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            {/* Leaderboard */}
            <div className="section-card">
              <h2 className="section-title">
                🏆 Leaderboard
              </h2>
              <div className="leaderboard-list">
                {leaderboard.map((player) => (
                  <div 
                    key={player.rank}
                    className={`leaderboard-item ${
                      player.name === user.name ? 'current-user' : ''
                    }`}
                  >
                    <div className="rank-badge">
                      {player.rank}
                    </div>
                    <div className="player-info">
                      <div className="player-name">{player.name}</div>
                      <div className="player-xp">{player.xp.toLocaleString()} XP</div>
                    </div>
                    <div className="player-streak">
                      🔥 {player.streak}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="section-card">
              <h2 className="section-title">
                🏅 Achievements
              </h2>
              <div className="achievements-list">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className={`achievement-item ${
                      achievement.unlocked ? 'unlocked' : ''
                    }`}
                  >
                    <div className="achievement-header">
                      <div className="achievement-icon">
                        {achievement.icon}
                      </div>
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
              <h2 className="challenge-title">
                ⚡ Daily Challenge
              </h2>
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