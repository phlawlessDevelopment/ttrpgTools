<script lang="ts">
	import type { Npc } from '../types/npc';
	export let npc: Npc;
	const { name, race, gender, statblock, bio } = npc;
	const { strength, dexterity, constitution, intelligence, wisdom, charisma } = statblock;
</script>

<div class="card variant-ghost-primary gap-2 pb-4 px-4 flex flex-col items-center">
	<h1 class="h1">
		{name}
	</h1>
	<h2 class="h2">
		{race}
	</h2>
	<h2 class="h2">
		{gender}
	</h2>
	<h3 class="h3">
		{bio}
	</h3>
	<div class="table-container">
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Str</th>
					<th>Dex</th>
					<th>Con</th>
					<th>Int</th>
					<th>Wis</th>
					<th>Cha</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{strength}</td>
					<td>{dexterity}</td>
					<td>{constitution}</td>
					<td>{intelligence}</td>
					<td>{wisdom}</td>
					<td>{charisma}</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
