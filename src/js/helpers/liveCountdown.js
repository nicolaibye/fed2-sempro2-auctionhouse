import { formatTime } from './formatTime.js';

export function liveCountdown(endsAt, element) {
    function updateCountdown() {
        const timeLeft = formatTime(endsAt);
        element.textContent = timeLeft;
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
}