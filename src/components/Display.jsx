import { useSelector, useDispatch } from "react-redux";
import { changeBtnStatus, createEat, startGame, moveSnake, setRenderingInterval } from "../store/gameSlice.js"

function Display() {
    return (
        <div className="display">
            <PlayButton />
        </div>
    )
}

function PlayButton() {
    const dispatch = useDispatch()
    const buttonStatus = useSelector(store => store.game.buttonStatus)
    const renderingInterval = useSelector(store => store.game.renderingInterval)

    const startRenderingInterval = () => {
        dispatch(
            setRenderingInterval(
                setInterval(() => {
                    dispatch(moveSnake())
                    dispatch(createEat())
                }, 500)
            )
        )
    }

    const clickHandler = () => {
        if (buttonStatus === "pause") clearInterval(renderingInterval ?? "")
        else if (buttonStatus === "resume") startRenderingInterval()
        else if (buttonStatus === "play") {
            dispatch(startGame())
            startRenderingInterval()
        }

        dispatch(changeBtnStatus())
    }

    return (
        <button 
            className={`play-button ${ buttonStatus }`}
            onClick={clickHandler}
        >
            {buttonStatus}
        </button>
    )
}

export default Display;