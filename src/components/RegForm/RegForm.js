import axios from "axios";
export default {
  name: 'reg-form',
  components: {},
  props: [],
  data () {
    return {
      login:"",
      password:"",
      passwordConfirmed:"",
      isError:false,
      messageError:""
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    validateForm: function(){
      if(!/^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{0,19}$/.test(this.login)){
        this.messageError = "Введите нормальный логин";
        this.isError = true;
        return;
      }
      if(this.password!==this.passwordConfirmed){
        this.messageError = "Пароль не совпадает";
        this.isError = true;
        return;
      }
      this.messageError="";
      //window.location.replace('home.html');
      const instance = axios.create({baseURL: this.$store.state.url})
      instance.post('/reg',{'login':this.login, 'password':this.password}).then(
        (response)=>{
          if(response.data===200){
            this.$store.commit('setL', this.login);
            localStorage.setItem('name',this.login);
            this.$router.push('/main');
            // document.globlog = "";
            // //window.location.replace('home.html');
          }else{
            this.messageError = "Данный логин уже занят";
            this.isError = true;
          }
        },
        ()=>{
          this.messageError = "Повторите попытку потом";
          this.isError = true;
        }
      )
    },
  }
}


