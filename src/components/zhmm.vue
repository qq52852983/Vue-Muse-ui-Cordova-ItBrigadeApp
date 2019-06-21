<template>
  <div id="app" style="height:100%;width:100%" class="center">
    <mu-container>
      <div class="demo-vsteper-container">
        <mu-stepper :active-step="vactiveStep" orientation="vertical">
          <mu-step>
            <mu-step-label>
              填写账号信息
            </mu-step-label>
            <mu-step-content>
              <mu-text-field v-model="user" label="用户名" label-float help-text="用户名为6-12位的字符" icon="account_circle"></mu-text-field>
              <mu-text-field v-model="pass" label="密码" label-float help-text="密码为6-16位的字符" icon="locked" type="password"></mu-text-field>
              <mu-text-field v-model="qrpass" label="再次确认密码" label-float style="width:200px;margin-left: 55px;margin-top:-10px"
                type="password"></mu-text-field>
              <br />
              <mu-button class="demo-step-button" @click="vhandleNext(1)" color="primary">下一步</mu-button>
            </mu-step-content>
          </mu-step>
          <mu-step>
            <mu-step-label>
              填写个人信息
            </mu-step-label>
            <mu-step-content>
              <mu-text-field v-model="nc" placeholder="昵称" style="margin-bottom:0px" help-text="昵称为1-10位字符"></mu-text-field>
                
                
                <div>
                  <div style="width: 100%;">
                    性别
                  </div>
                      
                  <mu-radio v-model="radio" value="Man" label="Man"></mu-radio>
                  <mu-radio v-model="radio" value="Girl" label="Girl"></mu-radio>
                </div>
               
               
              <mu-text-field v-model="dhhm" type="number" placeholder="电话号码" style="" help-text="电话号码为1-11位字符"></mu-text-field>
              <mu-button class="demo-step-button" @click="vhandleNext(2)" color="primary">下一步</mu-button>
              <mu-button flat class="demo-step-button" @click="vhandlePrev">上一步</mu-button>
            </mu-step-content>
          </mu-step>
          <mu-step>
            <mu-step-label>
              宣传活动
            </mu-step-label>
            <mu-step-content>
              <p>
                多在群里发消息宣传宣传，有事没事多在群里唠唠嗑，确定的话就ok拉
              </p>
              <mu-button class="demo-step-button" @click="vhandleNext(3)" color="primary">完成</mu-button>
              <mu-button flat class="demo-step-button" @click="vhandlePrev">上一步</mu-button>
            </mu-step-content>
          </mu-step>
        </mu-stepper>
        <p v-if="vfinished">
          都完成啦!<a href="javascript:;" @click="vreset">点这里</a>可以重置
        </p>
      </div>
    </mu-container>
  </div>
</template>

<style>

</style>
<script>
  export default {
    data() {
      return {
        vactiveStep: 0,
        user: "",
        qrpass: "",
        pass: "",
        nc: "",
        dhhm: "",
        radio:""

      }
    },
    computed: {
      vfinished() {
        return this.vactiveStep > 2;
      }
    },
    methods: {
      vhandleNext(i) {
        //   判断传来的值，从而做出相对应的事
        if (i == 1) {
          var user = this.user;
          var pass = this.pass;
          var qrpass = this.qrpass;

          if (user != "" && pass != "" && qrpass != "") {;
            this.vactiveStep++;
          } else {
            this.$toast.error('账号或密码不可为空');
          }
        }

      },
      vhandlePrev() {
        this.vactiveStep--;
      },
      vreset() {
        this.vactiveStep = 0;
      },

    },
    mounted() {

    },
    watch: {
      user: function () {
        if (this.user.length > 10) {
          this.user = this.user.substring(0, 10);
        }
      },
      pass: function () {
        if (this.pass.length > 16) {
          this.pass = this.pass.substring(0, 16);
        }
      },
      qrpass: function () {
        if (this.qrpass.length > 16) {
          this.qrpass = this.qrpass.substring(0, 16);
        }
      },
      nc: function () {
        if (this.nc.length > 10) {
          this.nc = this.nc.substring(0, 10);
        }
      },
      dhhm: function () {
        if (this.dhhm.length > 11) {
          this.dhhm = this.dhhm.substring(0, 10);
        }
      },
      radio:function(){
          console.log(this.radio);
      }

    }
  }

</script>
