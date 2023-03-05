package pl.uwm.projektzespolowy.services.card;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.uwm.projektzespolowy.models.card.Card;

import java.util.List;

@Repository
public interface CardRepository  extends JpaRepository<Card, Long> {

    List<Card> findAllByColumnId(Long columnId);

}
