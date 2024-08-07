<script lang="ts">
    import UpgradeButton from "./UpgradeButton.svelte";
    import type { UpgradeClass } from "./Upgrades";

    export let upgrade: UpgradeClass;
    export let funds: number;
</script>

<div class="container">
    <div class="area-a" style="background-image: url({upgrade.imageUrl});" />
    <div class="area-b">
        <UpgradeButton {upgrade} {funds} />
    </div>
</div>

<style>
    .container {
        display: flex;
        width: 100%;
        aspect-ratio: 4/1;
        border-radius: 0.5rem;
        overflow: hidden;
    }

    .area-a {
        width: 25%;
        height: 100%;
        background-size: cover;
        background-repeat: no-repeat;
    }

    .area-b {
        width: 75%;
        height: 100%;
    }
</style>
