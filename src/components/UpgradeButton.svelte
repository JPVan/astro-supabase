<script lang="ts">
    import { UpgradeClass } from "./Upgrades";
    import { formatNumberWithScale } from "./Utility";
    import { purchaseQuantityStore } from "./GlobalStore";
    import { costOfQuantity } from "./Utility";

    export let upgrade: UpgradeClass;
    export let funds: number;

    let priceStore = upgrade.priceStore;
    $: upgradePrice = $priceStore;

    $: purchaseQuantity = $purchaseQuantityStore;

    $: totalCost = costOfQuantity(purchaseQuantity, upgradePrice, upgrade.costMultiplier);

    $: canPurchase = (funds >= totalCost);

    let ticksUntilNextPayoutStore = upgrade.ticksUntilNextPayoutStore;
    $: ticksUntilNextPayout = $ticksUntilNextPayoutStore;

    let payoutAmountStore = upgrade.payoutAmountStore;
    $: payoutAmount = $payoutAmountStore;

    let levelStore = upgrade.levelStore;
    $: level = $levelStore;

    const payoutsPerSecond = upgrade.payoutsPerSecond();
    const ticksPerSecond = 1000/UpgradeClass.timerInterval;
    
    // define the function to handle the purchase of an upgrade
    const handlePurchase = () => {
        upgrade.handleMultiplePurchase();
    };

</script>

<button
    class="btn btn-primary font-bold upgrade-button"
    disabled={!canPurchase}
    on:click={handlePurchase}
>
    {upgrade.name}
    ${formatNumberWithScale(totalCost)}
    <br>
    {#if level > 0}
        {#if upgrade.ticksBetweenPayouts <= ticksPerSecond}
            ${formatNumberWithScale(Math.floor(payoutAmount*payoutsPerSecond))} per second
        {:else if ticksUntilNextPayout === 0}
            Paying ${formatNumberWithScale(Math.floor(payoutAmount))}
        {:else if upgrade.ticksBetweenPayouts > 1}
            {#if (ticksUntilNextPayout > 0)}
                {formatNumberWithScale(ticksUntilNextPayout)} until ${formatNumberWithScale(Math.floor(payoutAmount))}
            {/if}
        {:else}
            Ready to collect ${formatNumberWithScale(Math.floor(payoutAmount))}
        {/if}
    {/if}
</button>

<style>
    .upgrade-button {
        font-size: 1rem;
        background-image: var(--accent-gradient);
        background-size: 600%;
        background-position: 0%;
    }
    .upgrade-button[disabled] {
        cursor: not-allowed;
        opacity: 0.6;
        color: #fff;
        background-color: darkslategray;
        background-image: none;
    }

    .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
        padding: 0em; /* Add padding to the button */
        width: 100%;
        height: 100%;
        border-radius: 0;
        border: 0;
    }

    .font-bold {
        font-weight: bold;
    }
</style>
