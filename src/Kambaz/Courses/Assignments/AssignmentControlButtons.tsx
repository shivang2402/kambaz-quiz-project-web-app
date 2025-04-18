import { BsPlus } from "react-icons/bs";
import GreenCheckmark from "./GreenCheckmark";

export default function AssignmentControlButtons() {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <BsPlus className="fs-4" />
    </div>
  );
}