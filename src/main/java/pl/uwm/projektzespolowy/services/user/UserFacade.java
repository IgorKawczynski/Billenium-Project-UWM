package pl.uwm.projektzespolowy.services.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.user.UserResponseDTO;
import pl.uwm.projektzespolowy.services.user.crud.UserCRUDService;

@Component
@RequiredArgsConstructor
public class UserFacade {

    private final UserCRUDService userCRUDService;

    public UserResponseDTO getUserById(Long userId) {
        return userCRUDService.getUserById(userId).toDto();
    }

    public void deleteUser(Long userId) {
        userCRUDService.deleteUser(userId);
    }

}
