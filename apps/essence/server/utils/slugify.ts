const translitMap: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e',
  ж: 'zh', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm',
  н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u',
  ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch',
  ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
}

const regexPunctuation = /[^a-z\s]/g
const regexMultipleSpaces = /\s+/g
const regexMultipleDashes = /-+/g
const regexStartEndDash = /^-|-$/g

export function slugify(text: string): string {
  let result = text
    .toLowerCase()
    .replace(regexPunctuation, (c) => translitMap[c] || '')
  result = result.replace(regexMultipleSpaces, '-')
  result = result.replace(regexMultipleDashes, '-')
  result = result.replace(regexStartEndDash, '')
  return result
}
