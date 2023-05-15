package pl.uwm.projektzespolowy.services.card.crud;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.uwm.projektzespolowy.models.card.Card;

import java.util.List;

@Repository
interface CardRepository extends JpaRepository<Card, Long> {

    List<Card> findAllByCellId(Long cellId);

    @Query("""
            select c
            from Card c
            where c.parentCardId = :parentId
            """)
    List<Card> getCardChildren(@Param("parentId") Long parentId);

}
