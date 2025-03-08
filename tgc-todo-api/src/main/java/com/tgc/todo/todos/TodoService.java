package com.tgc.todo.todos;

import org.apache.commons.lang3.StringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class TodoService {
    private ModelMapper modelMapper;

    public TodoService(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    List<TodoDTO> todos;

    public List<TodoDTO> getTodos() {
        if(todos == null) {
            todos = buildSampleData();
        }
        return todos;
    }

    public TodoDTO getTodo(String id) {
        return getTodos().stream().filter(todo -> todo.getId().equalsIgnoreCase(id)).findAny().orElse(null);
    }

    public TodoDTO add(TodoDTO todoDTO) {
        if(StringUtils.isBlank(todoDTO.getId())) {
            todoDTO.setId(String.valueOf(Math.random()));
        }
        getTodos().add(todoDTO);
        return todoDTO;
    }

    public TodoDTO update(TodoDTO todoDTO) {
        getTodos().stream().filter(todo -> todo.getId().equalsIgnoreCase(todoDTO.getId())).findAny().ifPresent(todo -> modelMapper.map(todoDTO, todo));
        return getTodo(todoDTO.getId());
    }

    public void remove(String id) {
        getTodos().removeIf(todo -> todo.getId().equalsIgnoreCase(id));
    }

    private List<TodoDTO> buildSampleData() {

        return new ArrayList<>(List.of(
                TodoDTO.builder()
                        .id("1")
                        .title("First Todo")
                        .description("This is the first todo")
                        .dueDate(LocalDate.now().minusDays(5))
                        .completed(true)
                        .build(),
                TodoDTO.builder()
                        .id("2")
                        .title("Second Todo")
                        .description("This is the second todo")
                        .dueDate(LocalDate.now().minusDays(10))
                        .completed(false)
                        .build(),
                TodoDTO.builder()
                        .id("3")
                        .title("Third Todo")
                        .description("This is the third todo")
                        .dueDate(LocalDate.now())
                        .completed(false)
                        .build(),
                TodoDTO.builder()
                        .id("4")
                        .title("Fourth Todo")
                        .description("This is the fourth todo")
                        .dueDate(LocalDate.now().plusDays(5))
                        .completed(false)
                        .build()));
    }
}
