export const dateToTimestampSQL = (date: Date): string => {
    const timestamp = date.toISOString().slice(0, 19).replace('T', ' ');
    return timestamp;
  }