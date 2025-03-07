package com.tgc.todo.todos;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TodosController {
    TodoService todoService;

    public TodosController(TodoService todoService) {
        this.todoService = todoService;
    }

    @PostMapping("/todos")
    public @ResponseBody TodoDTO addTodo(@RequestBody TodoDTO todoDTO) {
        return todoService.add(todoDTO);
    }

    @GetMapping("/todos")
    public @ResponseBody List<TodoDTO> getTodos() {
        return todoService.getTodos();
    }

    @GetMapping("/todos/{id}")
    public @ResponseBody TodoDTO getTodo(@PathVariable String id) {
        return todoService.getTodo(id);
    }

    @PutMapping("/todos/{id}")
    public @ResponseBody TodoDTO updateTodo(@RequestBody TodoDTO todoDTO) {
        return todoService.update(todoDTO);
    }

    @DeleteMapping("/todos/{id}")
    public void deleteTodo(@PathVariable String id) {
        todoService.remove(id);
    }
}
