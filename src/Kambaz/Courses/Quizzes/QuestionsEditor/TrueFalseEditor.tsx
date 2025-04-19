import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function TrueFalseEditor({ question, onSave, onCancel }: any) {
  const [localQ, setLocalQ] = useState({
    ...question,
    correctAnswer: question.correctAnswer ?? true,
  });

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

      <Form.Group className="mb-3">
        <Form.Label className="d-block">Correct Answer</Form.Label>
        <Form.Check
          inline
          type="radio"
          label="True"
          checked={localQ.correctAnswer === true}
          onChange={() => setLocalQ({ ...localQ, correctAnswer: true })}
        />
        <Form.Check
          inline
          type="radio"
          label="False"
          checked={localQ.correctAnswer === false}
          onChange={() => setLocalQ({ ...localQ, correctAnswer: false })}
        />
      </Form.Group>

      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="success"
          onClick={() => onSave(localQ)}
          disabled={!localQ.title.trim() || !localQ.question.trim()}
        >
          Save Question
        </Button>
      </div>
    </Form>
  );
}
