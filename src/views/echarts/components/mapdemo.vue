<template>
  <div>
    <div ref="main" class="mapcontainer" id="container"></div>
  </div>
</template>

<script>
export default {
  name: 'mapdemo', 
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    var map = new window.BMap.Map("container"); 
    var point = new window.BMap.Point(116.404, 39.915); 
    map.centerAndZoom(point, 15);  
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.mapcontainer {
  width: 800px;
  height: 600px;
  border: 2px solid #333;
}
</style>