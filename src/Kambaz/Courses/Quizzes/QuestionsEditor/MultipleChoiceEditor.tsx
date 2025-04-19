import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function MultipleChoiceEditor({ question, onSave, onCancel }: any) {
  const [localQ, setLocalQ] = useState({ ...question });

  const updateChoice = (index: number, value: string) => {
    const updatedChoices = [...localQ.choices];
    updatedChoices[index] = value;
    setLocalQ({ ...localQ, choices: updatedChoices });
  };

  const addChoice = () => {
    setLocalQ({ ...localQ, choices: [...localQ.choices, ""] });
  };

  const removeChoice = (index: number) => {
    const updatedChoices = [...localQ.choices];
    updatedChoices.splice(index, 1);
    // Adjust correctAnswer index if needed
    const newCorrect =
      localQ.correctAnswer >= index
        ? Math.max(0, localQ.correctAnswer - 1)
        : localQ.correctAnswer;
    setLocalQ({ ...localQ, choices: updatedChoices, correctAnswer: newCorrect });
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

      <Form.Label className="fw-bold">Choices</Form.Label>
      {localQ.choices.map((choice: string, index: number) => (
        <div key={index} className="d-flex align-items-center mb-2">
          <Form.Check
            type="radio"
            name="correctAnswer"
            className="me-2"
            checked={localQ.correctAnswer === index}
            onChange={() => setLocalQ({ ...localQ, correctAnswer: index })}
          />
          <Form.Control
            type="text"
            value={choice}
            onChange={(e) => updateChoice(index, e.target.value)}
            className="me-2"
          />
          {localQ.choices.length > 2 && (
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => removeChoice(index)}
            >
              🗑
            </Button>
          )}
        </div>
      ))}

      <Button variant="outline-secondary" size="sm" onClick={addChoice} className="mb-3">
        + Add Choice
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
            localQ.choices.some((c: string) => !c.trim())
          }
        >
          Save Question
        </Button>
      </div>
    </Form>
  );
}
