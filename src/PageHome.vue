<template>
	<div id="app">
		<div style="width:100%;height:91vh;">
			<mu-fade-transition>
			<div v-show="a[0].zt" v-if="a[0].zt" style="height: 100%">
				<Home></Home>
			</div>
			</mu-fade-transition>
			<!-- <mu-fade-transition>
			<div v-show="a[1].zt" v-if="a[1].zt" style="height: 100%">
				<grzl></grzl>
			</div>
			</mu-fade-transition> -->
			<mu-fade-transition>
            <div v-show="a[2].zt" v-if="a[2].zt" style="height: 100%">
				<Map></Map>
			</div>
			</mu-fade-transition>
			

		</div>
		<div style="width:100%;height:9vh;overflow: hidden;position: fixed;bottom: 0px;">
			<mu-container style=" width:100%;height:100%;padding: 0px;">
				<mu-bottom-nav :value.sync="shift" shift style="height:100%;width: 100%;min-width: 100%;">
					<!-- <mu-bottom-nav-item value="grzl" title="我的" icon="perm_identity"></mu-bottom-nav-item> -->
					<mu-bottom-nav-item value="home" title="搜索" icon="search"></mu-bottom-nav-item>
					<mu-bottom-nav-item value="Map" title="地图" icon="explore"></mu-bottom-nav-item>
				</mu-bottom-nav>
			</mu-container>
		</div>
	</div>
</template>
<style>
	
    
</style>
<script>
	
	import grzl from './components/grzl.vue';
    import jk from './components/jk.vue';
    import Home from "./components/Home.vue";
	import ck from './components/ck.vue';
	import Map from './components/Map.vue';
	export default {
		data() {
			return {
				shift: 'home',
                a:[
                    {
                        name:'home',zt:false
                    },
                    {
                        name:'grzl',zt:false
                    },
                    {
                        name:'Map',zt:false
                    },
                    {
                        name:'ck',zt:false
                    },
                    {
                        name:'jk',zt:false
                    }
                ]
			}
		},
		components: {
			Home,
			Map,
			grzl,
			ck,
			jk

		},
		mounted() {
			this.gh();
		},
		watch: {
			shift: function() {
				this.gh();
			}
		},
		methods: {
            gh(){
				var a=this.a;
				var shift=this.shift;
				var s;
                 for(var c=0;c<5;c++){
					 if(a[c].name==shift){
						s=c;
						break ;
					 }
				 }
				 for(var c=0;c<5;c++){
					a[c].zt=false;
					if(c==s){
						a[c].zt=true;
					}
					
				 }
            }
		}
	}
</script>