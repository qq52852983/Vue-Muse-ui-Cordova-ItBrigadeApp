<template>
	<div id="app">
		<mu-appbar style="width: 100%;margin:0px;text-align: left;" color="primary">
			<mu-button icon slot="left" onclick="history.back()">
				<mu-icon value="reply"></mu-icon>
			</mu-button>
			<span style="position:absolute;left: 50%;transform: translate(-50%,0%);">个人资料</span>
      <mu-button icon slot="right" @click="Per_sub()">
				<mu-icon value="check"></mu-icon>
			</mu-button>
		</mu-appbar>
    <mu-container>
		<mu-form :model="form" class="mu-demo-form" label-position="right" label-width="100%">
			<div style="width: 100%;height: 30%;align-items: center;margin-top:10px" class="center">
				<img :src="form.Head_Base64" width="100px" height="100px" class="ybyk yrqr" onclick="document.getElementById('Head_Base').click()" />
			</div>
			<mu-text-field v-model="form.User_name" label="用户名" disabled label-float full-width >
			</mu-text-field>
			<mu-text-field v-model="form.Nickname" full-width placeholder="昵称" :max-length="10"  help-text="昵称为1-10位字符">
			</mu-text-field>
			<mu-text-field v-model="form.Cell" type="number" full-width  placeholder="电话号码" onkeyup="value=this.value.substr(0,11)"
       help-text="电话号码为11位数字"></mu-text-field>
       <div style="margin-bottom:15px;margin-top:5px">
                <mu-radio v-model="form.Gender" value="男" label="Man" style="color:#2196f3"></mu-radio>
                <mu-radio v-model="form.Gender" value="女" label="Girl" style="color:rgba(255,20,147,1)"></mu-radio>
              </div>
                <mu-date-input style="margin-top:-25px;" v-model="form.Birthday" label="生日" container="dialog"
                  label-float full-width onfocus="this.blur()">
                </mu-date-input>
                <mu-text-field label="所在地" style="margin-top:-15px;" full-width onfocus="this.blur()" v-model="form.Location"
                  @click="dq(2)">
                </mu-text-field>
                <mu-select label="喜好" multiple chips v-model="form.Hobby" full-width>
                <mu-option v-for="Hobby,index in Hobby" :key="Hobby" :label="Hobby" :value="Hobby"></mu-option>
              </mu-select>
		</mu-form>
    </mu-container>
		<input @change="fileImage" type="file" accept="image/jpeg,image/x-png,image/gif" id="Head_Base" value="" />
    <!-- 装地区层的 -->
    <mu-fade-transition>
      <div style="width:100%;height: 100vh;position: absolute;z-index: 20000;top:0px" v-show="dqshow">
        <div style="width:100%;height: 100vh;position: absolute;z-index: 19998;background: rgba(0,0,0,0.3);" @click="dqshow=false"
          v-if="dqshow">

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
          <mu-slide-picker :slots="addressSlots" :visible-item-count="7" @change="addressChange" :values="form.Location">
          </mu-slide-picker>
        </div>
      </div>
    </mu-fade-transition>
	</div>
</template>

<script>
  import load_w from '../image/load_w.png'
  import {axios_get,axios_post} from '../js/axios.js';
  import Hobby from '../js/Hobby.js';
  import address from '../js/city.js';
	export default {
		data() {
			return {
				form: {
          Head_Base64:load_w,
        },
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
        dqshow:false,
        Hobby:Hobby
			}
		},
		methods: {
      Per_sub(){
        let loading=this.$loading()
        let is_null=true;
        Object.keys(this.form).filter((x)=>{
          if(this.form[x]==''){
              is_null=false;
          }
        })
        if(!is_null){loading.close();this.$toast.error('请将信息填全');}
        let form=this.form;
        form.Location=form.Location[0]+","+form.Location[1]
        form.Birthday = new Date(form.Birthday).toLocaleDateString()
        axios_post('api_User_Updata',form,(result)=>{
           if(result.data.data.n>0){
             loading.close()
            this.$toast.success('修改成功');
            localStorage.setItem('user_id',JSON.stringify(this.form))
            this.$router.push('/PageHome')
           }
        })
      },
			fileImage(e) {
				let reader = new FileReader();
				reader.readAsDataURL(e.target.files[0])
				reader.onloadend = () => {
					this.form.Head_Base64 = reader.result;
				}
			},
			Read_Per() {
        let loading=this.$loading();
				let user_id = JSON.parse(localStorage.getItem('user_id'))._id
				axios_get('api_User',{_id:user_id},(result)=>{
					if(result.data.data.length>0){
            this.form=result.data.data[0]
            this.form.Birthday=new Date(this.form.Birthday)
            this.form.Location=this.form.Location.split(',')
            console.log(this.form)
            loading.close()
					}
        })
      },
      addressChange(value, index) { //地区选择FN
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
        this.form.Location = [this.addressProvince, this.addressCity]
      },
      // 开关地区图层
      dq(a) {
        if (a == 1) {
          this.dqshow = false;
        } else {
          this.dqshow = true;
        }
      },
		},
		mounted() {
			
		},
		created() {
			this.Read_Per();
    },
    watch:{
    }

	}
</script>
<style scoped>
	#app {
		height: 100%;
		width: 100%;
		box-sizing: border-box;
		background: rgba(red, green, blue, 0.3);
	}
	
	.mu-demo-form {
		box-sizing: border-box;
		padding: 0px 10px
	}
	
	.mu-input.has-label {
		margin-bottom: 0px
	}
	
	#Head_Base {
		opacity: 0;
		position: absolute;
		top: -50px
	}
</style>