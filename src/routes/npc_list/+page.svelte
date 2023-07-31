<script lang="ts">
	import NpcCard from '../../components/npcCard.svelte';
	import { races } from '../../data';
	import { d10, d6 } from '../../dice';
	import type { Gender, Npc, StatBlock } from '../../types/npc';
	let count: number;
	let npcs: Npc[] = [];
	let nums = [1, 2, 3];
	function pickRace() {
		return races[Math.floor(Math.random() * races.length)];
	}

	function pickGender() {
		const genders = ['male', 'female'];
		return genders[Math.floor(Math.random() * genders.length)] as Gender;
	}

	function pickName() {}

	function genStats() {
		const stats = [];
		const statBlock: StatBlock = {
			strength: 0,
			dexterity: 0,
			constitution: 0,
			intelligence: 0,
			wisdom: 0,
			charisma: 0
		};

		for (let i = 0; i < 6; i++) {
			const dice = Array(4)
				.fill(0)
				.map((n) => d6());
			dice.sort((a, b) => b - a);
			dice.pop();
			stats.push(dice.reduce((a, c) => a + c, 0));
		}

		return stats.reduce(
			(a, c, i) => {
				const key = Object.keys(statBlock)[i] as keyof StatBlock;
				a[key] = c;
				return a;
			},
			{ ...statBlock }
		);
	}

	async function generateMissingFields(npc: Npc) {
		const response = await fetch('api/npc', {
			method: 'POST',
			body: JSON.stringify(npc)
		});
		const data = await response.json();
		console.log(data);
	}

	function genNPC() {
		const npc = {
			id: Math.floor(Math.random() * 10000),
			name: 'npc_2',
			race: pickRace(),
			gender: pickGender(),
			statblock: genStats()
		};
		generateMissingFields(npc);
	}
</script>

<div class="flex gap-4 mb-4">
	<input class="input" type="number" placeholder="count" bind:value={count} />
	<button type="button" class="btn variant-filled-warning" on:click={genNPC}>Generate </button>
</div>
<div class="grid grid-cols-3 gap-2">
	{#each npcs as npc (npc.id)}
		<NpcCard {npc} />
	{/each}
</div>
