package pl.uwm.projektzespolowy.services.color.crud;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.uwm.projektzespolowy.models.color.Color;

interface ColorRepository extends JpaRepository<Color, Long> {
}
