package pl.uwm.projektzespolowy.services.card;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<CardResponseDTO>> getAllCardsByCellId(@RequestParam Long cellId) {
        var cards = cardFacade.getAllCardsByCellId(cellId);
        return cards.size() > 0 ? ResponseEntity.ok(cards) : ResponseEntity.noContent().build();
    }

    @GetMapping("/users/{cardId}")
    public ResponseEntity<List<UserResponseDTO>> getAllAssignedUsersToCard(@PathVariable Long cardId) {
        var users = cardFacade.getAllAssignedUsersToCard(cardId);
        return users.size() > 0 ? ResponseEntity.ok(users) : ResponseEntity.noContent().build();
    }

    @GetMapping("/without-parent/{boardId}")
    public ResponseEntity<List<CardResponseDTO>> getAllCardsInBoardWithoutParentAndChildren(@PathVariable Long boardId,
                                                                 @RequestParam Long parentId) {
        var cards =  cardFacade.getAllCardsInBoardWithoutParentAndChildren(boardId, parentId);
        return cards.size() > 0 ? ResponseEntity.ok(cards) : ResponseEntity.noContent().build();
    }

    @PutMapping("")
    @ResponseStatus(HttpStatus.OK)
    public CardResponseDTO updateCard(@RequestBody CardUpdateDTO cardUpdateDTO) {
        return cardFacade.updateCard(cardUpdateDTO);
    }

    @PutMapping("/locked/{cardId}")
    @ResponseStatus(HttpStatus.OK)
    public CardResponseDTO markAsLocked(@PathVariable Long cardId) {
        return cardFacade.markAsLocked(cardId);
    }

    @PutMapping("/unlocked/{cardId}")
    @ResponseStatus(HttpStatus.OK)
    public CardResponseDTO markAsUnlocked(@PathVariable Long cardId) {
        return cardFacade.markAsUnlocked(cardId);
    }

    @PatchMapping("/assign-user")
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

    @PatchMapping("/add-child")
    @ResponseStatus(HttpStatus.OK)
    public CardResponseDTO addChild(@RequestParam Long parentId, @RequestParam Long childId) {
        return cardFacade.addChild(parentId, childId);
    }

    @PatchMapping("/remove-child")
    @ResponseStatus(HttpStatus.OK)
    public CardResponseDTO removeChild(@RequestParam Long parentId, @RequestParam Long childId) {
        return cardFacade.removeChild(parentId, childId);
    }

}
