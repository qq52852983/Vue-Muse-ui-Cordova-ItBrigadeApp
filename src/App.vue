<template>
	<div id="app" style="height:100vh;">
		<router-view></router-view>
	</div>
</template>

<script>
	// import Login from './components/Login.vue';
	// import Home from './components/Home.vue';
	export default {
		name: 'App',
		data() {
			return {
				active2: 0
			}
		},
		components: {
			
		}
	}
</script>

<style>
	.demo-text {
		padding: 0px;
		background: #fff;
	}
</style>