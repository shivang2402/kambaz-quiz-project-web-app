import { useState } from "react";
import { FormControl } from "react-bootstrap";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER; 

export default function QueryParameters() {
  const [a, setA] = useState("34");
  const [b, setB] = useState("23");
  return (
    <div>
      <h3>Path Parameters</h3>
      <FormControl
        className="mb-2"
        id="wd-path-parameter-a"
        type="number"
        defaultValue={a}
        onChange={(e) => setA(e.target.value)}
      />
      <FormControl
        className="mb-2"
        id="wd-path-parameter-b"
        type="number"
        defaultValue={b}
        onChange={(e) => setB(e.target.value)}
      />
      <a
        className="btn btn-primary me-2"
        id="wd-path-parameter-add"
        href={`${REMOTE_SERVER}/lab5/calculator?operation=add&a=${a}&b=${b}`}
      >
        Add {a} + {b}
      </a>
      <a
        className="btn btn-danger"
        id="wd-path-parameter-subtract"
        href={`${REMOTE_SERVER}/lab5/calculator?operation=subtract&a=${a}&b=${b}`}
      >
        Substract {a} - {b}
      </a>
      <a
        className="btn btn-danger"
        id="wd-path-parameter-subtract"
        href={`${REMOTE_SERVER}/lab5/calculator?operation=multiply&a=${a}&b=${b}`}
      >
        Multiply {a} * {b}
      </a>
      <a
        className="btn btn-danger"
        id="wd-path-parameter-subtract"
        href={`${REMOTE_SERVER}/lab5/calculator?operation=divide&a=${a}&b=${b}`}
      >
        Divide {a} / {b}
      </a>
      <hr />
    </div>
  );
}