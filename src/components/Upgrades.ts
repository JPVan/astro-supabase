import { costOfQuantity, type UpgradeType } from "./Utility"
import { fundsStore, initialFunds, fansStore} from "./GlobalStore"
import { persistentStore } from "./PersistentStore"
import type { Writable } from "svelte/store";
import { get } from "svelte/store";
import { purchaseQuantityStore } from "./GlobalStore";

export class UpgradeClass {
    static readonly timerInterval = 1000;
    static readonly tickJitterToIgnore = 1.9;
    static readonly initialFunds = initialFunds;
    static fundsStore = fundsStore;
    static fansStore = fansStore;

    levelStore: Writable<any>;
    priceStore: Writable<any>;
    payoutAmountStore: Writable<any>;
    ticksUntilNextPayoutStore: Writable<any>;

    readonly name: string;
    readonly key: string;
    readonly costMultiplier: number;
    readonly multiplier: number;
    readonly adder: number;
    readonly initialPayoutAmount: number;
    readonly ticksBetweenPayouts: number;
    readonly unicodeIcon: string;
    readonly imageUrl: string;

    constructor(upgradeData: UpgradeType) {
        this.levelStore = persistentStore(`${upgradeData.key}_level`, upgradeData.level);
        this.priceStore = persistentStore(`${upgradeData.key}_price`, upgradeData.price);
        this.payoutAmountStore = persistentStore(`${upgradeData.key}_payoutAmount`, upgradeData.payoutAmount);
        this.ticksUntilNextPayoutStore = persistentStore(`${upgradeData.key}_ticksUntilNextPayout`, upgradeData.ticksUntilNextPayout);

        this.name = upgradeData.name;
        this.key = upgradeData.key;
        this.costMultiplier = upgradeData.costMultiplier;
        this.multiplier = upgradeData.multiplier;
        this.adder = upgradeData.adder;
        this.initialPayoutAmount = upgradeData.initialPayoutAmount;
        this.ticksBetweenPayouts = upgradeData.ticksBetweenPayouts;
        this.unicodeIcon = upgradeData.unicodeIcon;
        this.imageUrl = upgradeData.imageUrl;
    }

    static get currentFunds(): number {
        return get(UpgradeClass.fundsStore);
    }

    setPayoutAmount() {
        const payoutAmount = get(this.payoutAmountStore);
        if (payoutAmount === 0) {
            this.payoutAmountStore.set(this.initialPayoutAmount);
        } else {
            this.payoutAmountStore.set(payoutAmount * this.multiplier + this.adder);
        }
    }

    canAfford(quantity: number): boolean {
        return UpgradeClass.currentFunds >= costOfQuantity(quantity, get(this.priceStore), this.costMultiplier);
    }

    handleMultiplePurchase() {
        const quantity = get(purchaseQuantityStore);
        if(this.canAfford(quantity)) {
            for (let i = 0; i < quantity; i++) {
                if (!this.handlePurchase()) {
                    return false;
                }
            }
        }
    }
    
    handlePurchase() {
        const price = get(this.priceStore);
        const funds = get(UpgradeClass.fundsStore)
        if (funds >= price) {
            this.setPayoutAmount();
            UpgradeClass.fundsStore.update((value) => value - price);
            this.levelStore.update((value) => value + 1);
            this.priceStore.set(price * this.costMultiplier);
            if(get(this.ticksUntilNextPayoutStore) === 0) {
                this.ticksUntilNextPayoutStore.set(this.ticksBetweenPayouts);
            }
            return true;
        } else {
            console.log("not enough funds for purchase");
            return false;
        }
    }

    // resetTicksUntilNextPayout() {
    //     this.ticksUntilNextPayoutStore.set(this.ticksBetweenPayouts);
    // }

    // isReadyForPayout() {
    //     return get(this.ticksUntilNextPayoutStore) === 0;
    // }

    static resetFundsStore() {
        UpgradeClass.fundsStore.set(UpgradeClass.initialFunds);
    }

    calculateFundsToAdd(ticks: number): number { // TO DO: cover case of multiple ticks have passed
        let fundsToAdd: number = 0;
    
          if(get(this.levelStore) > 0) {
            let ticksUntilPayout: number;
            this.ticksUntilNextPayoutStore.update((value) => {ticksUntilPayout = value - 1; return ticksUntilPayout});
            const payoutCount = ticks / this.ticksBetweenPayouts;
            const payoutAmount = get(this.payoutAmountStore)*(100 + get(UpgradeClass.fansStore))/100;
            if(payoutCount > UpgradeClass.tickJitterToIgnore) {
                fundsToAdd = payoutCount * payoutAmount;
                // @ts-ignore
                if(ticksUntilPayout === 0) {
                    this.ticksUntilNextPayoutStore.set(this.ticksBetweenPayouts);
                }
                // console.log(`***************** ${this.name} paid out ${payouts}x (${fundsToAdd})`);
            // @ts-ignore
            } else if (ticksUntilPayout === 0) {
                fundsToAdd = payoutAmount;
                this.ticksUntilNextPayoutStore.set(this.ticksBetweenPayouts);
                // console.log(`${this.name} paid out ${fundsToAdd}`);
            //} else {
            //     console.log(`${this.name} not ready ${ticksUntilPayout}`);
            }
          }
        return fundsToAdd;
    }
    
    tick(elapsedTicks: number) {
        const fundsToAdd = this.calculateFundsToAdd(elapsedTicks); 
        UpgradeClass.fundsStore.update((value) => value + fundsToAdd);
    }

    payoutsPerSecond(): number {
        const ticksPerSecond = 1000 / UpgradeClass.timerInterval;
        const ticksPerPayout = this.ticksBetweenPayouts;
        return ticksPerSecond / ticksPerPayout;
    }
    
}

/*
Items/Upgrades:

Given the music theme and Nashville's prominence in the country music scene, here are some items/upgrades you might consider:

Guitar Picks - these could be the most basic currency.

Cowboy Hat - a symbol of country music, could provide a charisma boost to your character.

Record Label Contract - provides a major boost to album sales and fan base.

Grammy Awards - prestigious achievement that gives a massive popularity boost.

Music Video - boosts your fan base and album sales.

Country Music Hall of Fame Induction - ultimate endgame goal, symbolizes your success as a musician.

Britney ideas:
private venue / house show
open mic night
local radio / internet streaming 

*/

const initialUpgradeData: UpgradeType[] = [
    {
        name: "Sheet Music", 
        key: "sheet-music",
        level: 0, // changes
        price: 10,
        costMultiplier: 2,
        multiplier: 1,
        adder: 1,
        payoutAmount: 0, // changes 
        initialPayoutAmount: 1,
        ticksBetweenPayouts: 1,
        ticksUntilNextPayout: 0, // changes 
        unicodeIcon: "🎼",
        imageUrl: "/sheet-music.avif"
    },
    {
        name: "Guitar",
        key: "guitar",
        level: 0,
        price: 150,
        costMultiplier: 1.3,
        multiplier: 1.2,
        adder: 1,
        payoutAmount: 0,
        initialPayoutAmount: 2,
        ticksBetweenPayouts: 5,
        ticksUntilNextPayout: 0,
        unicodeIcon: "🎸",
        imageUrl: "/guitar.avif",
    },
    {
        name: "Mic",
        key: "mic",
        level: 0,
        price: 250,
        costMultiplier: 3.5,
        multiplier: 1.4,
        adder: 1,
        payoutAmount: 0,
        initialPayoutAmount: 4,
        ticksBetweenPayouts: 20,
        ticksUntilNextPayout: 0,
        unicodeIcon: "🎤",
        imageUrl: "/mic.avif",
    },
    {
        name: "Banjo",
        key: "banjo",
        level: 0,
        price: 800,
        costMultiplier: 5,
        multiplier: 1.8,
        adder: 0,
        payoutAmount: 0,
        initialPayoutAmount: 8,
        ticksBetweenPayouts: 40,
        ticksUntilNextPayout: 0,
        unicodeIcon: "🪕",
        imageUrl: "/banjo.avif",
    },
    {
        name: "Drums",
        key: "drums",
        level: 0,
        price: 3000,
        costMultiplier: 4.5,
        multiplier: 1.6,
        adder: 1,
        payoutAmount: 0,
        initialPayoutAmount: 6,
        ticksBetweenPayouts: 30,
        ticksUntilNextPayout: 0,
        unicodeIcon: "🥁",
        imageUrl: "/drum.avif",
    },
    {
        name: "Piano",
        key: "piano",
        level: 0,
        price: 5000,
        costMultiplier: 6,
        multiplier: 2,
        adder: 0,
        payoutAmount: 0,
        initialPayoutAmount: 10,
        ticksBetweenPayouts: 50,
        ticksUntilNextPayout: 0,
        unicodeIcon: "🎹",
        imageUrl: "/piano.avif",
    },
    {
        name: "Studio",
        key: "studio",
        level: 0,
        price: 10000,
        costMultiplier: 3,
        multiplier: 2.5,
        adder: 0,
        payoutAmount: 0,
        initialPayoutAmount: 15,
        ticksBetweenPayouts: 75,
        ticksUntilNextPayout: 0,
        unicodeIcon: "🎧",
        imageUrl: "/headphones.avif",
    },
    {
        name: "Internet Radio",
        key: "internet-radio",
        level: 0,
        price: 30000,
        costMultiplier: 2.5,
        multiplier: 2,
        adder: 0,
        payoutAmount: 0,
        initialPayoutAmount: 4,
        ticksBetweenPayouts: 85,
        ticksUntilNextPayout: 0,
        unicodeIcon: "📻",
        imageUrl: "/radio.avif",
    },
    {
        name: "Music Video",
        key: "music-video",
        level: 0,
        price: 300000,
        costMultiplier: 3,
        multiplier: 2,
        adder: 0,
        payoutAmount: 0,
        initialPayoutAmount: 20,
        ticksBetweenPayouts: 100,
        ticksUntilNextPayout: 0,
        unicodeIcon: "🎥",
        imageUrl: "/music-video.avif",
    },
    {
        name: "Tour Bus",
        key: "tour-bus",
        level: 0,
        price: 500000,
        costMultiplier: 4,
        multiplier: 3,
        adder: 0,
        payoutAmount: 0,
        initialPayoutAmount: 30,
        ticksBetweenPayouts: 1000,
        ticksUntilNextPayout: 0,
        unicodeIcon: "🚌",
        imageUrl: "/bus.avif",
    },
    {
        name: "Grammy",
        key: "grammy",
        level: 0,
        price: 2000000,
        costMultiplier: 5,
        multiplier: 4,
        adder: 0,
        payoutAmount: 0,
        initialPayoutAmount: 40,
        ticksBetweenPayouts: 1000,
        ticksUntilNextPayout: 0,
        unicodeIcon: "🏆",
        imageUrl: "/grammy.avif",
    },
];

export const upgrades = initialUpgradeData.map((upgradeData) => new UpgradeClass(upgradeData));
