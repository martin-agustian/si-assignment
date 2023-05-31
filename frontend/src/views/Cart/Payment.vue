<template>
	<div class="box-summary">
		<h3>
			Ringkasan Belanja
		</h3>
		<div class="list-summary">
			<div class="left-summary">
				Total Harga Barang 
				<span>1 Barang</span>
			</div>
			<div class="right-summary">
				<b>Rp 300.000</b>
			</div>
			<div class="clearer"></div>
		</div>
		<div class="list-summary">
			<div class="left-summary">
				Diskon Barang
			</div>
			<div class="right-summary">
				<b>-</b>
			</div>
			<div class="clearer"></div>
		</div>
		<hr />
		<div class="list-summary">
			<div class="left-summary-alt">
				<b class="clr-black-dark">Total Harga</b>
			</div>
			<div class="right-summary-alt">
				<b class="clr-red">Rp 900.000</b>
			</div>
			<div class="clearer"></div>
		</div>
		
		<button class="button button-green w-100" :disabled="true">
			<b>Beli Sekarang</b>
		</button>
	</div>
</template>

<script setup>
	
</script>