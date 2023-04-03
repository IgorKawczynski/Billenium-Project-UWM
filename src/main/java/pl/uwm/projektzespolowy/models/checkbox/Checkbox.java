package pl.uwm.projektzespolowy.models.checkbox;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import pl.uwm.projektzespolowy.models.basic.BasicEntity;
import pl.uwm.projektzespolowy.models.card.Card;
import pl.uwm.projektzespolowy.models.valueobjects.Title;

import javax.persistence.*;

@Entity
@Table(name = "checkboxes")
@Setter
@Getter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Checkbox extends BasicEntity {

    Title title;

    boolean isChecked;

    @ManyToOne
    @JoinColumn(name = "card_id", referencedColumnName = "id")
    Card card;

    public Checkbox(Title title, Card card) {
        this.title = title;
        this.isChecked = false;
        this.card = card;
    }

    public CheckboxResponseDTO toDto() {
        return CheckboxResponseDTO
                .builder()
                .id(String.valueOf(this.id))
                .title(this.title.toString())
                .isChecked(this.isChecked)
                .build();
    }

}
