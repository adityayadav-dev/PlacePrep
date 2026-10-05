import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getInterviewQuestion, markInterviewComplete } from '../services/api';
import { HiOutlineArrowLeft, HiOutlineCheckCircle, HiOutlineEye } from 'react-icons/hi';

const InterviewDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const { data } = await getInterviewQuestion(id);
        setQuestion(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestion();
  }, [id]);

  const handleComplete = async () => {
    try {
      await markInterviewComplete(id);
      setQuestion({ ...question, completed: true });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="loading"><div className="spinner" /></div>;

  if (!question) {
    return (
      <div className="empty-state">
        <h3>Question not found</h3>
        <button className="btn btn-primary" onClick={() => navigate('/interview')}>Go Back</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800 }}>
      <button className="btn btn-outline btn-sm" onClick={() => navigate('/interview')} style={{ marginBottom: '1.5rem' }}>
        <HiOutlineArrowLeft /> Back to Questions
      </button>

      <div className="card">
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <span className="badge badge-primary">{question.category}</span>
          <span className={`badge badge-${question.difficulty.toLowerCase()}`}>{question.difficulty}</span>
          {question.completed && <span className="badge badge-easy">✓ Completed</span>}
        </div>

        <h1 style={{ fontSize: '1.35rem', fontWeight: 700, lineHeight: 1.5, marginBottom: '1.5rem' }}>
          {question.question}
        </h1>

        {!showAnswer ? (
          <button className="btn btn-primary" onClick={() => setShowAnswer(true)}>
            <HiOutlineEye /> Reveal Answer
          </button>
        ) : (
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>Answer</h3>
            <div style={{ background: 'var(--bg-primary)', padding: '1.25rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', lineHeight: 1.8, whiteSpace: 'pre-wrap', fontSize: '0.9rem' }}>
              {question.answer}
            </div>
            {!question.completed && (
              <button className="btn btn-success" style={{ marginTop: '1.25rem' }} onClick={handleComplete}>
                <HiOutlineCheckCircle /> Mark as Completed
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewDetail;
