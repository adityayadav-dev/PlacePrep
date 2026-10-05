import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { startQuiz, submitQuizAttempt } from '../services/api';

const AptitudeQuiz = () => {
  const { id: category } = useParams();
  const navigate = useNavigate();
  const decodedCategory = decodeURIComponent(category);

  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const { data } = await startQuiz({ category: decodedCategory });
        setQuestions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [decodedCategory]);

  const selectAnswer = (qIndex, optionIndex) => {
    if (results) return;
    setAnswers({ ...answers, [qIndex]: optionIndex });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const questionIds = questions.map(q => q._id);
      const answerArray = questions.map((_, i) => answers[i] ?? -1);

      const { data } = await submitQuizAttempt({
        questions: questionIds,
        answers: answerArray,
        category: decodedCategory
      });

      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loading"><div className="spinner" /></div>;

  if (questions.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3>No questions available</h3>
        <p>No questions found for this category.</p>
        <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => navigate('/aptitude')}>Go Back</button>
      </div>
    );
  }

  if (results) {
    return (
      <div className="quiz-results">
        <div className="page-header">
          <h1>Quiz Results — {decodedCategory}</h1>
        </div>
        <div className="card score-card">
          <div className="score-value">{results.score}/{results.total}</div>
          <div className="score-label">
            {results.score / results.total >= 0.7 ? 'Great job! 🎉' : results.score / results.total >= 0.4 ? 'Good effort! 💪' : 'Keep practicing! 📚'}
          </div>
          <div className="progress-bar" style={{ maxWidth: '300px', margin: '1rem auto 0' }}>
            <div className="progress-bar-fill" style={{ width: `${(results.score / results.total) * 100}%` }} />
          </div>
        </div>

        {results.results.map((r, i) => (
          <div key={i} className="result-question">
            <h4><span style={{ color: 'var(--text-muted)', marginRight: '0.5rem' }}>Q{i + 1}.</span>{r.question}</h4>
            <div className="quiz-options">
              {r.options.map((opt, j) => (
                <div key={j} className={`quiz-option ${j === r.correctAnswer ? 'correct' : ''} ${j === r.selectedAnswer && j !== r.correctAnswer ? 'incorrect' : ''}`}>
                  <span className="option-letter">{String.fromCharCode(65 + j)}</span>
                  {opt}
                </div>
              ))}
            </div>
            {r.explanation && (
              <div className="explanation"><strong>Explanation:</strong> {r.explanation}</div>
            )}
          </div>
        ))}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
          <button className="btn btn-primary" onClick={() => navigate('/aptitude')}>Take Another Quiz</button>
          <button className="btn btn-secondary" onClick={() => navigate('/aptitude/history')}>View History</button>
        </div>
      </div>
    );
  }

  const q = questions[currentQ];
  const progress = ((currentQ + 1) / questions.length) * 100;
  const allAnswered = questions.every((_, i) => answers[i] !== undefined);

  return (
    <div className="quiz-container">
      <div className="page-header"><h1>{decodedCategory} Quiz</h1></div>
      <div className="quiz-progress">
        <span>Question {currentQ + 1} of {questions.length}</span>
        <div className="progress-bar" style={{ flex: 1 }}>
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="card">
        <div className="quiz-question">
          <h3>{q.question}</h3>
          <div className="quiz-options">
            {q.options.map((opt, j) => (
              <div key={j} className={`quiz-option ${answers[currentQ] === j ? 'selected' : ''}`} onClick={() => selectAnswer(currentQ, j)}>
                <span className="option-letter">{String.fromCharCode(65 + j)}</span>
                {opt}
              </div>
            ))}
          </div>
        </div>
        <div className="quiz-nav">
          <button className="btn btn-secondary" onClick={() => setCurrentQ(currentQ - 1)} disabled={currentQ === 0}>Previous</button>
          {currentQ < questions.length - 1 ? (
            <button className="btn btn-primary" onClick={() => setCurrentQ(currentQ + 1)}>Next</button>
          ) : (
            <button className="btn btn-success" onClick={handleSubmit} disabled={submitting || !allAnswered}>
              {submitting ? 'Submitting...' : 'Submit Quiz'}
            </button>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        {questions.map((_, i) => (
          <button key={i} onClick={() => setCurrentQ(i)} style={{
            width: 36, height: 36, borderRadius: 'var(--radius)',
            border: `1px solid ${currentQ === i ? 'var(--primary)' : 'var(--border)'}`,
            background: answers[i] !== undefined ? 'var(--primary)' : 'var(--bg-input)',
            color: answers[i] !== undefined ? 'white' : 'var(--text-secondary)',
            fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer'
          }}>{i + 1}</button>
        ))}
      </div>
    </div>
  );
};

export default AptitudeQuiz;
