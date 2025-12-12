import { useState } from '#app';

export const flashes = () => {
    const flashes = useState('flashes', () => []);

    const addFlash = (message, level = 'info') => {
        const id = Date.now();
        flashes.value.push({ id, message, level });

        setTimeout(() => {
            removeFlash(id);
        }, 5000);
    };

    const removeFlash = (id) => {
        flashes.value = flashes.value.filter(flash => flash.id !== id);
    };

    return {
        flashes,
        addFlash,
        removeFlash
    };
}
