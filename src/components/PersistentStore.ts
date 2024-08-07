import { writable } from 'svelte/store';

// Function to create a custom store that syncs with localStorage
export function persistentStore(key: string, initialValue: any) {
    
    // Try to read the value from localStorage, or use the initial value
    const storedValue = localStorage.getItem(key);
    const value = storedValue ? JSON.parse(storedValue) : initialValue;

    // Create a Svelte writable store with the value
    const store = writable(value);

    // Subscribe to changes in the store's value
    store.subscribe((newValue) => {
        // Update localStorage with the new value
        localStorage.setItem(key, JSON.stringify(newValue));
    });

    return store;
}