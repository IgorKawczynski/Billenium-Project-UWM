package pl.uwm.projektzespolowy.services.card;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.uwm.projektzespolowy.models.basic.dto.MoveDTO;
import pl.uwm.projektzespolowy.models.card.*;

import java.util.List;

@RestController
@RequestMapping("/api/cards")
@RequiredArgsConstructor
public class CardController {

    private final CardFacade cardFacade;

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public CardResponseDTO createCard(@RequestBody CardCreateDTO cardCreateDTO) {
        return cardFacade.createCard(cardCreateDTO);
    }

    @RequestMapping(method = RequestMethod.GET, params = {"cardId"})
    @ResponseStatus(HttpStatus.OK)
    public CardResponseDTO getCardById(@RequestParam Long cardId) {
        return cardFacade.getCardById(cardId);
    }

    @RequestMapping(method = RequestMethod.GET, params = {"columnId"})
    @ResponseStatus(HttpStatus.OK)
    public List<CardResponseDTO> getAllCardsByColumnId(@RequestParam Long columnId) {
        return cardFacade.getAllCardsByColumnId(columnId);
    }

    @PutMapping("")
    @ResponseStatus(HttpStatus.OK)
    public CardResponseDTO updateCard(@RequestBody CardUpdateDTO cardUpdateDTO) {
        return cardFacade.updateCard(cardUpdateDTO);
    }

    @PutMapping("/another-column")
    @ResponseStatus(HttpStatus.OK)
    public CardResponseDTO moveCardToAnotherColumn(@RequestBody CardMoveToAnotherColumnDTO cardMoveToAnotherColumnDTO) {
        return cardFacade.moveCardToAnotherColumn(cardMoveToAnotherColumnDTO);
    }

    @PutMapping("/same-column")
    @ResponseStatus(HttpStatus.OK)
    public CardResponseDTO moveCard(@RequestBody MoveDTO cardMoveDTO) {
        return cardFacade.moveCard(cardMoveDTO);
    }

    @DeleteMapping("/{cardId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCardById(@PathVariable Long cardId) {
        cardFacade.deleteCard(cardId);
    }

}
