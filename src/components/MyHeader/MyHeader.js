
export default {
  name: 'my-header',
  components: {},
  props: [],
  data () {
    return {

    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    exit: function(){
      this.$store.commit('setL', '');
      localStorage.setItem('name','')
      this.$router.push('/');
    }
  }
}


