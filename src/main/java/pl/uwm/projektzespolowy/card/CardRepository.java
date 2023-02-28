package pl.uwm.projektzespolowy.card;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepository  extends JpaRepository<Card, Long> {
}
