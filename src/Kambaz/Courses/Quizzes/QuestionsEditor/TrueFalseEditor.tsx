import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

export default function TrueFalseEditor({ question, onSave, onCancel }: any) {
  const [localQ, setLocalQ] = useState({
    _id: question._id || uuidv4(),
    type: "tf",
    title: question.title || "",
    points: question.points || 1,
    question: question.question || "",
    answer: typeof question.answer === "boolean" ? question.answer : true, // ✅ use 'answer' not 'correctAnswer'
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
          onChange={(e) =>
            setLocalQ({ ...localQ, points: parseInt(e.target.value) || 0 })
          }
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
          checked={localQ.answer === true}
          onChange={() => setLocalQ({ ...localQ, answer: true })}
        />
        <Form.Check
          inline
          type="radio"
          label="False"
          checked={localQ.answer === false}
          onChange={() => setLocalQ({ ...localQ, answer: false })}
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
