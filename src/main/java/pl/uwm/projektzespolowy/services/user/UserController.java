package pl.uwm.projektzespolowy.services.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.uwm.projektzespolowy.models.user.UserCreateDTO;
import pl.uwm.projektzespolowy.models.user.UserLoginRequestDTO;
import pl.uwm.projektzespolowy.models.user.UserLoginResponseDTO;
import pl.uwm.projektzespolowy.models.user.UserResponseDTO;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserFacade userFacade;

    @GetMapping("/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public UserResponseDTO getUserById(@PathVariable Long userId) {
        return userFacade.getUserById(userId);
    }

    @PostMapping("/register")
    public UserResponseDTO registerUser(@RequestBody UserCreateDTO userCreateDTO) {
        return userFacade.createUser(userCreateDTO);
    }

    @PostMapping(
            path = "/login",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public UserLoginResponseDTO login(@RequestBody UserLoginRequestDTO user) {
        return userFacade.login(user);
    }

    @DeleteMapping("/{userId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUserById(@PathVariable Long userId) {
        userFacade.deleteUser(userId);
    }

}
