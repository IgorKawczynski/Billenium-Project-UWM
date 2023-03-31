package pl.uwm.projektzespolowy.services.user;

import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import pl.uwm.projektzespolowy.exceptions.EntityNotFoundException;
import pl.uwm.projektzespolowy.exceptions.VOExceptions.EmailAlreadyExistsException;
import pl.uwm.projektzespolowy.models.user.UserCreateDTO;
import pl.uwm.projektzespolowy.services.user.crud.UserCRUDService;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
class UserFacadeTest {

    private final UserCRUDService userCRUDService;
    private final UserFacade userFacade;
    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Test
    void doesCreatedUserHaveEncryptedPassword() {
        // when
        String rawPassword = "passwordTest";
        var userToCreate = userFacade.createUser(
                new UserCreateDTO(
                        "emailTest@op.pl",
                        "fNameTest",
                        "lNameTest",
                        rawPassword)
        );
        var user = userCRUDService.getUserById(Long.parseLong(userToCreate.id()));
        // given
        Boolean isEncoded = passwordEncoder.matches(rawPassword, user.getPassword());
        // then
        assertThat(isEncoded).isTrue();
    }

    @Test
    void doesCreatedUserAlreadyExist() {
        // when
        var user = userFacade.getUserById(
                Long.parseLong(
                        userFacade.getUserByEmail("emailTest@op.pl").id()
                )
        );
        // then
        assertThatThrownBy(() -> userFacade.createUser(
                new UserCreateDTO(
                        "emailTest@op.pl",
                        "fNameSecondTest",
                        "lNameSecondTest",
                        "passwordSecondTest")
        ))
                .isInstanceOf(EmailAlreadyExistsException.class)
                .hasMessage("User with given email already exists");
    }

    @Test
    void isUserProperlyDeleted() {
        // when
        var user = userFacade.getUserByEmail("emailTest@op.pl");
        // given
        userFacade.deleteUser(Long.parseLong(user.id()));
        // then
        assertThatThrownBy(() -> userFacade.getUserById(Long.parseLong(user.id())))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessage("User with id: " + Long.parseLong(user.id()) + " does not exist!");
    }

    // Todo -- Test dla logowania i autentyfikacji (sprawdzenie sessionId)
    // Todo * -- Testy pod Boarda (m.in czy dodają się defaultowe rowy i kolumny)
}




