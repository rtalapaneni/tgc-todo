package com.tgc.todo.todos;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TodoService {
    List<TodoDTO> todos;

    public List<TodoDTO> getTodos() {
        if(todos == null) {
            todos = buildSampleData();
        }
        return todos;
    }

    public TodoDTO getTodo(String id) {
        return todos.stream().filter(todo -> todo.getId().equalsIgnoreCase(id)).findAny().orElse(null);
    }

    public TodoDTO add(TodoDTO todoDTO) {
        if(StringUtils.isBlank(todoDTO.getId())) {
            todoDTO.setId(String.valueOf(Math.random()));
        }
        todos.add(todoDTO);
        return todoDTO;
    }

    public TodoDTO update(TodoDTO todoDTO) {
        todos.stream().filter(todo -> todo.getId().equalsIgnoreCase(todoDTO.getId())).findAny().ifPresent(todo -> {
            todo.setTitle(todoDTO.getTitle());
            todo.setDueDate(todoDTO.getDueDate());
            todo.setCompleted(todoDTO.isCompleted());
        });
        return todoDTO;
    }

    public void remove(String id) {
        todos.removeIf(todo -> todo.getId().equalsIgnoreCase(id));
    }

    private List<TodoDTO> buildSampleData() {

        return List.of(
                TodoDTO.builder()
                        .id("1")
                        .title("First Todo")
                        .dueDate(LocalDate.now().minusDays(5))
                        .completed(true)
                        .build(),
                TodoDTO.builder()
                        .id("2")
                        .title("Second Todo")
                        .dueDate(LocalDate.now().minusDays(10))
                        .completed(false)
                        .build(),
                TodoDTO.builder()
                        .id("3")
                        .title("Third Todo")
                        .dueDate(LocalDate.now())
                        .completed(false)
                        .build(),
                TodoDTO.builder()
                        .id("4")
                        .title("Fourth Todo")
                        .dueDate(LocalDate.now().plusDays(5))
                        .completed(false)
                        .build());
    }
}
