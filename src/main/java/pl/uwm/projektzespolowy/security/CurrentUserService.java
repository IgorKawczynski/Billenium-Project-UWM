package pl.uwm.projektzespolowy.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.uwm.projektzespolowy.exceptions.VOExceptions.EmailNotFoundException;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.services.user.crud.UserCRUDService;

@Service
@RequiredArgsConstructor
public class CurrentUserService implements UserDetailsService {
    private final UserCRUDService userCRUDService;

    @Override
    public CurrentUser loadUserByUsername(String email) throws UsernameNotFoundException {
        final User user = userCRUDService.getUserByEmail(email);
        if (user != null) {
            final CurrentUser currentUser = new CurrentUser();
            currentUser.setId(user.getId());
            currentUser.setEmail(user.getEmail());
            currentUser.setPassword(user.getPassword());
            return currentUser;
        }
        else
            throw new EmailNotFoundException("Failed to find user with email: " + email);
    }
}
