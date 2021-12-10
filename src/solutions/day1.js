const measure = (items, pushDetail, pushResult) => {
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
};

module.exports = {
    part1: (input, {
        pushDetail,
        pushResult
    }) => {
        const items = input.split(/\r?\n/);
        items.map(item => item.trim());
        items.map(item => parseInt(item));
        measure(items, pushDetail, pushResult);
    },

    part2: (input, {
        pushDetail,
        pushResult
    }) => {
        const items = input.split(/\r?\n/);
        items.map(item => item.trim());
        const windows = [];
        for (let windowStart = 0, windowEnd = 3; windowEnd < items.length; windowStart++, windowEnd++) {
            const window = items.slice(windowStart, windowEnd);
            const windowSum = parseInt(window[0]) + parseInt(window[1]) + parseInt(window[2]);
            windows.push(windowSum);
        }
        measure(windows, pushDetail, pushResult);
    },
};