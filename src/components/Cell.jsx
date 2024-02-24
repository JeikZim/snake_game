import { useDispatch, useSelector } from "react-redux";
import { takeEat } from "../store/gameSlice";
import { useEffect, useState } from "react";

function Cell({ x, y }) {
    const dispatch = useDispatch();
    const { snake, eat } = useSelector((store) => store.game);
    const [isSnake, setIsSnake] = useState(false);
    const [isEat, setIsEat] = useState(false);

    useEffect(() => {
        setIsSnake(snake.positions.filter((cell) => cell.x === x && cell.y === y).length === 1);
        setIsEat(eat.x === x && eat.y === y);
    }, [snake, eat, x, y]);

    useEffect(() => {
        if (isSnake && isEat) {
            dispatch(takeEat());
        }
    }, [dispatch, isSnake, isEat])

    return <div className={`cell ${isSnake ? "snake" : isEat ? "eat" : ""}`}></div>;
}

export default Cell;
