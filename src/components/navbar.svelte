<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead">phlawlessDevelopement</svelte:fragment>
	TTRPG Suite
	<svelte:fragment slot="trail">
		<a href="/npc_list" class="btn variant-soft-surface">NPC</a>
	</svelte:fragment>
</AppBar>
