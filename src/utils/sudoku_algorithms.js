const megaSudoku = [
    [1,14,6,5,7,3,8,9,2,10,11,4,12,13,15,16],
    [2,11,13,4,14,10,16,5,1,15,3,12,6,7,8,9],
    [7,8,3,9,15,2,12,11,6,16,13,5,1,14,10,4],
    [12,10,16,15,1,4,6,13,14,7,8,9,2,11,3,5],
    [11,12,1,7,3,9,2,15,10,6,16,8,14,5,4,13],
    [8,16,4,2,13,6,14,10,3,5,7,1,9,12,11,15],
    [9,13,14,10,4,1,5,16,11,12,2,15,7,3,6,8],
    [5,3,15,6,11,12,7,8,4,14,9,13,10,16,2,1],
    [16,4,11,3,2,8,13,1,12,9,10,6,5,15,14,7],
    [15,7,12,14,9,11,10,3,5,8,4,16,13,2,1,6],
    [10,2,5,1,16,7,4,6,15,13,14,3,8,9,12,11],
    [6,9,8,13,5,14,15,12,7,2,1,11,4,10,16,3],
    [14,1,2,16,10,15,9,4,13,3,6,7,11,8,5,12],
    [4,5,7,12,8,13,1,14,16,11,15,2,3,6,9,10],
    [13,15,9,11,6,5,3,2,8,4,12,11,16,1,7,14],
    [3,6,10,8,12,16,11,7,9,1,5,14,15,4,13,2],
]

const sudokuHard = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9],
]

const sudokuMedium = [
    [9, 2, 6, 5, 8, 3, 4, 7, 1],
    [7, 1, 3, 4, 2, 6, 9, 8, 5],
    [8, 4, 5, 9, 7, 1, 3, 6, 2],
    [3, 6, 2, 8, 5, 7, 1, 4, 9],
    [4, 7, 1, 2, 6, 9, 5, 3, 8],
    [5, 9, 8, 3, 1, 4, 7, 2, 6],
    [6, 5, 7, 1, 3, 8, 2, 9, 4],
    [2, 8, 4, 7, 9, 5, 6, 1, 3],
    [1, 3, 9, 6, 4, 2, 8, 5, 7],
]

const miniSudoku = [
    [1,2,3,4],
    [3,4,1,2],
    [2,3,4,1],
    [4,1,2,3]
]

export const dificulties = [
    {level: "Easy", dimension: 4, clues: 4}, //dificultad, dimension del sudoku, cantidad de pistas
    {level: "Medium", dimension: 9, clues: 50},
    {level: "Hard", dimension: 9, clues: 30},
    {level: "Insane", dimension: 16, clues: 200}
  ];


export const getDeepCopy = (arr) => {
    return JSON.parse(JSON.stringify(arr))
}

const dificultyToSudoku = {
    0: getDeepCopy(miniSudoku),
    1: getDeepCopy(sudokuMedium),
    2: getDeepCopy(sudokuHard),
    3: megaSudoku
} 


const duplicateInTheRow = (sudoku, row, element) => {
    let count = 0
    const dimension = sudoku.length
    for (let i = 0; i < dimension; i++) {
        if(sudoku[row][i] === element){
            count++
        }
    }
    return count >=2
}

const duplicateInTheColumn = (sudoku, column, element) => {
    let count = 0
    const dimension = sudoku.length
    for (let i = 0; i < dimension; i++) {
        if(sudoku[i][column] === element){
            count++
        }
    }
    return count >=2
    
}

const duplicateInTheRegion = (sudoku, row, column, element) => {
    let count = 0
    const dimension = sudoku.length
    let sqrt = parseInt(Math.sqrt(dimension))
    const startRowIndex =  row - row % sqrt
    const startColIndex = column - column % sqrt 

    for (let i = startRowIndex; i < startRowIndex + sqrt; i++) {
        for(let j = startColIndex; j < startColIndex + sqrt; j++){
            if(sudoku[i][j] === element){
                count++
            }
        }
    }
    return count >=2
}

const search_free_square = sudoku => {
    const dimension = sudoku.length
    for(let i = 0; i<dimension; i++){
        for(let j = 0; j<dimension; j++){
            if(!sudoku[i][j]) return [i, j]
        } 
    }
    return null
}

export const is_completed = sudoku => {
    const dimension = sudoku.length
    for(let i = 0; i<dimension; i++){
        for(let j = 0; j<dimension; j++){
            if(!sudoku[i][j]) return False
        }
    }
    return True
}

export const checkSolution = sudoku => {
    for(let i = 0; i<sudoku.length; i++){
        for (let j = 0; j < sudoku[i].length; j++) {
            const target = sudoku[i][j]
            if(target === 0 || duplicateInTheColumn(sudoku, j, target) || duplicateInTheRow(sudoku, i, target) || duplicateInTheRegion(sudoku, i, j, target)) return false
        }
    }
    return true
}

export const solveSudoku = sudoku => {
    const coords = search_free_square(sudoku)
    if(coords){
        const row = coords[0]
        const column = coords[1]
        for(let n = 1; n<=sudoku.length; n++){
            sudoku[row][column] = n // lo inserto y me fijo si hay duplicados
            if (
                duplicateInTheRow(sudoku, row, n)
                || duplicateInTheColumn(sudoku, column, n)
                || duplicateInTheRegion(sudoku, row, column, n)
            ) continue
            else{
                // si el numero en cuestion es un numero valido, lo inserto
                const res = solveSudoku(sudoku)
                if(res) return res            
                // si alguno de mis hijos me retorna un sudoku, significa que lo pude terminar y lo retorno
                    
                // si no sirvio ninguno de estos numeros, pongo un 0 en mi lugar asi lo vacio,
                // retorno a quien me llamo un null para que luego, la funcion search_free_square pueda volver a encontrar estos bloques libres
            }
            
        }
        sudoku[row][column] = 0
        return null
    }
    return sudoku
}

export const generateRandomSudoku = dificultyLevel => {
    const sudoku = getDeepCopy(dificultyToSudoku[dificultyLevel])
    const dimension = sudoku.length
    // 'clues' es la cantidad de pistas o lugares que te vienen completados
    // voy a tener que poner 0s en todos los demas
    let zeroCount = dimension * dimension - dificulties[dificultyLevel].clues
    
    while(zeroCount>0){
        let x = Math.floor((Math.random()*dimension))
        let y = Math.floor((Math.random()*dimension))
        if(!sudoku[x][y]) continue // si ya hay un zero en ese lugar, no hago nada.
        sudoku[x][y] = 0
        zeroCount--;
    }
    return sudoku
}