
export default {
  name: 'my-footer',
  components: {},
  props: {
    isLog: true
  },
  data () {
    return {
      
    }
  },
  computed: {
    
  },
  mounted () {

  },
  methods: {
    displayLogin: function(){
      this.$emit('islog',true);
      //this.isLog = true;
    },
    undisplayLogin: function(){
      this.$emit('islog',false);
      //this.isLog = false; 
    }
  }
}


