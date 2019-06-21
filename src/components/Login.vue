<template>
  <div id="app" :style="sbsb">
    <div style="width:100%;height:100vh" ref="app_">
      <!-- <mu-ripple class="mu-ripple-demo demo-1" style="width: 100%;height: 100%;border: 0px;background: transparent;display: block;"> -->

      <div style="width: 100%;height: 30%;align-items: center;" class="center">
        <!--头像-->
        <img  :src="image_base" width="100px" height="100px" class="ybyk yrqr" /> <!--:src="../image/1.jpg" -->

      </div>
      <div style="width: 90%;height: 40%;margin: 10px 5%;">
        <!--from单-->
        <div style="width: 100%;display: flex;justify-content: center;align-items: center;">
          <div style="width: 10%;" class="center">
            <i :class="{'material-icons':true,'ooo':ooo,'oo':oo}"
              style="font-size: 28px;margin-right: 5px;">perm_identity</i>
          </div>
          <mu-text-field v-model="user" @focus="hqjd(1)" @blur="sqjd(1)"
            style="margin:0px;width:100%;padding:0px;min-height:auto;"></mu-text-field>

        </div>
        <div style="width: 100%;display: flex;justify-content: center;align-items: center;margin-top:5px">
          <div style="width: 10%;" class="center">
            <i :class="{'material-icons':true,'ooo':oooo,'oo':oo}" style="font-size: 28px;margin-right: 5px;">lock</i>
          </div>
          <mu-text-field style="width:100%;margin: 0px;padding:0px;min-height:auto;" @focus="hqjd(2)" @blur="sqjd(2)"
            v-model="pass" :action-icon="visibility ? 'visibility_off' : 'visibility'"
            :action-click="() => (visibility = !visibility)" :type="visibility ? 'text' : 'password'">
          </mu-text-field>
        </div>
        <div style="width:100%;margin-top: 10px;">
          <mu-flex class="select-control-row">
            <mu-checkbox v-model="checkbox" :label="'记住密码'"></mu-checkbox>
          </mu-flex>
        </div>
        <div style="width:100%;margin-top:10px">
          <mu-button color="primary" style="width:100%;border-radius: 20px;" @click="dl">登陆</mu-button>

        </div>
        <div style="width: 100%;margin-top: 5px;">
          <mu-button flat color="primary" style="position:absolute;left: 10px;" to="/vuce">注册</mu-button>
          <mu-button flat color="primary" style="position: absolute;right: 20px;">找回密码</mu-button>
        </div>
      </div>
      <!-- </mu-ripple> -->
    </div>

  </div>
</template>

<script>
  import bj from "../image/bj.jpg";
  import Head_base from '../js/Head_base.js'
  import tx from "../image/1.jpg";
  import app from '../js/app.js';
  import {
    axios_get
  } from '../js/axios.js';
  export default {
    name: "app",
    data() {
      return {
        sbsb: {
          background: "url(" + bj + ") center",
          backgroundSize: "100% 100%"
        },
        image_base:tx,
        visibility: false,
        user: "",
        pass: "",
        ooo: false,
        oooo: false,
        checkbox: false,
        oo: true,
        

      };
    },
    methods: {
      // 获取焦点事件
      hqjd(a) {
        if (a == 1) this.ooo = true;
        else this.oooo = true;
      },
      // 获取焦点事件
      sqjd(b) {
        if (b == 1) this.ooo = false;
        else this.oooo = false;
      },
      //登陆按钮事件
      dl() {
        var user = this.user;
        var pass = this.pass;
        if (user.length != 0 && pass.length != 0) {
          let loading = this.$loading();
          let form_data = {
            User_name: user,
            password: pass
          }
          axios_get("api_User", form_data, (result) => {
            if (result.data.data.length > 0) {
              localStorage.setItem('user_id',JSON.stringify(result.data.data[0]))
              if(this.checkbox){
                localStorage.setItem('password_checked','true,'+user+','+pass)
              }else{
                localStorage.setItem('password_checked','false,'+user)
              }
              loading.close()
              this.$toast.success('登陆成功');
              setTimeout(() => {
                this.$router.push("PageHome");
              }, 1100);
            } else {
              loading.close()
              this.$toast.error('帐密有误');
            }
          })
        } else {
          this.$toast.error("账号或密码不可为空");
        }
      }
    },
    watch: {
      // 处理输入框前图标的颜色动态变化
      checkbox: function () {
        let c = document.getElementsByClassName("mu-checkbox-label");
        if (this.checkbox == true) {
          c[0].style.color = "#2196F3";
          return;
        } else {
          c[0].style.color = "#000000";
        }
      }
    },
    computed: {

    },
    mounted() {
      let password_checked=localStorage.getItem('password_checked')
      let user_id=JSON.parse(localStorage.getItem('user_id'))
      if(user_id==null){
        return this.image_base=Head_base
      }
      this.image_base=user_id.Head_Base64;
      if(password_checked!=null || password_checked!=undefined){ 
        password_checked=password_checked.split(',')
        this.user=password_checked[1]
        if(password_checked[0]=='true'){
          this.pass=password_checked[2]
          let c = document.getElementsByClassName("mu-checkbox-label");
          this.checkbox=true;
          c[0].style.color = "#2196F3";
        }
      }
    }
  };

</script>
<style scoped>
  .mu-text-field-input {
    color: #ffffff;
  }

  .oo {
    color: #242424;
  }

  .ooo {
    color: #2196f3;
  }

  .mu-checkbox-label {
    font-size: 13.5px;
    color: #000000;
  }

</style>
