/**
 * function to generate random integer value
 *
 * @param min - { number } - minimum value
 * @param max - { number } - maximum value
 * @return - number - a random generated value
 */
export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
  //The maximum is exclusive and the minimum is inclusive
}
