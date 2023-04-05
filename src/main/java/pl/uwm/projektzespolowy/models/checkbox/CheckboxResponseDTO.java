package pl.uwm.projektzespolowy.models.checkbox;

import lombok.Builder;

public record CheckboxResponseDTO(String id,
                                  String title,
                                  boolean isChecked) {

    @Builder public CheckboxResponseDTO{}

}
