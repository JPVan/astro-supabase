import { persistentStore } from './PersistentStore';
import { describe, beforeEach, test, expect } from 'vitest';

describe('persistentStore', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
    });

    test('store should return value from localStorage after store was initialized', () => {
        const key = 'testKey';
        const initialValue = { count: 13 };
        const store = persistentStore(key, initialValue);

        let storeValue;
        store.subscribe(value => storeValue = value);

        expect(storeValue).toEqual(initialValue);
    });

    test('should update localStorage when store value changes', () => {
        const key = 'testKey';
        const initialValue = { count: 13 };
        const store = persistentStore(key, initialValue);
        
        let storeValue = initialValue;
        store.subscribe(value => storeValue = value);
        console.log(storeValue);

        let storedValue = localStorage.getItem(key);
        expect(storedValue).not.toBeNull();
        if(storedValue != null) {
            expect(JSON.parse(storedValue)).toEqual(initialValue);
        }

        const newValue = { count: 10 };
        store.set(newValue);

        storedValue = localStorage.getItem(key);
        expect(storedValue).not.toBeNull();
        if(storedValue != null) {
            expect(JSON.parse(storedValue)).toEqual(newValue);
        }
    });

    test('should be able to update store value', () => {
        const key = 'testKey';
        const initialValue = { count: 13 };
        const store = persistentStore(key, initialValue);

        let storeValue;
        store.subscribe(value => storeValue = value);

        expect(storeValue).toEqual(initialValue);

        const newValue = { count: 10 };
        store.set(newValue);

        expect(storeValue).toEqual(newValue);
    });

});