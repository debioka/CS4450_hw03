function rand_digit() {
    /* from https://www.w3schools.com/js/js_random.asp */
    return Math.floor(Math.random() * 10)
}

export function gen_code() {
    return [rand_digit(), rand_digit(), rand_digit(), rand_digit()]
}

export function check_guess(guess, code) {
    let bulls = check_bulls(guess, code)
    let matches = check_matches(guess, code)
    return {cows: matches - bulls, bulls: bulls}
}

export const max_guesses = 8;

function count(arr) {
    let total = Array(10).fill(0)
    for (let digit of arr) {
	total[digit] += 1
    }
    return total
}

function check_matches(guess, code) {
    let guess_count = count(guess)
    let code_count = count(code)
    let matches = 0
    for(let i = 0; i < 10; i++) {
	matches += Math.min(guess_count[i], code_count[i])
    }
    return matches
}

export function check_bulls(guess, code) {
    let reducer = (acc, cur, idx) => acc + (cur === code[idx] ? 1 : 0)
    return guess.reduce(reducer, 0)
}
