import axios from "axios"
export default {
  name: 'input-form',
  components: {},
  props: [],
  data () {
    return {
      error:''
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    check:function(){
      let x = document.querySelector('input[name="xvue"]:checked');
      let r = document.querySelector('input[name="rvue"]:checked');
      let y = document.getElementById('Y');
      //let output = document.getElementById("invalid_data");
      let vars =[];

      if (x === null) vars.push("X");
      if (y === null || y.value === "") vars.push("Y");
      if (r === null) vars.push("R");
      if (x === null || y.value==='' || r===null){
        if (vars.length !== 0) this.error =  'Значения ' + vars.join(', ') + ' не инициализированы';
      }else{
        if (/^(2.9+)$/.test(y)) {
          y = 2.9999;
        } else if (/^-4.9+$/.test(y)) {
          y = -4.9999;
        }
        if (isNaN(Number(y.value))) this.error = 'Значение Y должно быть числом';
        if ((y.value > 5 || y.value < -5)) this.error = 'Значение Y должно быть в промежутке (-5; 5)';
      }
      
      document.getElementById('errvue').innerHTML = this.error;
      if(this.error === ''){
        this.$store.commit("setR", r.value);
        this.send(x.value,y.value);
      }
      this.error="";

    },
    send:function(x,y){
      console.log(this.$store.state.radius);
      const instance = axios.create({baseURL: this.$store.state.url})
      instance.post('/check', {'x':x, 'y':y, 'r':this.$store.state.radius, 'login':this.$store.state.gllog, "isIn":true}).then(
        (response)=>{
          let point = response.data;
          this.$store.commit('addPoint', point);
          this.redrawEmit();
        })
    },
    redrawEmit: function(){
      this.$emit('redrawEmit');
    },
    redrawEmitR: function(){
      this.$store.commit('setR', document.querySelector('input[name="rvue"]:checked').value)
      this.$emit('redrawEmit');
    }
  }
}


