package pl.uwm.projektzespolowy.services.color.crud;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.uwm.projektzespolowy.models.valueobjects.Title;

import static org.assertj.core.api.Assertions.assertThat;
import static pl.uwm.projektzespolowy.services.color.crud.ColorTestUtils.createColor;

@ExtendWith(MockitoExtension.class)
public class ColorUpdaterTest {

    private final ColorRepository colorRepository = Mockito.mock(ColorRepository.class);
    private ColorUpdater colorUpdater;

    @BeforeEach
    void setUp() {
        colorUpdater = new ColorUpdater(colorRepository);
    }

    @Test
    void shouldEditColor() {
        // given
        var color = createColor(1L);
        color.setTitle(new Title("TODO"));
        // when
        colorUpdater.changeColorTitle(color, "DONE");
        // then
        assertThat(color.getTitle().toString()).isEqualTo("DONE");
    }

}
