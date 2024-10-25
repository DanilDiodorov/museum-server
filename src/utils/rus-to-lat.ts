export const rusToLat = function (str: string) {
    let ru = {
        а: 'a',
        б: 'b',
        в: 'v',
        г: 'g',
        д: 'd',
        е: 'e',
        ё: 'e',
        ж: 'j',
        з: 'z',
        и: 'i',
        к: 'k',
        л: 'l',
        м: 'm',
        н: 'n',
        о: 'o',
        п: 'p',
        р: 'r',
        с: 's',
        т: 't',
        у: 'u',
        ф: 'f',
        х: 'h',
        ц: 'c',
        ч: 'ch',
        ш: 'sh',
        щ: 'shch',
        ы: 'y',
        э: 'e',
        ю: 'u',
        я: 'ya',
        ъ: 'ie',
        ь: '',
        й: 'i',
    }

    str = str
        .replace(' ', '_')
        .replace('.', '_')
        .replace(',', '_')
        .toLowerCase()

    return [...str]
        .map((l) => {
            let latL = ru[l.toLocaleLowerCase()]

            if (l !== l.toLocaleLowerCase()) {
                latL = latL.charAt(0).toLocaleUpperCase() + latL.slice(1)
            } else if (latL === undefined) {
                latL = l
            }

            return latL
        })
        .join('')
}
