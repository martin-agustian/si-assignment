<template>
	<div class="m-box-blankdata">
		<img src="@/assets/images/bg-blank-data.png" />
		<div class="m-desc-blankdata">
			<b>Opps!</b>
			{{ props.title }}
		</div>
	</div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
	title: { type: String, default: 'Data tidak ditemukan' }
});
</script>
