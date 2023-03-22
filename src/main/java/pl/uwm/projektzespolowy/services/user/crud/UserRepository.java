package pl.uwm.projektzespolowy.services.user.crud;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.uwm.projektzespolowy.models.user.User;

@Repository
interface UserRepository extends JpaRepository<User, Long> {
}
