import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import TrueFalseEditor from "./TrueFalseEditor";
import FillBlankEditor from "./FillBlankEditor";

export default function QuestionEditor({ quiz, setQuiz }: any) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleNewQuestion = () => {
    const newQuestion = {
      _id: uuidv4(),
      type: "Multiple Choice",
      title: "",
      points: 1,
      question: "",
      choices: ["", ""],
      correctAnswer: 0,
    };
    const updated = [...quiz.questions, newQuestion];
    setQuiz({ ...quiz, questions: updated });
    setEditingIndex(updated.length - 1);
  };

  const handleSaveQuestion = (index: number, updatedQuestion: any) => {
    const updated = [...quiz.questions];
    updated[index] = updatedQuestion;
    setQuiz({ ...quiz, questions: updated });
    setEditingIndex(null);
  };

  const handleCancel = () => setEditingIndex(null);

  const totalPoints = quiz.questions.reduce((sum: number, q: any) => sum + (q.points || 0), 0);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Questions ({quiz.questions.length})</h5>
        <Button variant="outline-primary" onClick={handleNewQuestion}>
          + New Question
        </Button>
      </div>

      <div className="text-muted mb-4">Total Points: {totalPoints}</div>

      {quiz.questions.map((q: any, index: number) => (
        <div key={q._id} className="border rounded p-3 mb-3 bg-light">
          {editingIndex === index ? (
            <>
              <Form.Group className="mb-2">
                <Form.Label>Question Type</Form.Label>
                <Form.Select
                  value={q.type}
                  onChange={(e) => {
                    const updated = [...quiz.questions];
                    updated[index].type = e.target.value;
                    setQuiz({ ...quiz, questions: updated });
                  }}
                >
                  <option>Multiple Choice</option>
                  <option>True/False</option>
                  <option>Fill in the Blank</option>
                </Form.Select>
              </Form.Group>

              {q.type === "Multiple Choice" && (
                <MultipleChoiceEditor
                  question={q}
                  onSave={(updatedQ: any) => handleSaveQuestion(index, updatedQ)}
                  onCancel={handleCancel}
                />
              )}
              {q.type === "True/False" && (
                <TrueFalseEditor
                  question={q}
                  onSave={(updatedQ: any) => handleSaveQuestion(index, updatedQ)}
                  onCancel={handleCancel}
                />
              )}
              {q.type === "Fill in the Blank" && (
                <FillBlankEditor
                  question={q}
                  onSave={(updatedQ: any) => handleSaveQuestion(index, updatedQ)}
                  onCancel={handleCancel}
                />
              )}
            </>
          ) : (
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{q.title || "Untitled Question"}</strong>
                <div className="text-muted small">
                  {q.points || 0} pts • {q.type}
                </div>
              </div>
              <Button size="sm" variant="outline-primary" onClick={() => setEditingIndex(index)}>
                Edit
              </Button>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
