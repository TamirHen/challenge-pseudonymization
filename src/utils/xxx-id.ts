const VALID_CHAR = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const SEGMENTS = 3
const SEGMENT_LENGTH = 3

const getRandomChar = (): string => {
    return VALID_CHAR[Math.floor(Math.random() * VALID_CHAR.length)] as string
}

export function generateId(): string {
    let id = ''
    for (let i = 0; i < SEGMENTS; i++) {
        let segment = ''
        for (let j = 0; j < SEGMENT_LENGTH; j++) {
            segment += getRandomChar()
        }
        id += segment
        if (i < SEGMENTS - 1) {
            id += '-'
        }
    }

    return id
}
