import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFromAndTo(page: number, itemsPerPage: number) {
  let from = page * itemsPerPage;
  let to = from + itemsPerPage;

  if (page > 0) {
    from += 1;
  }

  return { from, to };
}
