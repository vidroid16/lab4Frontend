
export default {
  name: 'points-history',
  components: {},
  props: [],
  data () {
    return {
      history: this.$store.state.history
    }
  },
  mounted(){
    this.history = [];
    this.history = this.$store.state.history;
    //this.history.reverse();
  },
  computed: {

  },
  methods: {
    
  }
}


