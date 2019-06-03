<template lang="pug">
  div
    .screen
      .logo ChartFun
      .desc 一站式数据大屏制作平台
      .btn-wrapper
        span.btn(@click="goToConsole") 进入系统
</template>

<script>
export default {
  mounted() {
  },
  methods: {
    goToConsole() {
      this.$router.push('console');
    },
  },
};
</script>

<style lang="scss" scoped>
.screen {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: url('../assets/img/bg.png');
  background-position: 50%;
  background-size: cover;
  background-repeat: no-repeat;
}
.logo {
  height: 72px;
  line-height: 72px;
  text-align: center;
  font-weight: bold;
  font-size: 36px;
  color: #515151;
  margin-top: 180px;

  &::after {
    content: ".";
    font-size: 42px;
    color: rgba(255, 0, 0, 0.6);
  }
}
.desc {
  text-align: center;
  font-size: 16px;
  font-weight: 300;
  font-family: 'Noto Sans SC', sans-serif;
  letter-spacing: 4px;
  color: #808080;
  margin: 0 0 10px;
}
.btn-wrapper {
  margin-top: 80px;
  text-align: center;
  a {
    text-decoration: none;
    color: #ffffff;
  }
  .btn {
    padding: 12px 32px;
    background: rgba(0, 0, 0, 0.5);
    color: #ffffff;
    transition: background 0.3s ease;
    font-size: 14px;
    border-radius: 50px;
    &:hover {
      background: #409EFF;
      cursor: pointer;
    }
  }
}
</style>
