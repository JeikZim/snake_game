import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Cell from "./Cell";
import { changeBtnStatus } from "../store/gameSlice";

function Board() {
    const dispatch = useDispatch()

    const cells = []
    const boardSize = useSelector(store => store.game.boardSize);
    const isLose = useSelector(store => store.game.isLose);

    for (let y = 0; y < boardSize.height; y++) {
        for (let x = 0; x < boardSize.width; x++) {
            cells.push({ x, y, key: x + "" + y })
        }
    }

    useEffect(() => {
        if (isLose) {
            dispatch(changeBtnStatus("play"))
        }
    }, [dispatch, isLose])

    return (
        <div className="board">
            {cells.map((cell) => {
                return (
                    <Cell x={cell.x} y={cell.y} key={cell.key} />
                )
            })}
            <div className={`lose ${ isLose ? "" : "is-hidden" }`}>
                <span>You Lose!</span>
            </div>
        </div>
    )
}


export default Board;