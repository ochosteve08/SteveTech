export const USER_REGEX = /^[A-z]{6,20}$/;

export const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@%+\\/!#?$\\[\]{}()_\-.])[A-Za-z\d@%+\\/!#?$\\[\]{}()_\-.]{8,128}$/;

export const DASH_REGEX = /^\/dash(\/)?$/;
export const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
export const USERS_REGEX = /^\/dash\/users(\/)?$/;
