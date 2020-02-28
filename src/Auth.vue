<template>
  <div id="auth">
    <component :is="currentForm"></component>
    <MyFooter @islog="displayLogin($event)"/>
    <h3>{{isLog?"Авторизируйтесь":"Зарегистрируйтесь"}}</h3>
    <LoginForm v-if="isLog" :isDisplayed="isLog"/>
    <RegForm v-else/>
  </div>
</template>

<script>
import MyFooter from './components/MyFooter/MyFooter.vue';
import MyHeader from './components/MyHeader/MyHeader.vue';
import LoginForm from './components/LoginForm/LoginForm.vue';
import RegForm from './components/RegForm/RegForm.vue';
export default {
  name: 'auth',
  components: {
    MyFooter, 
    LoginForm, 
    RegForm,
    MyHeader
  },
  props: [],
  data () {
    return {
      isLog:true
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    displayLogin(x){
      this.isLog = x;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  margin: 0px;
  padding: 0px;
}
h1{
  margin-bottom: px;
}
</style>
