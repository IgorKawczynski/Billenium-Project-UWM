package pl.uwm.projektzespolowy.services.user;

import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import pl.uwm.projektzespolowy.exceptions.EntityNotFoundException;
import pl.uwm.projektzespolowy.exceptions.VOExceptions.EmailAlreadyExistsException;
import pl.uwm.projektzespolowy.exceptions.VOExceptions.FieldLengthException;
import pl.uwm.projektzespolowy.exceptions.VOExceptions.InvalidEmailException;
import pl.uwm.projektzespolowy.exceptions.VOExceptions.RegexMatchException;
import pl.uwm.projektzespolowy.models.user.UserCreateDTO;
import pl.uwm.projektzespolowy.models.user.UserLoginRequestDTO;
import pl.uwm.projektzespolowy.services.user.crud.UserCRUDService;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
class UserFacadeTest {

    private final UserCRUDService userCRUDService;
    private final UserFacade userFacade;
    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Test
    @Order(1)
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
        var user = userFacade.getUserById(userToCreate.getId());
        var usersBoards = userFacade.getAllUserBoards(user.getId());
        // given
        Boolean isEncoded = passwordEncoder.matches(rawPassword, user.getPassword());
        // then
        assertThat(isEncoded).isTrue();
        assertThat(usersBoards.size()).isEqualTo(0);
    }

    @Test
    @Order(2)
    void doesCreatedUserAlreadyExist() {
        // when
        var user = new UserCreateDTO(
                "emailTest@op.pl",
                "fNameSecondTest",
                "lNameSecondTest",
                "passwordSecondTest");
        // then
        assertThatThrownBy(() -> userFacade.createUser(user))
                .isInstanceOf(EmailAlreadyExistsException.class)
                .hasMessage("User with given email already exists.");
    }

    @Test
    @Order(3)
    void shouldLoginSuccessfully() {
        // when
        String rawPassword = "passwordTest";
        var user = userCRUDService.getUserByEmail("emailTest@op.pl");
        var userToLogin = new UserLoginRequestDTO(user.getEmail(), rawPassword);
        // given
        var userLoginResponseDTO = userFacade.login(userToLogin);
        // then
        assertThat(userLoginResponseDTO.sessionId()).isBase64();
    }

    @Test
    @Order(4)
    void shouldLoginUnsuccessfullyWithBadEmail() {
        // when
        String rawPassword = "passwordTest";
        var user = userCRUDService.getUserByEmail("emailTest@op.pl");
        var userToLogin = new UserLoginRequestDTO(user.getEmail() + "BAD", rawPassword);
        // then
        assertThatThrownBy(() -> userFacade.login(userToLogin))
                .isInstanceOf(BadCredentialsException.class)
                .hasMessage("There is no such user with given email.");
    }

    @Test
    @Order(5)
    void shouldLoginUnsuccessfullyWithBadPassword() {
        // when
        String rawPassword = "passwordTestBAD";
        var user = userCRUDService.getUserByEmail("emailTest@op.pl");
        var userToLogin = new UserLoginRequestDTO(user.getEmail(), rawPassword);
        // then
        assertThatThrownBy(() -> userFacade.login(userToLogin))
                .isInstanceOf(BadCredentialsException.class)
                .hasMessage("You have written bad email or password.");
    }

    @Test
    @Order(6)
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

    @Test
    @Order(7)
    void doesRegistrationsValidationThrowProperExceptions() {
        // when
        var userToCreate1 = new UserCreateDTO(
                null,
                "fNameTest",
                "lNameTest",
                "paswordTest121");
        var userToCreate2 = new UserCreateDTO(
                "emailWithoutAtSign.com",
                "fNameTest",
                "lNameTest",
                "paswordTest121");
        var userToCreate3 = new UserCreateDTO(
                "email@onet.com",
                "fNameTest1111",
                "lNameTest",
                "paswordTest121");
        var userToCreate4 = new UserCreateDTO(
                "email@onet.com",
                "fNameTest",
                "lNameTest",
                "pas");
        // then
        assertThatThrownBy(() -> userFacade.createUser(userToCreate1))
                .isInstanceOf(NullPointerException.class)
                .hasMessage("Field Email cannot be empty.");
        assertThatThrownBy(() -> userFacade.createUser(userToCreate2))
                .isInstanceOf(InvalidEmailException.class)
                .hasMessage("Email must contain '@' sign.");
        assertThatThrownBy(() -> userFacade.createUser(userToCreate3))
                .isInstanceOf(RegexMatchException.class)
                .hasMessage("First name includes not allowed characters.");
        assertThatThrownBy(() -> userFacade.createUser(userToCreate4))
                .isInstanceOf(FieldLengthException.class)
                .hasMessage("Password must contain between 8 and 45 characters.");
    }

}
