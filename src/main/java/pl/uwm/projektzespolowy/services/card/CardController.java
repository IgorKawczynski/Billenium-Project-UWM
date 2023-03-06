package pl.uwm.projektzespolowy.services.card;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.uwm.projektzespolowy.models.card.*;

import java.util.List;

@RestController
@RequestMapping("/api/cards")
@RequiredArgsConstructor
public class CardController {

    private final CardFacade cardFacade;

    @RequestMapping(method = RequestMethod.GET, params = {"cardId"})
    public CardResponseDTO getCardById(@RequestParam Long cardId) {
        return cardFacade.getCardById(cardId);
    }

    @RequestMapping(method = RequestMethod.GET, params = {"columnId"})
    public List<CardResponseDTO> getAllCardsByColumnId(@RequestParam Long columnId) {
        return cardFacade.getAllCardsByColumnId(columnId);
    }

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public CardResponseDTO addCardToColumn(@RequestBody CardCreateDTO cardCreateDTO) {
        return cardFacade.addCardToColumn(cardCreateDTO);
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
    public CardResponseDTO moveCard(@RequestBody CardMoveDTO cardMoveDTO) {
        return cardFacade.moveCard(cardMoveDTO);
    }

    @DeleteMapping("/{cardId}")
    public void deleteCardById(@PathVariable Long cardId) {
        cardFacade.deleteCard(cardId);
    }

}
