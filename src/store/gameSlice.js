import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
    name: "game",
    initialState: {
        buttonStatus: "play",
        boardSize: {
            width: 10,
            height: 10,
        },
        renderingInterval: null,
        snake: {
            tmpDirection: null,
            direction: null,
            positions: []
        },
        eat: {
            x: null,
            y: null,
            isOnBoard: false,
        },
        shouldGrow: false,
        isLose: false,
    },
    reducers: {
        changeBtnStatus(state, action) {
            state.buttonStatus =
                action.payload ? action.payload :
                    state.buttonStatus === "play"
                    ? "pause"
                    : state.buttonStatus === "pause"
                    ? "resume"
                    : state.buttonStatus === "resume"
                    ? "pause"
                    : "#Error#";
        },
        setRenderingInterval(state, action) {
            state.renderingInterval = action.payload;
        },
        startGame(state, action) {
            clearInterval(state.renderingInterval);
            state.shouldGrow = false;
            state.isLose = false;
            
            state.snake.positions = [];
            state.snake.direction = "up";
            state.snake.tmpDirection = "up";

            state.eat.isOnBoard = false;
            state.eat.x = null;
            state.eat.y = null;

            // x,y --- "центр" экрана 10x10
            state.snake.positions.push({ x: 5, y: 5 });
        },
        createEat(state, action) {
            if (state.eat.isOnBoard) return;

            let randomX;
            let randomY;

            do {
                randomX = Math.round(Math.random() * (state.boardSize.width - 1));
                randomY = Math.round(Math.random() * (state.boardSize.height - 1));  
            } while (state.snake.positions.some((el) => el.x === randomX && el.y === randomY));

            state.eat.x = randomX;
            state.eat.y = randomY;
            state.eat.isOnBoard = true;

            console.log(state.eat.x, state.eat.y);
        },
        takeEat(state, action) {
            state.eat.x = null;
            state.eat.y = null;
            state.eat.isOnBoard = false;
            state.shouldGrow = true;
        },
        changeDirection(state, action) {
            let direction;

            switch (action.payload.toLowerCase()) {
                case "ы":
                case "s":
                case "down":
                case "arrowdown":
                    direction = "down";
                    break;
                case "ц":
                case "w":
                case "up":
                case "arrowup":
                    direction = "up";
                    break;
                case "ф":
                case "a":
                case "left":
                case "arrowleft":
                    direction = "left";
                    break;
                case "в":
                case "d":
                case "right":
                case "arrowright":
                    direction = "right";
                    break;
                default:
                    return;
            }

            if (state.snake.positions.length > 1) {
                if (state.snake.direction === "up" && direction === "down") return;
                if (state.snake.direction === "down" && direction === "up") return;
                if (state.snake.direction === "left" && direction === "right") return;
                if (state.snake.direction === "right" && direction === "left") return;
            }

            state.snake.tmpDirection = direction;
        },
        moveSnake(state, action) {
            if (state.isLose) return;

            if (state.snake.positions.length > 1) {
                if (state.snake.direction === "up" && state.snake.tmpDirection === "down") return;
                if (state.snake.direction === "down" && state.snake.tmpDirection === "up") return;
                if (state.snake.direction === "left" && state.snake.tmpDirection === "right") return;
                if (state.snake.direction === "right" && state.snake.tmpDirection === "left") return;
            }

            state.snake.direction = state.snake.tmpDirection

            const direction = state.snake.direction;
            const positions = state.snake.positions;
            const headPosition = positions[positions.length - 1];
            let newCell = null;

            switch (direction) {
                case "up":
                    if (headPosition.y === 0) {
                        state.isLose = true;
                        return;
                    }

                    newCell = { x: headPosition.x, y: headPosition.y - 1 };

                    if (positions.some(el => el.x === newCell.x && el.y === newCell.y)) {
                        state.isLose = true;
                        return;
                    }

                    positions.push(newCell);
                    if (!state.shouldGrow) positions.shift();
                    else state.shouldGrow = false;

                    break;
                case "down":
                    if (headPosition.y === state.boardSize.height - 1) {
                        state.isLose = true;
                        return;
                    }

                    newCell = { x: headPosition.x, y: headPosition.y + 1 };

                    if (positions.some(el => el.x === newCell.x && el.y === newCell.y)) {
                        state.isLose = true;
                        return;
                    }

                    positions.push(newCell);
                    if (!state.shouldGrow) positions.shift();
                    else state.shouldGrow = false;

                    break;
                case "left":
                    if (headPosition.x === 0) {
                        state.isLose = true;
                        return;
                    }

                    newCell = { x: headPosition.x - 1, y: headPosition.y };

                    if (positions.some(el => el.x === newCell.x && el.y === newCell.y)) {
                        state.isLose = true;
                        return;
                    }

                    positions.push(newCell);
                    if (!state.shouldGrow) positions.shift();
                    else state.shouldGrow = false;

                    break;
                case "right":
                    if (headPosition.x === state.boardSize.width - 1) {
                        state.isLose = true;
                        return;
                    }

                    newCell = { x: headPosition.x + 1, y: headPosition.y };

                    if (positions.some(el => el.x === newCell.x && el.y === newCell.y)) {
                        state.isLose = true;
                        return;
                    }

                    positions.push(newCell);
                    if (!state.shouldGrow) positions.shift();
                    else state.shouldGrow = false;

                    break;
                default:
                    break;
            }
        },
    },
});

export const { changeBtnStatus, startGame, moveSnake, createEat, takeEat, setRenderingInterval, changeDirection } =
    gameSlice.actions;
export const gameReducer = gameSlice.reducer;
