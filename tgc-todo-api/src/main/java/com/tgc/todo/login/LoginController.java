package com.tgc.todo.login;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
    @PostMapping("/login")
    public String login(@RequestBody LoginDTO loginDTO) {
        if("admin".equalsIgnoreCase(loginDTO.getUsername())
                && "admin".equalsIgnoreCase(loginDTO.getPassword())) {
            return "success";
        } else {
            return "Invalid Credentials";
        }
    }
}
