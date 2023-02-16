export function formatLastSolveAt(
  lastSolveTimeInMilliseconds: number,
  contestStartTimeInMilliseconds: number
) {
  const diffInMilliseconds =
    lastSolveTimeInMilliseconds - contestStartTimeInMilliseconds;
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);

  if (diffInSeconds <= 0) {
    return "";
  }

  return `${diffInSeconds}s`;
}
