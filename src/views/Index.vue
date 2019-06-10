<template lang="pug">
  div
    .screen
      .logo ChartFun
      .desc 一站式数据大屏制作平台
      transition(name="slide-fade")
        .login-box(v-if="show")
          .radio-group
            .radio-btn(:class="{active: tab == 'login'}" @click="tab = 'login'") 登录
            .radio-btn(:class="{active: tab == 'reg'}" @click="tab = 'reg'") 注册
          el-input(placeholder="请输入用户名" v-model="form.user")
          el-input(
            placeholder="请输入密码"
            :type="tab == 'login' ? 'password' : 'text'"
            v-model="form.password"
            style="margin-top: 10px;")
      .btn-wrapper
        span.btn(@click="handleClick") 进入系统
</template>

<script>
/* eslint-disable */
import md5 from 'js-md5';

export default {
  data() {
    return {
      show: false,
      tab: 'login',
      form: {
        user: '',
        password: '',
      },
    };
  },
  mounted() {
  },
  methods: {
    handleClick() {
      if (!this.show) {
        if (localStorage.getItem('uid')) {
          this.$router.push('console');
        } else {
          this.show = true;
        }
      } else {
        // 开始检查
        const md5pass = md5(this.form.password); // 对密码进行MD5加密
        this.$http
          .post(`/user/${this.tab}`, {
            user: this.form.user,
            pass: md5pass
          })
          .then((res) => {
            const { errno, errmsg, data } = res.data;
            if (errno === 0) {
              this.$message({
                type: 'success',
                message: '验证成功'
              });
              localStorage.setItem('uid', data.uid);
              localStorage.setItem('user', data.name);
              this.$router.push('console');
            } else {
              this.$message.error(errmsg);
            }
          })
          .catch(() => {});
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
  padding: 0 40px 36px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.06);
  .radio-group {
    text-align: center;
    .radio-btn {
      display: inline-block;
      padding: 10px 20px;
      margin: 10px 10px;
      color: #999999;
      &.active {
        color: #212121;
        border-bottom: 2px solid #212121;
      }
    }
  }
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
