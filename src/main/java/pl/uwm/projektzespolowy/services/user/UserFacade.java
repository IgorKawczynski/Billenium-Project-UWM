package pl.uwm.projektzespolowy.services.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.user.UserBoardsDTO;
import pl.uwm.projektzespolowy.models.user.UserCreateDTO;
import pl.uwm.projektzespolowy.models.user.UserLoginRequestDTO;
import pl.uwm.projektzespolowy.models.user.UserLoginResponseDTO;
import pl.uwm.projektzespolowy.models.user.UserResponseDTO;
import pl.uwm.projektzespolowy.security.SessionRegistry;
import pl.uwm.projektzespolowy.services.user.crud.UserCRUDService;
import pl.uwm.projektzespolowy.services.user.crud.UserLoginService;

import java.util.List;

@Component
@RequiredArgsConstructor
public class UserFacade {

    private final UserCRUDService userCRUDService;
    private final UserLoginService userLoginService;
    private final AuthenticationManager authenticationManager;
    private final SessionRegistry sessionRegistry;

    public UserResponseDTO createUser(UserCreateDTO userCreateDTO) {
        return userCRUDService.createUser(userCreateDTO).toDto();
    }

    public UserLoginResponseDTO login(UserLoginRequestDTO userLoginRequestDTO) {

        var userToLoginInto = userLoginService.login(userLoginRequestDTO);
        var userLoginResponseDTO = new UserLoginResponseDTO();

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userLoginRequestDTO.email(), userLoginRequestDTO.password()));
        final String sessionId = sessionRegistry.registerSession(userLoginRequestDTO.email());

        userLoginResponseDTO.setId(userToLoginInto.getId());
        userLoginResponseDTO.setSessionId(sessionId);
        userLoginResponseDTO.setEmail(userToLoginInto.getEmail());
        userLoginResponseDTO.setFirstName(userToLoginInto.getFirstName());
        userLoginResponseDTO.setLastName(userToLoginInto.getLastName());

        return userLoginResponseDTO;
    }

    public UserResponseDTO getUserById(Long userId) {
        return userCRUDService.getUserById(userId).toDto();
    }

    public List<UserBoardsDTO> getAllUserBoards(Long userId) {
        return userCRUDService.getAllUserBoardsById(userId);
    }

    public void deleteUser(Long userId) {
        userCRUDService.deleteUser(userId);
    }

}
