package pl.uwm.projektzespolowy.services.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.uwm.projektzespolowy.models.user.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserFacade userFacade;

    @GetMapping("/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public UserResponseDTO getUserById(@PathVariable Long userId) {
        return userFacade.getUserById(userId).toDto();
    }

    @GetMapping("/{userId}/boards")
    public ResponseEntity<List<UserBoardsDTO>> getAllUserBoards(@PathVariable Long userId) {
        var userBoards = userFacade.getAllUserBoards(userId);
        return userBoards.size() > 0 ? ResponseEntity.ok(userBoards) : ResponseEntity.noContent().build();
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponseDTO registerUser(@RequestBody UserCreateDTO userCreateDTO) {
        return userFacade.createUser(userCreateDTO).toDto();
    }

    @PostMapping(
            path = "/login",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    @ResponseStatus(HttpStatus.OK)
    public UserLoginResponseDTO login(@RequestBody UserLoginRequestDTO user) {
        return userFacade.login(user);
    }

    @PatchMapping("/password")
    @ResponseStatus(HttpStatus.OK)
    public void changePassword(@RequestBody UserChangePasswordDTO userChangePasswordDTO) {
        userFacade.changePassword(userChangePasswordDTO);
    }

    @PutMapping("/{userId}/avatar")
    @ResponseStatus(HttpStatus.OK)
    public UserResponseDTO uploadImage(@PathVariable Long userId, @RequestBody MultipartFile avatarImage) {
        return userFacade.changeUserAvatar(userId, avatarImage);
    }

    @DeleteMapping("/{userId}/avatar")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteImage(@PathVariable Long userId) {
        userFacade.deleteUserAvatar(userId);
    }

    @DeleteMapping("/{userId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUserById(@PathVariable Long userId) {
        userFacade.deleteUser(userId);
    }

}
