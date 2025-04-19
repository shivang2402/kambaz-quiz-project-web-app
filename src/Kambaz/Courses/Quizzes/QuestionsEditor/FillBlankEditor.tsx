import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function FillBlankEditor({ question, onSave, onCancel }: any) {
  const [localQ, setLocalQ] = useState({
    ...question,
    acceptedAnswers: question.acceptedAnswers ?? [""],
  });

  const updateAnswer = (index: number, value: string) => {
    const updated = [...localQ.acceptedAnswers];
    updated[index] = value;
    setLocalQ({ ...localQ, acceptedAnswers: updated });
  };

  const addAnswer = () => {
    setLocalQ({ ...localQ, acceptedAnswers: [...localQ.acceptedAnswers, ""] });
  };

  const removeAnswer = (index: number) => {
    const updated = [...localQ.acceptedAnswers];
    updated.splice(index, 1);
    setLocalQ({ ...localQ, acceptedAnswers: updated });
  };

  return (
    <Form>
      <Form.Group className="mb-2">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={localQ.title}
          onChange={(e) => setLocalQ({ ...localQ, title: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Points</Form.Label>
        <Form.Control
          type="number"
          value={localQ.points}
          onChange={(e) => setLocalQ({ ...localQ, points: parseInt(e.target.value) })}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Question</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={localQ.question}
          onChange={(e) => setLocalQ({ ...localQ, question: e.target.value })}
        />
      </Form.Group>

      <Form.Label className="fw-bold">Accepted Answers</Form.Label>
      {localQ.acceptedAnswers.map((ans: string, index: number) => (
        <div key={index} className="d-flex align-items-center mb-2">
          <Form.Control
            type="text"
            value={ans}
            onChange={(e) => updateAnswer(index, e.target.value)}
            className="me-2"
          />
          {localQ.acceptedAnswers.length > 1 && (
            <Button variant="outline-danger" size="sm" onClick={() => removeAnswer(index)}>
              🗑
            </Button>
          )}
        </div>
      ))}

      <Button
        variant="outline-secondary"
        size="sm"
        onClick={addAnswer}
        className="mb-3"
      >
        + Add Answer
      </Button>

      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="success"
          onClick={() => onSave(localQ)}
          disabled={
            !localQ.title.trim() ||
            !localQ.question.trim() ||
            localQ.acceptedAnswers.some((a: string) => !a.trim())
          }
        >
          Save Question
        </Button>
      </div>
    </Form>
  );
}
