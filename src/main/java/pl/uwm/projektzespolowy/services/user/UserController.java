package pl.uwm.projektzespolowy.services.user;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.uwm.projektzespolowy.models.basic.UpdateDTO;
import pl.uwm.projektzespolowy.models.board.BoardCreateDTO;
import pl.uwm.projektzespolowy.models.board.BoardResponseDTO;
import pl.uwm.projektzespolowy.models.user.UserResponseDTO;
import pl.uwm.projektzespolowy.services.user.crud.UserCRUDService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserCRUDService userCRUDService;

    @GetMapping("/all")
    public List<UserResponseDTO> getAllUsers() {
        return userCRUDService.getAllUsers();
    }

    @GetMapping("/{userId}")
    public UserResponseDTO getUserById(@PathVariable Long userId) {
        return userCRUDService
                .getUserById(userId);
    }

    @DeleteMapping("/{userId}")
    public void deleteUserById(@PathVariable Long userId) {
        userCRUDService.deleteUser(userId);
    }
}
