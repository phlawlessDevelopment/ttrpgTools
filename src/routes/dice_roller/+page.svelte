<script lang="ts">
	import { d20, d6, d8, d10, d12 } from '../../dice';

	let d20s = 0;
	let d6s = 0;
	let d8s = 0;
	let d10s = 0;
	let d12s = 0;
	let bonus = 0;

	let total = 0;
	let breakdown = '';

	let history: Roll[] = [];

	enum Die {
		D20,
		D6,
		D8,
		D10,
		D12,
		Bonus
	}
	type Dir = 1 | -1;

	interface Roll {
		d20s: number;
		d6s: number;
		d8s: number;
		d10s: number;
		d12s: number;
		bonus: number;
	}

	function setDie(die: Die, dir: Dir) {
		switch (die) {
			case Die.D20:
				d20s += dir;
				d20s = Math.max(0, d20s);
				break;
			case Die.D6:
				d6s += dir;
				d6s = Math.max(0, d6s);
				break;
			case Die.D8:
				d8s += dir;
				d8s = Math.max(0, d8s);
				break;
			case Die.D10:
				d10s += dir;
				d10s = Math.max(0, d10s);
				break;
			case Die.D12:
				d12s += dir;
				d12s = Math.max(0, d12s);
				break;
			case Die.Bonus:
				bonus += dir;
				bonus = Math.max(0, bonus);
				break;
		}
	}

	function roll() {
		total = 0;
		breakdown = '';
		for (let i = 0; i < d20s; i++) {
			let r = d20();
			breakdown += r.toString() + ' + ';
			total += r;
		}
		for (let i = 0; i < d6s; i++) {
			let r = d6();
			breakdown += r.toString() + ' + ';
			total += r;
		}
		for (let i = 0; i < d8s; i++) {
			let r = d8();
			breakdown += r.toString() + ' + ';
			total += r;
		}
		for (let i = 0; i < d10s; i++) {
			let r = d10();
			breakdown += r.toString() + ' + ';
			total += r;
		}
		for (let i = 0; i < d12s; i++) {
			let r = d12();
			breakdown += r.toString() + ' + ';
			total += r;
		}
		total += bonus;
		breakdown += bonus.toString();

		history.push({
			d20s,
			d6s,
			d8s,
			d10s,
			d12s,
			bonus
		});

		d20s = d6s = d8s = d10s = d12s = bonus = 0;
	}
</script>

<div class="flex flex-col gap-2">
	<div class="flex card variant-glass-surface p-8 gap-4">
		<button class="btn-icon rounded-full variant-glass-primary" on:click={() => setDie(Die.D20, 1)}
			>D20</button
		>
		<button class="btn-icon rounded-full variant-glass-primary" on:click={() => setDie(Die.D6, 1)}
			>D6</button
		>
		<button class="btn-icon rounded-full variant-glass-primary" on:click={() => setDie(Die.D8, 1)}
			>D8</button
		>
		<button class="btn-icon rounded-full variant-glass-primary" on:click={() => setDie(Die.D10, 1)}
			>D10</button
		>
		<button class="btn-icon rounded-full variant-glass-primary" on:click={() => setDie(Die.D12, 1)}
			>D12</button
		>
		<button
			class="btn-icon rounded-full variant-glass-primary"
			on:click={() => setDie(Die.Bonus, 1)}>Bonus</button
		>
	</div>

	<div class="flex card variant-glass-surface p-8 gap-4">
		<button
			class="btn-icon rounded-full variant-glass-primary"
			on:click={() => setDie(Die.D20, -1)}
		>
			<input class="btn-icon variant-glass-primary" type="number" disabled bind:value={d20s} />
		</button>

		<button class="btn-icon rounded-full variant-glass-primary" on:click={() => setDie(Die.D6, -1)}>
			<input class="btn-icon variant-glass-primary" type="number" disabled bind:value={d6s} />
		</button>
		<button class="btn-icon rounded-full variant-glass-primary" on:click={() => setDie(Die.D8, -1)}>
			<input class="btn-icon variant-glass-primary" type="number" disabled bind:value={d8s} />
		</button>
		<button
			class="btn-icon rounded-full variant-glass-primary"
			on:click={() => setDie(Die.D10, -1)}
		>
			<input class="btn-icon variant-glass-primary" type="number" disabled bind:value={d10s} />
		</button>
		<button
			class="btn-icon rounded-full variant-glass-primary"
			on:click={() => setDie(Die.D12, -1)}
		>
			<input class="btn-icon variant-glass-primary" type="number" disabled bind:value={d12s} />
		</button>
		<button
			class="btn-icon rounded-full variant-glass-primary"
			on:click={() => setDie(Die.Bonus, -1)}
		>
			<input class="btn-icon variant-glass-primary" type="number" disabled bind:value={bonus} />
		</button>
	</div>

	<button class="btn variant-filled-warning" on:click={roll}>Roll</button>
	{#if total > 0}
		<h1 class="h1">
			{total}
		</h1>
		<h2 class="h2 break-words">
			{breakdown}
		</h2>
	{/if}
</div>
