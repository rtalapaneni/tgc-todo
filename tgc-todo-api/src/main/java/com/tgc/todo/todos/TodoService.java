package com.tgc.todo.todos;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {
    List<TodoDTO> todos = List.of(TodoDTO.builder().id("1").title("First Todo").completed(false).build());

    public List<TodoDTO> getTodos() {
        return todos;
    }

    public TodoDTO add(TodoDTO todoDTO) {
        todos.add(todoDTO);
        return todoDTO;
    }

    public void remove(String id) {
        todos.removeIf(todo -> todo.getId().equalsIgnoreCase(id));
    }
}
