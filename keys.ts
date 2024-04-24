/**
 * 
 * @param keyCombo Takes key combination like [h,l] in an array
 */

const mtrix: any = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
]
export default async function getKeys(keyCombo: any): Promise<Array<any>> {
    const from: string = keyCombo[0];
    const to: string = keyCombo[1];
    let toReturnBound: Array<any> = [];
    for (let i = 0; i < mtrix.length; i++) {
        for (let z = 0; z < mtrix[i].length; z++) {
            if (from === mtrix[i][z]) {
                toReturnBound.push([mtrix.indexOf(mtrix[i]), mtrix[i].indexOf(mtrix[i][z])])
            }
        }
    }
    for (let i = 0; i < mtrix.length; i++) {
        for (let z = 0; z < mtrix[i].length; z++) {
            if (to === mtrix[i][z]) {
                toReturnBound.push([mtrix.indexOf(mtrix[i]), mtrix[i].indexOf(mtrix[i][z])])
            }
        }
    }

    /**
     * 
     * For the keys to be actually valid, the row should be same.
     */

    const toReturn: Array<any> = [];
    if (toReturnBound[0][0] === toReturnBound[1][0]) {
        const row: any = mtrix[toReturnBound[0][0]];
        console.log(`Row is ${[...row]}`);

        for (let i = toReturnBound[0][1] + 1; i < toReturnBound[1][1]; i++) {

            toReturn.push(row[i]);
        }
        console.log(toReturn);
        return toReturn;

    } else {
        return ['Invalid']
    }
}

