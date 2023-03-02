package pl.uwm.projektzespolowy.user.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.basic.UpdateDTO;
import pl.uwm.projektzespolowy.basic.ValidatorService;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.user.UserRepository;

@Component
@RequiredArgsConstructor
public class UserUpdater {

    private final UserRepository userRepository;
    private final UserReader userReader;
    private final ValidatorService validatorService;

    public void updateUserField(User user, String fieldName, Object value) {
        validatorService.isNull(fieldName, value);
        switch (fieldName) {
            case "firstName" -> {
                String firstName = (String) value;
                user.setFirstName(firstName);
            }
            case "lastName" -> {
                String lastName = (String) value;
                user.setLastName(lastName);
            }
            case "email" -> {
                String email = (String) value;
                user.setEmail(email);
            }
            case "password" -> {
                String password = (String) value;
                user.setPassword(password);
            }
        }
        userRepository.saveAndFlush(user);
    }

    // TODO: Error handling
    public void updateUser(UpdateDTO updateDTO){
        var user = userReader.getUserById(updateDTO.id());
        updateUserField(user, updateDTO.fieldName(), updateDTO.value());
    }

}
