<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import Upgrade from "./Upgrade.svelte";
  import { UpgradeClass, upgrades } from "./Upgrades";
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
  import type { Unsubscriber } from "svelte/store";
  import { formatNumberWithScale } from "./Utility";

  let timerIntervalId: number;
  const timerInterval: number = UpgradeClass.timerInterval;

let funds: number;
let fundsUnsubscribe: Unsubscriber;
let fans: number;
let fansUnsubscribe: Unsubscriber;

let rate1 = upgrades[0].payoutAmountStore;
let rate2 = upgrades[1].payoutAmountStore;
let rate3 = upgrades[2].payoutAmountStore;
let rate4 = upgrades[3].payoutAmountStore;
let rate5 = upgrades[4].payoutAmountStore;
let rate6 = upgrades[5].payoutAmountStore;
let rate7 = upgrades[6].payoutAmountStore;
let rate8 = upgrades[7].payoutAmountStore;
let rate9 = upgrades[8].payoutAmountStore;
let rate10 = upgrades[9].payoutAmountStore;
let rate11 = upgrades[10].payoutAmountStore;

const fundsRatePerFan = 100;
$:  payoutAmount = $rate1/upgrades[0].ticksBetweenPayouts + $rate2/upgrades[1].ticksBetweenPayouts + $rate3/upgrades[2].ticksBetweenPayouts + $rate4/upgrades[3].ticksBetweenPayouts + $rate5/upgrades[4].ticksBetweenPayouts + $rate6/upgrades[5].ticksBetweenPayouts + $rate7/upgrades[6].ticksBetweenPayouts + $rate8/upgrades[7].ticksBetweenPayouts + $rate9/upgrades[8].ticksBetweenPayouts + $rate10/upgrades[9].ticksBetweenPayouts + $rate11/upgrades[10].ticksBetweenPayouts;
$:  fansFromReset = payoutAmount ? Math.floor(payoutAmount/fundsRatePerFan) : 0;

function tick() {
    const currentTime = Date.now();
    const previousTime = localStorage.getItem("previousTime");
    const elapsedTicks = previousTime ? (currentTime - parseInt(previousTime)) / timerInterval : 1;

    if (elapsedTicks > UpgradeClass.tickJitterToIgnore) {
      console.log(`Elapsed ticks: ${elapsedTicks}`);
    }

    upgrades.forEach(upgrade => {
      upgrade.tick(elapsedTicks)
    });

    localStorage.setItem("previousTime", currentTime.toString());
  }

  onMount(() => {
    timerIntervalId = window.setInterval(tick, timerInterval);

    fundsUnsubscribe = UpgradeClass.fundsStore.subscribe(value => {
      funds = value;
    });
    
    fansUnsubscribe = UpgradeClass.fansStore.subscribe(value => {
      fans = value;
    });

  });

  onDestroy(() => {
    clearInterval(timerIntervalId);
    fundsUnsubscribe();
    fansUnsubscribe();
  });

  function addFansReset() {
    clearInterval(timerIntervalId);
    localStorage.clear();
    UpgradeClass.resetFundsStore();
    UpgradeClass.fansStore.set(fans + fansFromReset);
    window.location.reload();
  }

  function noFansReset() {
    clearInterval(timerIntervalId);
    localStorage.clear();
    window.location.reload(); // calls onMount to set up tick etc
  }

</script>

<Header {funds} {fans}/>

<div class="main">
  {#each upgrades as upgrade}
    <Upgrade {upgrade} {funds} />
  {/each}
    
</div>

<div class="reset-buttons">
  <button on:click={addFansReset}>
    <span class="small-text-gradient">
      Add {formatNumberWithScale(fansFromReset)} fans (resets rest of game)
    </span>
  </button> <br /> <br /> 
  
  <button on:click={noFansReset}>
    <span class="small-text-gradient">
      Reset Game completely
    </span>
  </button>  
</div>

<Footer />

<style>
  .main {
    display: grid;
    grid-template-rows: auto 1fr; /* 1st row takes as much space as it needs, 2nd row takes up the rest */
    gap: 1rem; /* spacing between rows, adjust as needed */
    width: 75%; /* use this percent of the viewport width */
    max-width: 24em; /* but no more than this many pixels */
    margin: 0 auto; /* center in viewport */
    padding-bottom: 2rem;
  }
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
    .reset-buttons{
        top: 0;
        width: 75%; /* use this percent of the viewport width */
        max-width: 24em; /* but no more than this many pixels */
        margin: 0 auto; /* center in viewport */
        align-items: stretch;
        z-index: 10;
    }
</style>
