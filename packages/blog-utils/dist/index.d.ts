/**
 * Generates a random color.
 */
declare function randomColor(): string;
/**
 * Returns either black or white, depending on which has a better
 * contrast with the given color.
 *
 * It doesn't work well for all colors but it's sufficient for
 * our demo purposes.
 */
declare function matchingTextColor(color: string): "#000" | "#fff";

export { matchingTextColor, randomColor };
