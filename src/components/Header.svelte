<script lang="ts">
    import PurchaseQuantity from "./PurchaseQuantity.svelte";
    import SiteTitle from "./SiteTitle.svelte";
    import { formatNumberWithScale } from "./Utility";
    export let funds: number;
    export let fans: number;
</script>

<div class="header">
    <div style="width: 75%; max-width: 24em; margin: 0 auto;">
        <SiteTitle />

        <a href="/signin" class="block text-zinc-900 dark:text-gray-200">
            Sign in
        </a>


        <p class="text-white mt-4vw font-semibold pb-5">
            <span class="small-text-gradient">
                Funds: ${formatNumberWithScale(funds)}
            </span><br />
            <span class="small-text-gradient">
                Fans: {formatNumberWithScale(fans)}
            </span> <br />
            <PurchaseQuantity />
        </p>

    </div>
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

    .header {
        position: sticky;
        top: 0;
        left: 0;
        width: 100%;
        align-items: stretch;
        z-index: 10;
        background-image: url("../svg/background.svg");
        opacity: 95%;
    }
</style>
