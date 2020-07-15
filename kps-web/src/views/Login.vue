<template>
    <div class="login-div">
      <div class="login-box">
        <Form ref="formRef" :model="formData" :rules="formRule" :label-width="80">
          <FormItem label="用户名" prop="username">
            <Input type="text" v-model="formData.username">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem label="密码" prop="password">
            <Input type="password" v-model="formData.password">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem label="验证码" prop="identifyingCode">
            <Input type="text" v-model="formData.identifyingCode" class="identifyingCode">
              <Icon type="md-images" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <div>
            <Button type="primary" @click="handleSubmit('formRef')">Submit</Button>
            <Button @click="handleReset('formRef')" style="margin-left: 8px">Reset</Button></div>
        </Form>
      </div>
    </div>
</template>

<script>
  import {login} from "../api/user/user.api"

    export default {
        name: "Login",
        data(){
          return {
            formData:{
              "username":"",
              "password":"",
              "identifyingCode":""
            },
            formRule: {
              username: [
                { required: true, message: 'The username cannot be empty', trigger: 'blur' }
              ],
              password: [
                { required: true, message: 'The password cannot be empty', trigger: 'blur' }
              ],
              identifyingCode: [
                { required: true, message: 'The identifyingCode cannot be empty', trigger: 'blur' }
              ],
            }
          }
        },
      methods:{
        handleSubmit(name){
          this.$refs[name].validate((valid) => {
            if (valid) {
              login(this.formData).then(res=>{
                this.$Message.success('Success!');
                this.$refs[name].resetFields();
                this.$router.push({
                  path: "/home"
                })
              }).catch(err=>{
                this.$Message.error('err!');
              })
            } else {
              this.$Message.error('Fail!');
            }
          })
        },
        handleReset(name){
          this.$refs[name].resetFields();
        }
      }
    }
</script>

<style scoped>
  .login-div{

  }
  .login-box{
    border: 1px solid black;
    border-radius: 5px;
    width: 350px;
    height: 200px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .identifyingCode{
    width: 70%;
  }
</style>
