import React, { useState, useEffect } from 'react';
import { Trophy, Star, Target, Clock, Users, BookOpen, Award, TrendingUp, Zap, Crown, Medal, Flame } from 'lucide-react';

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
    { id: 1, name: "Quiz Master", description: "Complete 50 quizzes", progress: 68, icon: Trophy, unlocked: false },
    { id: 2, name: "Streak Warrior", description: "7-day streak", progress: 100, icon: Flame, unlocked: true },
    { id: 3, name: "Perfect Score", description: "Get 100% on 5 quizzes", progress: 80, icon: Star, unlocked: false },
    { id: 4, name: "Speed Demon", description: "Complete quiz in under 2 minutes", progress: 100, icon: Zap, unlocked: true }
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

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Programming': 'bg-blue-500',
      'Design': 'bg-purple-500',
      'Backend': 'bg-green-500',
      'Database': 'bg-orange-500',
      'Integration': 'bg-pink-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  const levelProgress = (user.xp % 200) / 200 * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user.name}! 🎯</h1>
                <p className="text-purple-200">Ready to level up your skills today?</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">Level {user.level}</div>
                  <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500"
                      style={{ width: `${levelProgress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Crown className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{user.xp.toLocaleString()}</div>
                <div className="text-blue-100">Total XP</div>
              </div>
              <Star className="w-8 h-8 text-blue-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{user.streak}</div>
                <div className="text-green-100">Day Streak</div>
              </div>
              <Flame className="w-8 h-8 text-green-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{user.totalQuizzes}</div>
                <div className="text-purple-100">Quizzes Completed</div>
              </div>
              <BookOpen className="w-8 h-8 text-purple-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{user.accuracy}%</div>
                <div className="text-orange-100">Accuracy Rate</div>
              </div>
              <Target className="w-8 h-8 text-orange-200" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quiz Modules */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Quiz Modules</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quizModules.map((quiz) => (
                  <div 
                    key={quiz.id}
                    className="bg-white/5 rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-3 h-3 rounded-full ${getCategoryColor(quiz.category)}`}></div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                        {quiz.difficulty}
                      </span>
                    </div>
                    
                    <h3 className="text-white font-semibold mb-2 group-hover:text-purple-300 transition-colors">
                      {quiz.title}
                    </h3>
                    
                    <div className="flex items-center text-gray-300 text-sm mb-3 space-x-4">
                      <span className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {quiz.questions} questions
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {quiz.duration}
                      </span>
                    </div>
                    
                    {quiz.completed ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-green-400">
                          <Award className="w-4 h-4 mr-1" />
                          <span className="text-sm">Score: {quiz.score}%</span>
                        </div>
                        <span className="text-xs text-purple-300">+{quiz.xpReward} XP</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-all">
                          Start Quiz
                        </button>
                        <span className="text-xs text-purple-300">+{quiz.xpReward} XP</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
                Leaderboard
              </h2>
              <div className="space-y-3">
                {leaderboard.map((player) => (
                  <div 
                    key={player.rank}
                    className={`flex items-center p-3 rounded-lg ${
                      player.name === user.name ? 'bg-purple-500/20 border border-purple-400/30' : 'bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-sm mr-3">
                      {player.rank}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium">{player.name}</div>
                      <div className="text-gray-300 text-sm">{player.xp.toLocaleString()} XP</div>
                    </div>
                    <div className="flex items-center text-orange-400">
                      <Flame className="w-4 h-4 mr-1" />
                      <span className="text-sm">{player.streak}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Medal className="w-6 h-6 mr-2 text-purple-400" />
                Achievements
              </h2>
              <div className="space-y-3">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div 
                      key={achievement.id}
                      className={`p-3 rounded-lg border ${
                        achievement.unlocked 
                          ? 'bg-green-500/10 border-green-400/30' 
                          : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <div className="flex items-start">
                        <div className={`p-2 rounded-lg mr-3 ${
                          achievement.unlocked ? 'bg-green-500' : 'bg-gray-600'
                        }`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-medium text-sm">{achievement.name}</div>
                          <div className="text-gray-300 text-xs mb-2">{achievement.description}</div>
                          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-500 ${
                                achievement.unlocked ? 'bg-green-500' : 'bg-purple-500'
                              }`}
                              style={{ width: `${achievement.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Daily Challenge */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center">
                <Zap className="w-6 h-6 mr-2" />
                Daily Challenge
              </h2>
              <p className="text-purple-100 mb-4">Complete today's special challenge for bonus XP!</p>
              <div className="flex items-center space-x-4">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">+500 XP</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Advanced</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">15 min</span>
              </div>
            </div>
            <button className="bg-white text-purple-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105">
              Accept Challenge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;