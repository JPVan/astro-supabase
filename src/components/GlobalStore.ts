import { persistentStore } from "./PersistentStore";
import type { Writable } from "svelte/store";

export const initialFunds = 10;
export const fundsStore: Writable<any> = persistentStore("funds", initialFunds);

export const initialFans = 0;
export const fansStore: Writable<any> = persistentStore("fans", initialFans);

export const purchaseQuantityStore: Writable<any> = persistentStore("purchaseQuantity", 1);