package com.tgc.todo.todos;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TodosController {
    TodoService todoService;

    public TodosController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping("/todos")
    public @ResponseBody List<TodoDTO> getTodos() {
        return todoService.getTodos();
    }

    @PostMapping("/todos")
    public @ResponseBody TodoDTO add(@RequestBody TodoDTO todoDTO) {
        return todoService.add(todoDTO);
    }
}
