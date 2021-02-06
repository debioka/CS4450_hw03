import {check_bulls, check_guess, gen_code} from './game'

test('Bulls count correct', () => {
    expect(check_bulls([1,2,3,4],
                       [1,2,4,3])).toBe(2);
    expect(check_bulls([1,2,3,4],
                       [1,2,4,3])).toBe(2);
    expect(check_bulls([1,2,3,4],
                       [1,2,4,3])).toBe(2);
});

test('Check count correct', () => {
  expect(check_guess([1,2,3,4],
                     [1,2,3,4])).toStrictEqual({cows: 0, bulls: 4})
  expect(check_guess([1,2,3,4],
                     [5,6,4,3])).toStrictEqual({cows: 2, bulls: 0})
  expect(check_guess([1,2,3,4],
                     [4,1,3,2])).toStrictEqual({cows: 3, bulls: 1})
})

test('Gen_code returns int array', () => {
  expect(gen_code()).toHaveLength(4)
})
