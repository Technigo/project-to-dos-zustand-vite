import useTodoStore from "../store/todoStore";
import TodoItem from "../components/TodoItem";
import styled from "styled-components";
import empty from "../assets/Detective-check-footprint 1.png"


const ListContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
`;

const Image = styled.img `
    margin: 0 auto;
`;

const TodoList = () => {
    const todos = useTodoStore((state) => state.todos);
  
    return (
        <ListContainer>
        {/* {todos.length === 0 && <p>No todos yet. Add one!</p>} */}
        {todos.length === 0 && <Image src={empty} alt="No todo's yet!"/>}
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ListContainer>
    );
  };
  
  export default TodoList;