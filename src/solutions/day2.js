
const position = {
    horizontal: 0,
    depth: 0,
    aim: 0
}

module.exports = {
    part1: (input, {
        pushDetail,
        pushResult
    }) => {
        const ACTIONS = {
            'forward': (units) => {
                position.horizontal += units;
            },
            'up': (units) => {
                position.depth -= units;
            },
            'down': (units) => {
                position.depth += units;
            },
        };

        const items = input.split(/\r?\n/);
        items.map(item => item.trim());
        items.forEach((item) => {
            const [actionKey, units] = item.split(' ');
            // Push detail view
            pushDetail(`${actionKey} ${units}`);
            // Perform action
            ACTIONS[actionKey](parseInt(units));
        })
        // Push Result View
        const { horizontal, depth } = position
        pushResult(`Total items = ${items.length}`);
        pushResult(`Horizontal Position = ${horizontal}`);
        pushResult(`Depth = ${depth}`);
        pushResult(`Horizontal Position X Depth = ${horizontal * depth}`);
    },

    part2: (input, {
        pushDetail,
        pushResult
    }) => {
        const ACTIONS = {
            'forward': (units) => {
                // increases horizontal position by X units.
                position.horizontal += units;
                // increases depth by your aim multiplied by X.
                position.depth += position.aim * units;
            },
            'up': (units) => {
                // decreases aim by X units.
                position.aim -= units;
            },
            'down': (units) => {
                // increases aim by X units.
                position.aim += units;
            },
        };

        const items = input.split(/\r?\n/);
        items.map(item => item.trim());
        items.forEach((item) => {
            const [actionKey, units] = item.split(' ');
            // Push detail view
            pushDetail(`${actionKey} ${units}`);
            // Perform action
            ACTIONS[actionKey](parseInt(units));
        })
        // Push Result View
        const { horizontal, depth } = position
        pushResult(`Total items = ${items.length}`);
        pushResult(`Horizontal Position = ${horizontal}`);
        pushResult(`Depth = ${depth}`);
        pushResult(`Horizontal Position X Depth = ${horizontal * depth}`);
    },
};