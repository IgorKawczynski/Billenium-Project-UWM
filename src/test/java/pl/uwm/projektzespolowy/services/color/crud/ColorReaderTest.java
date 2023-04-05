package pl.uwm.projektzespolowy.services.color.crud;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.uwm.projektzespolowy.exceptions.EntityNotFoundException;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.BDDMockito.given;
import static pl.uwm.projektzespolowy.services.color.crud.ColorTestUtils.*;

@ExtendWith(MockitoExtension.class)
public class ColorReaderTest {

    @Mock
    private final ColorRepository colorRepository = Mockito.mock(ColorRepository.class);

    private ColorReader colorReader;

    @BeforeEach
    void setUp() {
        colorReader = new ColorReader(colorRepository);
    }

    @Test
    void shouldThrowEntityNotFoundException() {
        long notFoundId = -404L;
        // then
        assertThatThrownBy(() -> colorReader.getColorById(notFoundId))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessage("Color with id: " + notFoundId + " does not exist!");
    }

    @Test
    void shouldReturnColorById() {
        // given
        var color = createColor(1L);
        given(colorRepository.findById(1L)).willReturn(Optional.of(color));
        // when
        var foundColor = colorReader.getColorById(1L);
        // then
        assertThat(foundColor).isNotNull();
    }

    @Test
    void shouldReturnAllColors() {
        // given
        var board = createBoardWithColors();
        given(colorRepository.findAllByBoardId(board.getId())).willReturn(board.getColors());
        // when
        var colors = colorReader.getAllColorsByBoardId(board.getId());
        // then
        assertThat(colors).hasSize(6);
    }

}
