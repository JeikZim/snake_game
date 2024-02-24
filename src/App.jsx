import { useDispatch } from "react-redux";
import { changeDirection } from "./store/gameSlice";

import Board from "./components/Board";
import Display from "./components/Display";

import "./App.css";

function App() {
    const dispatch = useDispatch();

    const onKeyDownHandler = (ev) => {
        ev.preventDefault();
        dispatch(changeDirection(ev.key));
    };

    return (
        <div tabIndex={0} onKeyDown={onKeyDownHandler} className="App">
            <Board />
            <Display />
        </div>
    );
}

export default App;
