module.exports = {
    part1: (input, {
        pushDetail,
        pushResult
    }) => {
        const items = input.split(/\r?\n/);
        items.map(item => item.trim());
        items.map(item => parseInt(item));

        let increases = 0;
        let decreases = 0;
        let lastValue = null;

        items.forEach((item) => {
            const firstItem = lastValue === null; // For the first item we don't have a lastValue
            const hasIncreased = firstItem || item > (lastValue);
            if (hasIncreased) {
                increases += 1;
            } else {
                ++decreases;
            }
            // Push detail view
            const suffix = firstItem ? 'N/A' : (hasIncreased ? 'Increased' : 'Decreased');
            pushDetail(`${item}\t:\t${suffix}`);
            // Update lastValue
            lastValue = item;
        });
        // Push Result View
        pushResult(`Total items = ${items.length}`);
        pushResult(`Increases = ${increases}`);
        pushResult(`Decreases = ${decreases}`);
    },

    part2: (input) => {
        console.log('part 2', input);
    },
};