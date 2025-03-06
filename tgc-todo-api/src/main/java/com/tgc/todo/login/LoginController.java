package com.tgc.todo.login;

import com.tgc.todo.registration.RegistrationService;
import com.tgc.todo.registration.UserDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class LoginController {
    RegistrationService registrationService;

    public LoginController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO) {
        Optional<UserDTO> userDTO = registrationService.login(loginDTO);

        if(userDTO.isPresent()) {
            ResponseEntity.ok("successful");
        } else {
            ResponseEntity.status(401).body("Login failed");
        }
    }
}
