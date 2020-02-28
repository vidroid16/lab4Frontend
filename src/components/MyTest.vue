<template>
<div id="test">
    <input id="inp" @change="reset" type="text">
</div>
</template>  
<script>
    function reset(){
        document.getElementById("test").id.value = "СЛАВА УКРАИНЕ";
    }
</script>  
