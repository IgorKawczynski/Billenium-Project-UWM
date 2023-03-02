package pl.uwm.projektzespolowy.card;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.uwm.projektzespolowy.models.card.Card;

@Repository
public interface CardRepository  extends JpaRepository<Card, Long> {
}
