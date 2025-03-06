package com.tgc.todo.registration;

import com.tgc.todo.login.LoginDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RegistrationService {
    List<UserDTO> users = List.of(UserDTO.builder().username("admin").password("admin").build());

    public UserDTO register(UserDTO userDTO) {
        users.stream().filter(user -> user.getUsername().equalsIgnoreCase(userDTO.getUsername())).findAny().ifPresent(user -> {
            throw new RuntimeException("User already exists");
        });
        users.add(userDTO);
        return userDTO;
    }

    public Optional<UserDTO> login(LoginDTO loginDTO) {
        return users.stream().filter(user -> user.getUsername().equalsIgnoreCase(loginDTO.getUsername())
                && user.getPassword().equalsIgnoreCase(loginDTO.getPassword())).findAny();
    }
}
