package com.tgc.todo.todos;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TodoDTO {
    private String id;
    private String title;
    @JsonFormat(pattern = "MM-dd-yyyy")
    private LocalDate dueDate;
    private boolean completed;
}
