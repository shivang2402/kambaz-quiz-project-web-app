import { Button,FormControl, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";



export default function TodoForm( 
    // todo: { id: string; title: string };
    // setTodo: (todo: { id: string; title: string }) => void;
    // addTodo: (todo: { id: string; title: string }) => void;
    // updateTodo: (todo: { id: string; title: string }) => void;
  ) {
    const { todo } = useSelector((state: any) => state.todosReducer);
    const dispatch = useDispatch();
  
    return (
        <ListGroup.Item>
          <Button onClick={() => dispatch(addTodo(todo))}
                  id="wd-add-todo-click"> Add </Button>
          <Button onClick={() => dispatch(updateTodo(todo))}
                  id="wd-update-todo-click"> Update </Button>
          <FormControl
            defaultValue={todo.title}
            onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}/>
        </ListGroup.Item>
    );}
    
  