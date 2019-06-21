<template>
    <div id="app" style="height:100%;width:100%;background:pink">
        健康
    </div>
</template>

<style>

</style>
<script>
export default{
    data(){
        return{
            shift:'pictures'
        }
    },
    watch:{
        shift:function(){
                // alert(this.shift);
                gg();
            }
    }
}
</script>
