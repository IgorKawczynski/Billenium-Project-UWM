package pl.uwm.projektzespolowy.services.color.crud;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.uwm.projektzespolowy.models.color.Color;

import java.util.List;

interface ColorRepository extends JpaRepository<Color, Long> {

    List<Color> findAllByBoardId(Long boardId);

}
