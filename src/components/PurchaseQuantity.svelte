<script lang="ts">
    import type { Writable } from "svelte/store";
    import { persistentStore } from "./PersistentStore";
    import { get } from "svelte/store";
    import { purchaseQuantityStore } from "./GlobalStore";

    const values: (1 | 10 | 100)[] = [1, 10, 100];
    const currentIndexStore: Writable<number> = persistentStore("numberToBuyIndex", 0);

    function getPurchaseQuantity(): 1 | 10 | 100 {
        const quantity = values[get(currentIndexStore)];
        return quantity;
    }

    function incrementPurchaseQuantity() {
        currentIndexStore.update((value) => ((value + 1) % values.length));
        purchaseQuantityStore.set(getPurchaseQuantity());
    }

    let purchaseQuantity = getPurchaseQuantity();
    $: $currentIndexStore, purchaseQuantity = getPurchaseQuantity();

</script>

<div>
    <button class="small-text-gradient" on:click={incrementPurchaseQuantity}>
        Buy {purchaseQuantity}
    </button>
</div>

<style>
   .small-text-gradient {
        background-image: linear-gradient(
            160deg,
            rgb(var(--accent)),
            #da62c4 90%,
            white 90%
        );
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-size: 1000%;
        background-position: 0%;
        font-weight: 900;
    }
</style>

