import axios from 'axios'
export default {
  name: 'my-canvas',
  components: {},
  props:['isRedraw'],
  watch:{
    isRedraw(){
      this.redraw();
    }
  },
  data () {
    return {  
      isLRedraw:this.isRedraw
    }
  },
  computed: {

  },
  created(){
      
  },
  mounted: function() {
    console.log("sSSSSSssSSSSssSSSSsssssSSSsssssSSSSSsss");
    this.$store.commit('clearHistory');
    const instance = axios.create({baseURL: this.$store.state.url})
        instance.post('/userpointsgetter', this.$store.state.gllog).then(
          (response)=>{
            let point = response.data;
            point.forEach((p)=>{
              this.$store.commit('addPoint', p);
            })
            this.redraw();
          })
  },
  beforeDestroy() {
    this.$bus.$off('redrawEmit')
  },
  methods: {
    getServerX(x, a, r){
      //let x_server = (A/a)*((x-0.5*a)/(R/r));
      let x_server = ((x-0.5*a)/(80/r));
      x_server = x_server.toFixed(4);
      //console.log("x-server: " + x_server);
      return x_server;
    },
    getServerY(y, a, r){
      let y_server = -(222/a)*((y-0.5*a)/(80/r));
      y_server = y_server.toFixed(4);
      //console.log("y_server: " + y_server);
      return y_server;
    },
  
    getClientX(x, a, r){
      let x_client = ((x* (80/r)+0.5 * 222));
      x_client = x_client.toFixed(4);
      //console.log("x_client: " + x_client);
      return x_client;
    },
    getClientY(y, a, r){
      let y_client = -((y* (80/r)-0.5 * 222));
      y_client = y_client.toFixed(4);
      //console.log("y_client: " + y_client);
      return y_client;
    },
    prepareCanvas(e){
      //let h = document.getElementById("my-canvas").offsetHeight;
      //let w = document.getElementById("my-canvas").offsetWidth;
      let x = e.pageX - e.target.offsetLeft;
      let y = e.pageY - e.target.offsetTop;
      let r = this.$store.state.radius;

      let x_server = this.getServerX(x, 222, r);
      let y_server = this.getServerY(y, 222, r);
      //console.log(x_server);
      if(y_server>-5 && x_server<5){
        const instance = axios.create({baseURL: this.$store.state.url})
        instance.post('/check', {'x':x_server, 'y':y_server, 'r':this.$store.state.radius, 'login':this.$store.state.gllog, "isIn":true}).then(
          (response)=>{
            let point = response.data;
            this.$store.commit('addPoint', point);
            this.redraw();
          })
      }else{
          let output = document.getElementById("invalid_data");
          output.innerHTML = "Y должен быть в диапазоне (-5;5)";
      }
    },
    redraw(){
      let history = this.$store.state.history;
      let r = this.$store.state.radius;
      document.getElementById("my-canvas").getContext("2d").clearRect(0, 0, 222, 222);
      history.forEach((p)=>{
          let h = document.getElementById("my-canvas").offsetHeight;
          let xClient = this.getClientX(parseFloat(p.x), h, r);
          let yClient = this.getClientY(parseFloat(p.y), h, r);
          let canvas = document.getElementById("my-canvas");
          let context = canvas.getContext("2d");
          //console.log("X= " + p.x + ", Y= " + p.y+ ", R=" + p.r +"\n");
          context.beginPath();
          if(parseFloat(r) != parseFloat(p.r)){
              context.strokeStyle = 'black';
              context.fillStyle = 'black';
          }else{
              if(p.isIn==="true" || p.in===true){
                  context.strokeStyle = 'green';
                  context.fillStyle = 'green';
              }else{
                  context.strokeStyle = 'red';
                  context.fillStyle = 'red';
              }
          }


          context.arc(xClient, yClient, 1.5, 0, 2 * Math.PI);
          context.closePath();
          context.fill();
          context.stroke();
          this.isLRedraw = false;
      });
    }
  }
}


