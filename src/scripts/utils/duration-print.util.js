function getElapsedTime(span) {
    const days = Math.floor(span / (1000 * 60 * 60 * 24));
    const hours = Math.floor((span % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((span % (1000 * 60 * 60)) / (1000 * 60));

    let result = days !== 0 ? `${days}d` : '';
    result = hours !== 0 ? `${result} ${hours}h` : result;
    result = `${result} ${minutes}m`;

    return result;
}

export function printDuration(timeStamp) {
    const a = new Date(timeStamp);
    const b = new Date();
    const elapsed = b - a;

    return getElapsedTime(elapsed);
}

