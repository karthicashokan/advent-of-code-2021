const BINGO_CHAR = '*';

const createTable = (tableData) => {
    const table = document.createElement('table');
    const tableBody = document.createElement('tbody');
    tableData.forEach(function (rowData) {
        const row = document.createElement('tr');
        rowData.forEach(function (cellData) {
            const cell = document.createElement('td');
            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    });
    table.appendChild(tableBody);
    return table;
};

const markBingo = (bingoCard, number) => {
    bingoCard.map((row, rowIndex) => {
        row.map((value, columnIndex) => {
            if (value === number) {
                bingoCard[rowIndex][columnIndex] = bingoCard[rowIndex][columnIndex] + BINGO_CHAR;
            }
        });
    });
    return bingoCard;
}

const checkBingo = (bingoCard) => {
    for (let i=0; i<5; i++) {
        // Check rows
        const row = arrayRow(bingoCard, i);
        const thisRowContainsBingo = row.filter((item) => item.includes(BINGO_CHAR)).length === row.length;
        if (thisRowContainsBingo) {
            return row;
        }
        // Check columns
        const col = arrayColumn(bingoCard, i);
        const thisColContainsBingo = col.filter((item) => item.includes(BINGO_CHAR)).length === row.length;
        if (thisColContainsBingo) {
            return col;
        }
    }
    // Check diagonals
    const diagonals = [
        [bingoCard[0][0], bingoCard[1][1], bingoCard[2][2], bingoCard[3][3], bingoCard[4][4]],
        [bingoCard[4][0], bingoCard[3][1], bingoCard[2][2], bingoCard[1][3], bingoCard[0][4]],
    ];
    diagonals.map((diagonal) => {
        const thisDiagonalContainsBingo = diagonal.filter((item) => item.includes(BINGO_CHAR)).length === diagonal.length;
        if (thisDiagonalContainsBingo) {
            return diagonal;
        }
    })
    // Default return false
    return false;
}

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const arrayRow = (arr, n) => arr[n];
const arrayColumn = (arr, n) => arr.map(x => x[n]);

module.exports = {
    part1: async (input, {
        pushDetail,
        clearDetails,
        pushResult
    }) => {
        let randomInputs;
        let bingoCards = {};
        const paragraphs = input.split('\n\n');
        // Step 1: Initialize Matrices
        paragraphs.map((paragraph, index) => {
            if (index === 0) {
                randomInputs = paragraphs[0].split(',');
            } else {
                const matrix_5_5 = [];
                const rows = paragraph.split('\n');
                rows.map((row, rowIndex) => {
                    matrix_5_5.push(row.split(' ').filter((a) => a !== ''));
                });
                pushDetail(createTable(matrix_5_5));
                pushDetail('------------------');
                bingoCards[`${index}`] = matrix_5_5;
            }
        });
        clearDetails();
        await sleep(2000);

        let BINGO = false;
        let winningCardKey = null;
        let winningNumber = null;

        for (let i = 0; i < randomInputs.length; i++) {
            const input = randomInputs[i];
            pushResult(`Random number is: ${input}`);

            for (let bingoKey = 1; bingoKey < Object.keys(bingoCards).length + 1; bingoKey++) {
                const bingoCard = bingoCards[`${bingoKey}`];
                // Mark Bingo Card
                bingoCards[bingoKey] = markBingo(bingoCard, input);
                pushDetail(createTable(bingoCards[bingoKey]));
                pushDetail('------------------');
                // Check Bingo Card
                const cardHadBingo = checkBingo(bingoCard);
                if (cardHadBingo !== false) {
                    BINGO = cardHadBingo;
                    winningCardKey = bingoKey;
                    winningNumber = input;
                    break;
                }
            }
            if (BINGO) {
                alert(('BINGO!'));
                break;
            }
            await sleep(200);
            clearDetails();
        }
        const winningCard = bingoCards[`${winningCardKey}`];
        let sumOfUnMarkedNumbers = 0;
        winningCard.forEach((row) => {
            sumOfUnMarkedNumbers = sumOfUnMarkedNumbers + row.filter((item) => !item.includes(BINGO_CHAR))
                .map((item) => parseInt(item))
                .reduce((a, b) => a + b, 0);
        })
        const bingoArray = BINGO.map((item) => item.replace(BINGO_CHAR, '')).map((item) => parseInt(item))
        clearDetails();
        pushResult('------------------');
        pushResult(`Winning card = ${winningCardKey}`);
        pushResult('Winning Number = ' + winningNumber);
        pushResult('------------------');
        pushResult(bingoArray);
        pushResult(`Sum of unmarked mumbers = ${sumOfUnMarkedNumbers}`);

        pushDetail('------------------');
        pushDetail(createTable(bingoCards[`${winningCardKey}`]))
        pushDetail('------------------');


    },

    part2: (input, {
        pushDetail,
        pushResult
    }) => {
        console.log('part2');
    },
};