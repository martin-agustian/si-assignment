<template>
  <Header v-if="$route.name != 'SignIn' && $route.name != 'SignUp' && $route.name != 'ErorrPage404' && $route.name != 'ErorrPage500' && $route.name != 'ErorrPage500' && $route.name != 'ErorrPage502' && $route.name != 'ErorrPage503' && $route.name != 'ErorrPage504'"  />
	<router-view />
  <Footer v-if="$route.name != 'SignIn' && $route.name != 'SignUp' && $route.name != 'ErorrPage404' && $route.name != 'ErorrPage500' && $route.name != 'ErorrPage500' && $route.name != 'ErorrPage502' && $route.name != 'ErorrPage503' && $route.name != 'ErorrPage504'"  />
</template>


<script>
  import Header from './components/Header.vue'
  import Footer from './components/Footer.vue'
  export default {
    name: 'App',
    components: {
      Header,
      Footer
    }
  }
</script>