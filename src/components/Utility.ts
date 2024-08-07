export type UpgradeType = {
    name: string;
    key: string;
    level: number;
    price: number;
    costMultiplier: number;
    multiplier: number;
    adder: number;
    payoutAmount: number;
    initialPayoutAmount: number;
    ticksBetweenPayouts: number;
    ticksUntilNextPayout: number;
    unicodeIcon: string;
    imageUrl: string;
};

export function formatNumberWithScale(number: number): string {
    const scaleNames = [
        "",
        "thousand",
        "million",
        "billion",
        "trillion",
        "quadrillion",
        "quintillion",
        "sextillion",
        "septillion",
        "octillion",
        "nonillion",
        "decillion",
        "undecillion",
        "duodecillion",
        "tredecillion",
        "quattuordecillion",
        "quindecillion",
        "sexdecillion",
        "septendecillion",
        "octodecillion",
        "novemdecillion",
        "vigintillion",
    ]; // Add more scale names as needed

    if (number < 1000000) {
        return number.toLocaleString(undefined, {
            maximumFractionDigits: 0,
        });
    }

    const scaleExponent = Math.log10(number);
    const scaleIndex = Math.floor(scaleExponent / 3);
    const scaledNumber = number / Math.pow(1000, scaleIndex);
    const scaleName = scaleNames[scaleIndex];

    if (scaleIndex < scaleNames.length) {
        return `${scaledNumber.toFixed(2)} ${scaleName}`;
    } else {
        return `${scaledNumber.toFixed(2)} x 10^${scaleExponent.toLocaleString(
            undefined,
            {
                maximumFractionDigits: 0,
            }
        )}`;
    }
}

export function costOfQuantity(quantity: number, currentPrice: number, costMultiplier: number): number {

    return currentPrice * (1 - Math.pow(costMultiplier, quantity)) / (1 - costMultiplier);

    // ORIGINAL RECURSIVE IMPLEMENTATION
    // function calculateTotalCost(price: number, quantity: number): number {
    //     if (quantity === 0) {
    //         return 0;
    //     }
    //     const nextPrice = price + calculateTotalCost(price * costMultiplier, quantity - 1);
    //     console.log(nextPrice);
    //     return nextPrice;
    // }

    // return calculateTotalCost(currentPrice, quantity);
}

export function isPathMatch(pathname: string, routes: string[]): boolean {
    return routes.some(route => pathname === route || pathname.startsWith(route));
  }
  
  
// OTHER COST CALCULATION FUNCTIONS

// function growthLinear(value: number, increment: number): number {
//     return value + increment;
// }

// function growthMultiplier(value: number, multiplier: number): number {
//     return Math.floor(value * multiplier);
// }

// function growthExponential(value: number, multiplier: number): number {
//     return Math.floor(value * value * multiplier);
// }

// function growthFibonacci(
//     previousValue: number,
//     currentValue: number
// ): number {
//     return previousValue + currentValue;
// }

// function growthSquareRoot(value: number, increment: number): number {
//     return Math.floor(value + Math.sqrt(value) * increment);
// }

// function growthSigmoidal(baseGrowthPerSecond: number, level: number): number {
//     return baseGrowthPerSecond / (1 + Math.exp(-level));
// }
