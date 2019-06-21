<template>
  <div id="app" style="width:100%;height:100%" class="center">

    <mu-container style="padding:0px">
      <mu-appbar style="width: 100%;margin:0px;text-align: left;" color="primary">
        <mu-button icon slot="left" @click="Back()">
          <mu-icon value="reply"></mu-icon>
        </mu-button>
        <span style="position:absolute;left: 50%;transform: translate(-50%,0%);">注册</span>
      </mu-appbar>


      <div class="demo-vsteper-container">
        <mu-stepper :active-step="vactiveStep" orientation="vertical">
          <mu-step>
            <mu-step-label>
              填写账号信息
            </mu-step-label>
            <mu-step-content>
              <mu-text-field v-model="user" label="用户名" label-float help-text="用户名为6-12位的字符" icon="account_circle">
              </mu-text-field>
              <mu-text-field v-model="pass" label="密码" label-float help-text="密码为6-16位的字符" icon="locked"
                type="password"></mu-text-field>
              <mu-text-field v-model="qrpass" label="再次确认密码" label-float
                style="width:200px;margin-left: 55px;margin-top:-10px" type="password"></mu-text-field>
              <br />
              <mu-button class="demo-step-button" @click="vhandleNext(1)" color="primary">下一步</mu-button>
            </mu-step-content>
          </mu-step>
          <mu-step>
            <mu-step-label>
              填写个人信息
            </mu-step-label>
            <mu-step-content>
              <mu-text-field v-model="nc" placeholder="昵称" style="margin-bottom:0px;width:200px" help-text="昵称为1-10位字符">
              </mu-text-field>
              <mu-text-field v-model="dhhm" type="number" style="width:200px" placeholder="电话号码"
                help-text="电话号码为11位数字"></mu-text-field>
              <div style="margin-bottom:15px;margin-top:5px">
                <mu-radio v-model="radio" value="Man" label="Man" style="color:#2196f3"></mu-radio>
                <mu-radio v-model="radio" value="Girl" label="Girl" style="color:rgba(255,20,147,1)"></mu-radio>
              </div>
              <div>
                <mu-date-input style="width:200px;margin-top:-25px;" v-model="sr" label="生日" container="dialog"
                  label-float full-width onfocus="this.blur()">
                </mu-date-input>
                <mu-text-field label="所在地" style="width:200px;margin-top:-25px;" onfocus="this.blur()" v-model="address"
                  @click="dq(2)">
                </mu-text-field>
              </div>
              <br>
              <mu-button class="demo-step-button" @click="vhandleNext(2)" color="primary">下一步</mu-button>
              <mu-button flat class="demo-step-button" @click="vhandlePrev">上一步</mu-button>
            </mu-step-content>
          </mu-step>
          <mu-step>
            <mu-step-label>
              喜好/头像
            </mu-step-label>
            <mu-step-content>
              <mu-button fab color="primary" onclick="document.getElementById('Head_Base').click()">
                <mu-icon value="add"></mu-icon>
              </mu-button>
              <mu-paper class="demo-paper" circle :z-depth="5"
                style="height:56px;width:56px;border-radius:50%;display:block;float:left;margin-right:5px">
                <img :src="Head_Base64" style="height:56px;width:56px;border-radius:50%;"
                  onclick="document.getElementById('Head_Base').click()">
              </mu-paper>

              <input @change="fileImage" style="opacity:0" type="file" accept="image/jpeg,image/x-png,image/gif"
                id="Head_Base" value="" />
              <mu-select label="喜好" multiple chips v-model="xh" full-width>
                <mu-option v-for="city,index in citys" :key="city" :label="city" :value="city"></mu-option>
              </mu-select>
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
    <!-- 装地区层的 -->
    <mu-fade-transition>
      <div style="width:100%;height: 100vh;position: absolute;z-index: 20000;" v-show="dqshow">
        <div style="width:100%;height: 100vh;position: absolute;z-index: 19998;background: rgba(0,0,0,0.3);"
          v-if="dqshow" @click="dqshow=false">

        </div>
        <div class="demo-picker-container"
          style="width: 100%;position:absolute;bottom: 0px;z-index: 19999;background: #FFFFFF;">
          <div style="width: 100%;height: 25px;background: #FFFFFF;display: flex;">
            <div style="width: 50%;line-height: 25px;text-align: left;">
              <mu-button flat color="primary" @click="dq(1)">取消</mu-button>
            </div>
            <div style="width: 50%;line-height: 25px;text-align: right;">
              <mu-button flat color="primary" @click="dq(1)">确定</mu-button>
            </div>
          </div>
          <mu-slide-picker :slots="addressSlots" :visible-item-count="7" @change="addressChange" :values="address">
          </mu-slide-picker>
        </div>
      </div>
    </mu-fade-transition>
    <!-- 装提示框的 -->

    <mu-fade-transition>
      <mu-dialog title="注册成功" width="600" max-width="80%" :esc-press-close="false" :overlay-close="false"
        :open.sync="openAlert">
        是否直接登陆？
        <mu-button slot="actions" flat color="primary" @click="sfdl(1)">是</mu-button>
        <mu-button slot="actions" flat color="primary" @click="sfdl(2)">不用,谢谢</mu-button>
      </mu-dialog>
    </mu-fade-transition>


    <!-- 加载层 -->



  </div>
</template>

<style>

</style>
<script>
  import app from '../js/app.js';
  import {
    axios_get,axios_post
  } from '../js/axios.js';
  import address from '../js/city.js';
  import Head_base from '../js/Head_base.js';
  import Hobby from '../js/Hobby.js';
  import tx from "../image/1.jpg";

  export default {
    data() {
      return {
        vactiveStep: 0,
        user: "",
        qrpass: "",
        pass: "",
        nc: "",
        dhhm: "",
        radio: "Man",
        sr: "",
        addressSlots: [{
          width: '100%',
          textAlign: 'right',
          values: Object.keys(address)
        }, {
          width: '100%',
          textAlign: 'left',
          values: ['北京']
        }],
        address: ['北京', '北京'],
        addressProvince: '北京',
        addressCity: '北京',
        City: "",
        dqshow: false,
        citys: Hobby,
        xh: [],
        zhxx: {
          'nc': "",
          'sr': "",
          'xb': "",
          'address': [],
          'dhhm': '',
          'user': "",
          'pass': "",
          'qrpass': "",
          'xh': []
        },
        openAlert: false,
        jzc: false,
        Head_Base64: Head_base

      }
    },
    
    computed: {
      vfinished() {
        return this.vactiveStep > 2;
      }
    },
    methods: {
      fileImage(e) {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onloadend = () => {
          this.Head_Base64 = reader.result;
        }
      },
      // 关于注册下一步
      vhandleNext(i) {
        //   判断传来的值，从而做出相对应的事
        var nc = this.nc;
        var dhhm = this.dhhm;
        var sr = this.sr;
        var xb = this.radio;
        var address = this.address;
        var user = this.user;
        var pass = this.pass;
        var qrpass = this.qrpass;
        var xh = this.xh;
        if (i == 1) {
          // 第一次验证用户名及两次密码
          if (user != "" && pass != "" && qrpass != "") {
            if (user.length < 5) {
              this.$toast.error('用户名不可低于6位');
              return;
            }
            if (pass.length < 6 || qrpass.length < 6) {
              this.$toast.error('密码不可低于6位');
              return;
            }
            if (pass != qrpass) {
              this.$toast.error('两次输入的密码不一致');
              return;
            }
            this.vactiveStep++;
          } else {
            this.$toast.error('账号或密码不可为空');
          }
        }
        // 第二次验证昵称等等
        else if (i == 2) {
          if (nc != "" && dhhm != "" && sr != "") {
            this.vactiveStep++;
          } else {
            this.$toast.error('请将个人信息填全');
          }
        }
        // 第三次提交把信息封装到本地存储里并弹出提示框提示是否跳转主页及登陆页
        else if (i == 3) {
          let loading = this.$loading();
          let form_json = {}
          form_json.User_name = user
          form_json.password = pass
          form_json.Cell = dhhm;
          form_json.Gender = xb == 'Man' ? '男' : '女'
          form_json.Nickname = nc
          form_json.Hobby = xh
          form_json.Location = address[0] + "," + address[1]
          form_json.Birthday = new Date(sr).toLocaleDateString()
          form_json.Head_Base64 = this.Head_Base64
          axios_post("api_User_Insert", form_json, (result) => {
            if (result.data.data.result.n > 0) {
              loading.close()
              this.openAlert = true;
            }
          })

        }

      },
      // 关于上一步
      vhandlePrev() {
        this.vactiveStep--;
      },
      // 关于重置
      vreset() {
        this.vactiveStep = 0;
      },
      // 关于地区选择
      addressChange(value, index) {
        switch (index) {
          case 0:
            this.addressProvince = value
            const arr = address[value]
            this.addressSlots[1].values = arr
            this.addressCity = arr[0]
            break
          case 1:
            this.addressCity = value
            break
        }
        this.address = [this.addressProvince, this.addressCity]
      },
      // 开关地区图层
      dq(a) {
        if (a == 1) {
          this.dqshow = false;
        } else {
          this.dqshow = true;
        }
      },
      // 关于喜好
      remove(index) {
        this.chips.splice(index, 1);
      },
      reset() {
        this.chips = [...initChips];
      },
      // 注册成果后的是否登陆框
      sfdl(a) {
        if (a == 1) {
          this.openAlert = false;
          // 过度动画
          app.jzc(500);
          setTimeout(() => {
            this.$router.push('PageHome');
          }, 600);

        } else {
          this.openAlert = false;
          // 过度动画
          app.jzc(500);
          setTimeout(() => {
            this.$router.push('Login');
          }, 600);

        }
      },
      Back() {
        history.back();
      }

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
      radio: function () {
        console.log(this.radio);
      }

    }
  }

</script>
