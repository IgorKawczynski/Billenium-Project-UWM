package pl.uwm.projektzespolowy.services.board.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.exceptions.EntityNotFoundException;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.models.user.UserResponseDTO;

import java.util.List;

@Component
@RequiredArgsConstructor
class BoardReader {

    private final BoardRepository boardRepository;

    public Board getBoardById(Long boardId) {
        return boardRepository.findById(boardId)
                .orElseThrow(() -> new EntityNotFoundException("board", "Board with id: " + boardId + " does not exist!"));
    }

    public List<UserResponseDTO> getBoardAssignedUsers(Long boardId) {
        return boardRepository.getAllAssignedUsers(boardId)
                .stream()
                .map(User::toDto)
                .toList();
    }

}
