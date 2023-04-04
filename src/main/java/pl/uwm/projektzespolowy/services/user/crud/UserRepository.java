package pl.uwm.projektzespolowy.services.user.crud;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.models.user.UserBoardsDTO;

import java.util.List;
import java.util.Optional;

@Repository
interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findUserByEmail(String email);

    User findRegisteredUserByEmail(String email);

    Boolean existsByEmail(String email);

    @Query(value = """
            SELECT new pl.uwm.projektzespolowy.models.user.UserBoardsDTO(CAST(b.id as string), b.title.title, CONCAT(b.creator.firstName,' ', b.creator.lastName))
            FROM User u JOIN u.boards b
            WHERE u.id = :userId
            """)
    List<UserBoardsDTO> getAllUserBoardsById(@Param("userId") Long userId);

}
