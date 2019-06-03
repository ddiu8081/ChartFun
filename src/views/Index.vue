<template lang="pug">
  div
    .screen
      .logo ChartFun
      .desc 一站式数据大屏制作平台
      transition(name="slide-fade")
        .login-box(v-if="show")
          el-input(placeholder="请输入学号或工号" v-model="form.user")
          el-input(placeholder="请输入密码" type="password" v-model="form.password" style="margin-top: 10px;")
      .btn-wrapper
        span.btn(@click="handleClick") 进入系统
</template>

<script>
export default {
  data() {
    return {
      show: false,
      form: {
        user: 'admin',
        password: ''
      }
    };
  },
  mounted() {
  },
  methods: {
    handleClick() {
      if (!this.show) {
        this.show = true;
      } else {
        this.$router.push('console');
        // this.$message.error('用户名或密码错误');
      }
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
  margin: 0 0 40px;
}

.login-box {
  background: #ffffff;
  width: 240px;
  margin: 20px auto 40px;
  padding: 20px 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.06);
}

.btn-wrapper {
  margin-top: 40px;
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

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
