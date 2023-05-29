<template>

	<div class="circle-error"></div>
	<div class="box-table">
		<div class="display-table">
			<div class="display-table-cell">
				<div class="box-page-error">
					<img src="http://statics.bakingworld.id/images/Illustration/503-layanan-sementara-tidak-tersedia-min.png">
					<div class="desc-page-error">
						Layanan sementara tidak tersedia. Silahkan coba beberapa saat lagi 
					</div>
					<router-link to="/">
                        <button class="button button-red">
                        <i class="fas fa-chevron-circle-left"></i> <b>Kembali ke Beranda</b>
                        </button>
					</router-link>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
export default {
  name: 'App',
  components: {
	
  }
}
</script>

