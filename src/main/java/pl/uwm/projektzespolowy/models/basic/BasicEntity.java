package pl.uwm.projektzespolowy.models.basic;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@MappedSuperclass
@Getter
@Setter
public class BasicEntity {

    public static final String SEQUENCE_NAME = "id_seq";

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "base_generator")
    @SequenceGenerator(name = "base_generator", sequenceName = SEQUENCE_NAME, allocationSize = 1)
    protected Long id;

}
