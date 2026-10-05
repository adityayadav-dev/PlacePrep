import { useNavigate } from 'react-router-dom';
import { HiOutlinePlay, HiOutlineClock } from 'react-icons/hi';

const categories = ['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability'];

const AptitudeList = () => {
  const navigate = useNavigate();

  const categoryInfo = {
    'Quantitative Aptitude': {
      icon: '🔢',
      color: '#6366f1',
      bg: 'rgba(99, 102, 241, 0.15)',
      desc: 'Numbers, percentages, profit & loss, time & work, speed & distance'
    },
    'Logical Reasoning': {
      icon: '🧠',
      color: '#0ea5e9',
      bg: 'rgba(14, 165, 233, 0.15)',
      desc: 'Series, coding-decoding, blood relations, syllogisms, puzzles'
    },
    'Verbal Ability': {
      icon: '📝',
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.15)',
      desc: 'Synonyms, antonyms, grammar, sentence correction, vocabulary'
    }
  };

  const startQuiz = (category) => {
    navigate(`/aptitude/quiz/${encodeURIComponent(category)}`);
  };

  return (
    <div>
      <div className="page-header">
        <h1>Aptitude Practice</h1>
        <p>Choose a category to start a quiz (10 random questions each)</p>
      </div>

      <div className="grid-3" style={{ marginBottom: '2rem' }}>
        {categories.map(cat => {
          const info = categoryInfo[cat];
          return (
            <div key={cat} className="card">
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{info.icon}</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{cat}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.5 }}>{info.desc}</p>
              <button className="btn btn-primary" onClick={() => startQuiz(cat)}>
                <HiOutlinePlay /> Start Quiz
              </button>
            </div>
          );
        })}
      </div>

      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem' }}>🎲 Mixed Quiz</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>10 random questions from all categories</p>
        </div>
        <button className="btn btn-secondary" onClick={() => startQuiz('Mixed')}>
          <HiOutlinePlay /> Start Mixed Quiz
        </button>
      </div>

      <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <button className="btn btn-outline" onClick={() => navigate('/aptitude/history')}>
          <HiOutlineClock /> View Quiz History
        </button>
      </div>
    </div>
  );
};

export default AptitudeList;
