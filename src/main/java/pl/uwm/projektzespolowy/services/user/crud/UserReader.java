package pl.uwm.projektzespolowy.services.user.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.exceptions.EntityNotFoundException;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.services.user.UserRepository;

import java.util.List;

@Component
@RequiredArgsConstructor
public class UserReader {

    private final UserRepository userRepository;

    public User getUserById(Long id) {
        return userRepository
                .findById(id)
                .orElseThrow( () -> new EntityNotFoundException("user", "User with id: " + id + " does not exist!"));
    }

    public List<User> getAllUsers() {
        return userRepository
                .findAll(Sort.by(Sort.Direction.DESC, "email"));
    }
}
