<template lang="pug">
  div
    .logo ChartFun
    div(style="text-align:center;")
      router-link(to="console") console
    div(style="text-align:center;")
      router-link(to="edit/123") editor
</template>

<script>
export default {
  mounted() {
    this.$http.get('charts', {
      params: {
        ID: 12345
      }
    })
    .then(res => {
      const { errno, data } = res;
      if (errno === 0) {
        this.
        console.log(data);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  },
};
</script>

<style lang="scss" scoped>
.logo {
  height: 120px;
  line-height: 120px;
  text-align: center;
  font-weight: bold;
  font-size: 22px;
  color: #515151;

  &::after {
    content: ".";
    font-size: 28px;
    color: rgba(255, 0, 0, 0.6);
  }
}
</style>
