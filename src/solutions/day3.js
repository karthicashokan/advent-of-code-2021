const binaryToDecimal = (binary) => parseInt(binary, 2)

module.exports = {
    part1: (input, {
        pushDetail,
        pushResult
    }) => {
        const items = input.split(/\r?\n/);
        const numberOfBitsInEachEntry = items[0].length;
        const zeroBitsTotal = new Array(numberOfBitsInEachEntry).fill(0);
        const OneBitsTotal = new Array(numberOfBitsInEachEntry).fill(0);
        const gammaRate = new Array(numberOfBitsInEachEntry).fill(0);
        const epsilonRate = new Array(numberOfBitsInEachEntry).fill(0);

        items.map(item => item.trim());
        items.forEach((item) => {
            pushDetail(item);
            let index = 0;
            [...item].forEach((bit) => {
                zeroBitsTotal[index] += (bit === '0') ? 1 : 0;
                OneBitsTotal[index] += (bit === '1') ? 1 : 0;
                index += 1;
            });
        });

        // Iterate over a dummy array of same length
        new Array(numberOfBitsInEachEntry).fill(0).map((bit, index) => {
            const oneIsMostCommonBit = OneBitsTotal[index] > zeroBitsTotal[index];
            gammaRate[index] = oneIsMostCommonBit ? '1' : '0';
            epsilonRate[index] = oneIsMostCommonBit ? '0' : '1';
        });
        const gammaRateString = gammaRate.join('');
        const epsilonRateString = epsilonRate.join('');
        const gammaRateDecimal = binaryToDecimal(gammaRateString);
        const epsilonRateDecimal = binaryToDecimal(epsilonRateString);

        pushResult(`Total items = ${items.length}`);
        pushResult(`Gamma Rate = ${gammaRateString}`);
        pushResult(`Gamma Rate Decimal = ${gammaRateDecimal}`);
        pushResult(`Epsilon Rate = ${epsilonRateString}`);
        pushResult(`Epsilon Rate Decimal = ${epsilonRateDecimal}`);
        pushResult(`Gamma Rate Decimal X Epsilon Rate Decimal = ${gammaRateDecimal * epsilonRateDecimal}`);
    },

    part2: (input, {
        pushDetail,
        pushResult
    }) => {
        const items = input.split(/\r?\n/);
        const numberOfBitsInEachEntry = items[0].length;

        // First round itemsUnderConsideration = items
        let O2GenRatingItems = items;
        let CO2ScrubRatingItems = items;
        const O2GenRating = [];
        const CO2ScrubRating = [];

        let index = 0;
        do {
            // Reset zeroBitsTotal and OneBitsTotal
            let zeroBitsTotal = 0;
            let OneBitsTotal = 0;
            // Iterate over itemsUnderConsideration
            O2GenRatingItems.forEach((item) => {
                const bitInConsideration = item[index];
                zeroBitsTotal += (bitInConsideration === '0') ? 1 : 0;
                OneBitsTotal += (bitInConsideration === '1') ? 1 : 0;
            });
            const mostCommonBit = OneBitsTotal >= zeroBitsTotal ? '1' : '0';
            O2GenRating.push(mostCommonBit);
            // Update O2GenRatingItems
            O2GenRatingItems = O2GenRatingItems.filter((item) => item.startsWith(O2GenRating.join('')));
            index += 1;
        } while (O2GenRatingItems.length > 1);

        index = 0;
        do {
            // Reset zeroBitsTotal and OneBitsTotal
            let zeroBitsTotal = 0;
            let OneBitsTotal = 0;
            // Iterate over itemsUnderConsideration
            CO2ScrubRatingItems.forEach((item) => {
                const bitInConsideration = item[index];
                zeroBitsTotal += (bitInConsideration === '0') ? 1 : 0;
                OneBitsTotal += (bitInConsideration === '1') ? 1 : 0;
            });
            const leastCommon = OneBitsTotal >= zeroBitsTotal ? '0' : '1';
            CO2ScrubRating.push(leastCommon);
            // Update CO2ScrubRatingItems
            CO2ScrubRatingItems = CO2ScrubRatingItems.filter((item) => item.startsWith(CO2ScrubRating.join('')));
            index += 1;
        } while (CO2ScrubRatingItems.length > 1);

        const O2GenRatingString = O2GenRatingItems[0];
        const O2GenRatingDecimal = binaryToDecimal(O2GenRatingString);
        const CO2ScrubRatingString = CO2ScrubRatingItems[0];
        const CO2ScrubRatingDecimal = binaryToDecimal(CO2ScrubRatingString);

        pushResult(`Total items = ${items.length}`);
        pushResult(`Number of bits = ${numberOfBitsInEachEntry}`);
        pushResult(`O2 Gen Rating = ${O2GenRatingString}`);
        pushResult(`O2 Gen Rating Decimal = ${O2GenRatingDecimal}`);
        pushResult(`CO2 Scrub Rating = ${CO2ScrubRatingString}`);
        pushResult(`CO2 Scrub Rating Decimal = ${CO2ScrubRatingDecimal}`);
        pushResult(`O2 Gen Rating Decimal X CO2 Scrub Rating Decimal = ${O2GenRatingDecimal * CO2ScrubRatingDecimal}`);
    },
};