package pl.uwm.projektzespolowy.services.user.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.models.user.UserLoginRequestDTO;

@Service
@RequiredArgsConstructor
public class UserLoginService {

    private final UserLogin userLogin;

    public User login(UserLoginRequestDTO userLoginRequestDTO) {
        return userLogin.login(userLoginRequestDTO);
    }

}
