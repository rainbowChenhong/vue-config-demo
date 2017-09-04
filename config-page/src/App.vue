<template>
  <div id="app">
    <List></List>
  </div>
</template>

<script>
  import List from './components/list.vue';
export default {
  name: 'app',
  data () {
    return {

    }
  },
    components:{List}
}
</script>

<style>
  body {
    margin: 0;
  }
html{
  font-family: sans-serif; /* 1 */
  -ms-text-size-adjust: 100%; /* 2 */
  -webkit-text-size-adjust: 100%; /* 2 */
}
*{
  box-sizing: border-box;
}
  #app{

}
</style>
