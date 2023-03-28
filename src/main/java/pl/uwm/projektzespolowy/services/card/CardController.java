package pl.uwm.projektzespolowy.services.card;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.uwm.projektzespolowy.models.basic.dto.MoveDTO;
import pl.uwm.projektzespolowy.models.card.*;
import pl.uwm.projektzespolowy.models.user.UserResponseDTO;

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

    @RequestMapping(method = RequestMethod.GET, params = {"cellId"})
    @ResponseStatus(HttpStatus.OK)
    public List<CardResponseDTO> getAllCardsByCellId(@RequestParam Long cellId) {
        return cardFacade.getAllCardsByCellId(cellId);
    }

    @GetMapping("/users/{cardId}")
    @ResponseStatus(HttpStatus.OK)
    public List<UserResponseDTO> getAllAssignedUsersToCard(@PathVariable Long cardId) {
        return cardFacade.getAllAssignedUsersToCard(cardId);
    }

    @PutMapping("")
    @ResponseStatus(HttpStatus.OK)
    public CardResponseDTO updateCard(@RequestBody CardUpdateDTO cardUpdateDTO) {
        return cardFacade.updateCard(cardUpdateDTO);
    }

    @PutMapping("/users")
    @ResponseStatus(HttpStatus.OK)
    public CardResponseDTO assignUserToCard(@RequestBody CardUserUpdateDTO cardUserUpdateDTO) {
        return cardFacade.assignUserToCard(cardUserUpdateDTO);
    }

    @PutMapping("/color")
    @ResponseStatus(HttpStatus.OK)
    public CardResponseDTO changeCardColor(@RequestBody CardColorChangeDTO cardColorChangeDTO) {
        return cardFacade.changeCardColor(cardColorChangeDTO);
    }

    @PutMapping("/another-cell")
    @ResponseStatus(HttpStatus.OK)
    public CardResponseDTO moveCardToAnotherCell(@RequestBody CardMoveToAnotherCellDTO cardMoveToAnotherCellDTO) {
        return cardFacade.moveCardToAnotherCell(cardMoveToAnotherCellDTO);
    }

    @PutMapping("/same-cell")
    @ResponseStatus(HttpStatus.OK)
    public CardResponseDTO moveCard(@RequestBody MoveDTO cardMoveDTO) {
        return cardFacade.moveCard(cardMoveDTO);
    }

    @DeleteMapping("/{cardId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCardById(@PathVariable Long cardId) {
        cardFacade.deleteCard(cardId);
    }

    @PatchMapping("/users")
    @ResponseStatus(HttpStatus.OK)
    public CardResponseDTO deleteAssignedUserFromCard(@RequestBody CardUserUpdateDTO cardUserUpdateDTO) {
        return cardFacade.deleteAssignedUserFromCard(cardUserUpdateDTO);
    }

}
