import { MutationTree } from "vuex";
import { BoardState, Board } from "./states";
import { 
    REQUEST_BOARD_TO_DJANGO,
    REQUEST_BOARD_LIST_TO_DJANGO 
} from "./mutation-types";

export interface BoardMutations extends MutationTree<BoardState> {
    [REQUEST_BOARD_TO_DJANGO] (state: BoardState, receivedData: Board): void // 1개만 받을 때
    [REQUEST_BOARD_LIST_TO_DJANGO] (state: BoardState, receivedData: Board[]): void // 여러개 받을 때
}

const mutations: MutationTree<BoardState> = {
    [REQUEST_BOARD_TO_DJANGO] (state: BoardState, receivedData: Board): void {
        state.board = receivedData
    },
    [REQUEST_BOARD_LIST_TO_DJANGO] (state: BoardState, receivedData: Board[]): void {
        state.boards = receivedData
    }
}

export default mutations as BoardMutations