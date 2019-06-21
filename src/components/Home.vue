<template>
  <div id="app">
    <div style="width:100%;height:90vh;margin-bottom: 40px;overflow: hidden;">
      <mu-ripple class="mu-ripple-demo demo-1"
        style="width: 100%;height: 100%;border: 0px;background: transparent;display: block;">
        <!-- 头部 -->
        <mu-appbar style="width: 100%;height: 45px;position: fixed;top: 0px;" color="primary">
          <mu-button icon slot="left" class="center" @click="open=true;">
            <img :src="image_base" height="25px" width="25px" style="border-radius:50px;" />
          </mu-button>
          搜索
          <mu-menu slot="right" placement="bottom">
            <mu-button flat style="" class="center">
              <i class="material-icons" style="">add</i>
            </mu-button>
            <!-- 下面是下拉框 -->
            <!-- <mu-list slot="content">
              <mu-list-item button>
                <mu-list-item-content>
                  <mu-list-item-title>选项1</mu-list-item-title>
                </mu-list-item-content>
              </mu-list-item>
              <mu-list-item button>
                <mu-list-item-content>
                  <mu-list-item-title>选项2</mu-list-item-title>
                </mu-list-item-content>
              </mu-list-item>
            </mu-list> -->
            <!-- 上面是下拉框 -->
          </mu-menu>
        </mu-appbar>
        <div style="overflow: auto;height:calc(90vh);">
          <mu-text-field v-model="AT.form.content" icon="redo" full-width placeholder="出发点" id="suggestId"
            style="margin-top:60px">
          </mu-text-field>
          <mu-text-field v-model="AT.to.content" icon="undo" full-width placeholder="终点" id="suggestId2">
          </mu-text-field>
          <mu-date-input style="margin-top:-25px;" icon="today" v-model="AT.date" placeholder="出发时间"
            container="bottomSheet" label-float full-width onfocus="setTimeout(()=>{this.blur();},200)">
          </mu-date-input>
          <mu-button color="primary" style="width:100%" @click="AT_sub()">
            <mu-icon left value="search"></mu-icon>
            查询
          </mu-button>
          <mu-expansion-panel v-if="AT_ary_check.Aircraft">
            <div slot="header">
              <mu-button flat color="red">
                速度型
                <mu-icon right value="local_airport"></mu-icon>
              </mu-button>
            </div>
            <div style="" class="ybyk fjk_1">
              <div style="" class="div_1">
                {{AT_dom.Aircraft.Aircraft_number}}
              </div>
              <div style="" class="div_2">
                {{AT_dom.Aircraft.Spend_time.on}}
                <br>
                {{AT_dom.Aircraft.Spend_time.on_place}}
              </div>
              <mu-icon size="36" value="redo"></mu-icon>
              <div class="div_2">
                {{AT_dom.Aircraft.Spend_time.end}}<br />
                {{AT_dom.Aircraft.Spend_time.end_place}}
              </div>
              <div class="div_1">
                ￥{{AT_dom.Aircraft.Seat_price}}
              </div>
              <mu-button icon color="secondary" style="">
                <mu-icon value="assistant"></mu-icon>
              </mu-button>
            </div>

          </mu-expansion-panel>
          <mu-expansion-panel v-if="AT_ary_check.Train">
            <div slot="header">
              <mu-button flat color="red">
                经济型
                <mu-icon right value="directions_railway"></mu-icon>
              </mu-button>
            </div>
            <div style="" class="ybyk fjk_1">
              <div style="" class="div_1">
                {{AT_dom.Train.fo_number}}
              </div>
              <div class="div_2">
                {{AT_dom.Train.Spend_time.on}}<br />{{AT_dom.Train.Spend_time.on_place}}
              </div>
              <mu-icon size="36" value="redo"></mu-icon>
              <div class="div_2">
                {{AT_dom.Train.Spend_time.end}}<br />
                {{AT_dom.Train.Spend_time.end_place}}
              </div>
              <div class="div_1">
                ￥{{AT_dom.Train.Seat_price.toFixed(2)}}
              </div>
              <mu-button icon color="secondary" style="">
                <mu-icon value="assistant"></mu-icon>
              </mu-button>
            </div>
          </mu-expansion-panel>
          <mu-expansion-panel v-if="AT_ary_check.Automobile">
            <div slot="header">
              <mu-button flat color="red">
                慢游型
                <mu-icon right value="directions_bus"></mu-icon>
              </mu-button>
            </div>
            <div style="" class="ybyk fjk_1">
              <div style="" class="div_1">
                {{AT_dom.Automobile.Vehicle_type}}
              </div>
              <div class="div_2">
                {{AT_dom.Automobile.to}}<br />{{AT_dom.Automobile.to_place}}
              </div>
              <mu-icon size="36" value="redo"></mu-icon>
              <div class="div_2">
                {{AT_dom.Automobile.fo_place}}
              </div>
              <div class="div_1">
                ￥{{AT_dom.Automobile.price}}
              </div>
              <mu-button icon color="secondary" style="">
                <mu-icon value="assistant"></mu-icon>
              </mu-button>
            </div>
          </mu-expansion-panel>
        </div>
        <!-- 分割线---------------------------------------------------------- -->
        <mu-drawer :open.sync="open" :docked="docked" :left="position == 'left'">
          <mu-list style="padding: 0px;">
            <div :style="tx" class="center" @click="$router.push('/Personal')">
              <img :src="image_base" width="70px" height="70px" class="mu-elevation-1"
                style="border-radius: 100%;border: 2px solid #FFFFFF;margin-top: 30px;" />
            </div>
            <mu-list-item button :ripple="true" class="mu-elevation-1" style="width:95%;margin: 5px 2.5%;">
              <mu-list-item-action>
                <mu-icon value="star"></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>我的收藏</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button :ripple="true" class="mu-elevation-1" style="width:95%;margin: 5px 2.5%;">
              <mu-list-item-action>
                <mu-icon value="book"></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>说明</mu-list-item-title>
            </mu-list-item>
          </mu-list>
          <div
            style="position: fixed; bottom: 0px;width: 95%;height: 30px;display: flex;justify-content:space-around;margin:2.5%;">
            <mu-button style="height: 100%;line-height: 30px;width: 45%;" class="center blueyy">
              退出
              <mu-icon value="input" style="position: relative;left: 20px;"></mu-icon>
            </mu-button>
            <mu-button style="height: 100%;line-height: 30px;width: 45%;" class="center blueyy" @click="vuxn">
              <mu-icon value="rotate_90_degrees_ccw" style="position: relative;right: 20px;"></mu-icon>
              注销
            </mu-button>
          </div>
        </mu-drawer>
        <!-- 头部 -->
      </mu-ripple>

    </div>

  </div>
</template>

<script>
  import app from '../js/app.js';
  import bj from '../image/bj.jpg';
  import {
    axios_get,
    axios_post,
    axios_get_2
  } from '../js/axios.js';
  export default {
    data() {
      return {
        docked: false,
        open: false,
        position: 'left',
        tx: {
          width: '100%',
          height: '130px',
          background: 'url(' + bj + ') center',
          backgroundSize: '100% 100%'
        },
        shift: 'books',
        image_base: '',
        AT: {
          form: {
            city: '',
            content: ''
          },
          to: {
            city: '',
            content: ''
          },
          date: ''
        },
        AT_data: {

        },
        AT_dom: {

        },
        AT_ary_check: {
          Aircraft: false,
          Automobile: false,
          Train: false
        },
        DW_data: {},
        c: null
      }
    },
    methods: {
      AT_sub() {
        if (this.AT.form.city == '') {
          this.AT.form.city = this.AT.form.content;
        }
        if (this.AT.to.city == '') {
          this.AT.to.city = this.AT.to.content;
        }
        let loading = this.$loading();
        if (this.AT.form.city.length > 0 && this.AT.to.city.length > 0 && this.AT.date != undefined) {
          this.AT.date = new Date(this.AT.date).toLocaleDateString().replace(/\//g, '-')
          if (this.AT.to.city.indexOf('市') == this.AT.to.city.length - 1) { //双重检测的作用
            this.AT.to.city = this.AT.to.city.substr(0, this.AT.to.city.length - 1)
          }
          if (this.AT.form.city.indexOf('市') == this.AT.form.city.length - 1) {
            this.AT.form.city = this.AT.form.city.substr(0, this.AT.form.city.length - 1)
          }
          let form = {
            _id: JSON.parse(localStorage.getItem('user_id'))._id,
            from: this.AT.form.city,
            to: this.AT.to.city,
            date: this.AT.date
          }
          axios_get("Route", form, (result) => {
            if (result.data.result == 'err') {
              loading.close()
              this.$toast.error('无搜索结果,换个试试吧')
            } else {
              this.AT_data = result.data
              this.Soure_AT(loading)
            }
          });

        } else {
          loading.close()
          this.$toast.error('请将查询信息填全')
        }

      },
      Soure_AT(loading) { //整理返回来的数据
        let e_ = 1000,
          b_ = 1000,
          c_ = 1000,
          e_json = '',
          b_json = '',
          c_json = '';
        Object.keys(this.AT_data.AT_ary).filter(e => {
          if (e == 'Aircraft_data') {
            this.AT_data.AT_ary[e].forEach(item => {
              e_json = parseInt(item.Seat_price) < e_ ? item : e_json
              e_ = parseInt(item.Seat_price) < e_ ? parseInt(item.Seat_price) : e_
            })
          }
          if (e == 'Train_data') {
            this.AT_data.AT_ary[e].forEach(item => {
              item.Seat.forEach(b => {
                b_json = parseInt(b.Seat_price) < b_ ? item : b_json
                b_ = parseInt(b.Seat_price) < b_ ? parseInt(b.Seat_price) : b_
              });
            })
          }
          if (e == 'Automobile_data') {
            this.AT_data.AT_ary[e].forEach(item => {
              c_json = parseInt(item.price) < c_ ? item : c_json
              b_ = parseInt(item.price) < b_ ? parseInt(item.price) : b_
            })
          }
        })
        this.AT_dom['Aircraft'] = e_json;
        this.AT_dom['Train'] = b_json;
        this.AT_dom['Train'].Seat_price = b_;
        this.AT_dom['Automobile'] = c_json;
        console.log('AT_dom', this.AT_dom)
        this.AT_ary_check.Aircraft = this.AT_dom['Aircraft'] != '' ? true : false
        this.AT_ary_check.Train = this.AT_dom['Train'] != '' ? true : false
        this.AT_ary_check.Automobile = this.AT_dom['Automobile'] != '' ? true : false
        loading.close()
      },
      vuxn() {
        // 注销
        app.jzc(300);
        setTimeout(() => {
          this.$router.push('Login');
        }, 400);

      },
      map() {
        let ac = new BMap.Autocomplete( //建立一个自动完成的对象
          {
            "input": "suggestId"
          }
        );
        let ac2 = new BMap.Autocomplete( //建立一个自动完成的对象
          {
            "input": "suggestId2"
          }
        );
        let _this = this;
        ac2.addEventListener("onconfirm", function (e) { //鼠标点击关键字提示下拉列表后的事件
          const _value_2 = e.item.value
          _this.AT.to.content = _value_2.province + _value_2.city + _value_2.district + _value_2.street + _value_2
            .business; //拿到的地名
          if (_value_2.district.substr(_value_2.city.indexOf('市')) == _value_2.city.substr(_value_2.city.length - 1, _value_2.city.length) &&
            _value_2.district.substr(_value_2.district.indexOf('市')) != _value_2.district.substr(_value_2.district.length - 1, _value_2
              .district.length)) {
            console.log(1)
            _this.AT.to.city = _value_2.city.substr(0, _value_2.city.length - 1)
          } else if (_value_2.city.substr(_value_2.city.length - 1, _value_2.city.length) == _value_2.district
            .substr(_value_2.district.length - 1, _value_2.district.length)) {
            console.log(2)
            _this.AT.to.city = _value_2.city.substr(0, _value_2.city.length - 1)
          } else if (_value_2.district.substr(_value_2.district.indexOf('市')) == _value_2.district.substr(_value_2.district.length - 1,
              _value_2.district.length && _value_2.district.substr(_value_2.city.indexOf('市')) != _value_2.city.substr(_value_2.city.length -
                1,_value_2.city.length))) {
            console.log(3)
            _this.AT.to.city = _value_2.district.substr(0, _value_2.district.length - 1)
          } else {
            _this.AT.to.city = _value_2.city
          }
          console.log('_value_2', _value_2)
        });
        ac.addEventListener("onconfirm", function (e) { //鼠标点击关键字提示下拉列表后的事件
          const _value_1 = e.item.value
          _this.AT.form.content = _value_1.province + _value_1.city + _value_1.district + _value_1.street + _value_1
            .business; //拿到的地名
          if (_value_1.district.substr(_value_1.city.indexOf('市')) == _value_1.city.substr(_value_1.city.length - 1, _value_1.city.length) &&
            _value_1.district.substr(_value_1.district.indexOf('市')) != _value_1.district.substr(_value_1.district.length - 1, _value_1
              .district.length)) {
            console.log(1)
            _this.AT.form.city = _value_1.city.substr(0, _value_1.city.length - 1)
          } else if (_value_1.city.substr(_value_1.city.length - 1, _value_1.city.length) == _value_1.district
            .substr(_value_1.district.length - 1, _value_1.district.length)) {
            console.log(2)
            _this.AT.form.city = _value_1.city.substr(0, _value_1.city.length - 1)
          } else if (_value_1.district.substr(_value_1.district.indexOf('市')) == _value_1.district.substr(_value_1.district.length - 1,
              _value_1.district.length && _value_1.district.substr(_value_1.city.indexOf('市')) != _value_1.city.substr(_value_1.city.length -
                1,_value_1.city.length))) {
            console.log(3)
            _this.AT.form.city = _value_1.district.substr(0, _value_1.district.length - 1)
          } else {
            _this.AT.form.city = _value_1.city
          }
          console.log('_value_1', _value_1)
        });
      },
      getCurrentPosition: function () {
        let loading = this.$loading();
        //定位数据获取成功响应
        let _this=this;
        var onSuccess = function (position) {
          let position_ = {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
          }
          let th_is=_this;
          axios_get('api__apis', position_, (result) => {
          let str = result.data.substr(0, result.data.length)
          str = str.replace(/(\\)|(\/)|(\n)|(\r)/g, '')
          th_is.DW_data = JSON.parse(str)
          th_is.AT.form.content = th_is.DW_data.detail.poilist[0].addr
          th_is.AT.form.city = th_is.DW_data.detail.poilist[0].addr_info.c
          th_is.c = setInterval(() => {
            let tanr = document.getElementsByClassName('tangram-suggestion-main')
            for (let i in tanr) {
              if (tanr[i].style.display == 'block') {
                tanr[i].style.display = 'none'
                loading.close()
                clearInterval(th_is.c)
              }
            }
          }, 200)
        });
        };
        function onError(error) {
          loading.close()
          this.$toast.error('定位失败...')
        }
       navigator.geolocation.getCurrentPosition(onSuccess, onError);
      }
    },
    mounted() {
      this.image_base = JSON.parse(localStorage.getItem('user_id')).Head_Base64; //获取存储至本地的base64码置入image_base
      this.map()
      this.getCurrentPosition()
    },
    created() {


    }
  }

</script>

<style scoped>
  .fjk_1 {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #ff4081;
  }

  .div_1 {
    width: auto;
    display: flex;
    align-items: center;
    height: 100%;
    text-align: center;
  }

  .div_2 {
    width: auto;
    height: 100%;
    display: flex;
    align-items: center;
    text-align: center;
  }

  .span_1 {
    height: 50%;
    text-align: center;
  }

  .mu-flat-button {
    min-width: auto;
  }

  .mu-ripple-demo {
    position: relative;
    width: auto;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0px;
    background-color: #fff;
    border-radius: 4px;
  }

  .mu-appbar-title {
    /*标题居中*/
    text-align: center;
    font-size: 17px;
    display: flex;
    justify-content: center;
    align-items: center
  }

  .material-icons {
    font-size: 20px;
  }

  .mu-ripple-wrapper {
    display: flex;
    justify-content: center;
  }

  .mu-button-wrapper {
    align-items: initial;
  }

  .material-icons {
    line-height: inherit;
  }

  .row {
    padding: 10px 2px;
    margin: 0px;
    box-sizing: border-box
  }

</style>
