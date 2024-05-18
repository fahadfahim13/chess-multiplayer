export const MESSAGE_TYPES = {
    INIT_GAME: 'INIT_GAME',
    MOVE: 'MOVE',
    GAME_OVER: 'GAME_OVER',
    DRAW: 'Draw'
}

export const COLOR = {
    WHITE: 'WHITE',
    BLACK: 'BLACK'
}

export interface MOVE {
    from: string,
    to: string
}