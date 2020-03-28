<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="search"  v-on:keyup="fetchImages" v-model="term">

    <b-container class="bv-example-row">
      <b-row v-for="row in formattedimages" v-bind:key="row">
        <b-col cols v-for="image in row" v-bind:key="image">
          <img :src="image.links[0].href" width="100" height="100">
        </b-col>
      </b-row>
    </b-container>
    <b-pagination
            :change="changePagination"
            :input ="updatePage(currentPage)"
            v-if="images.length"
            v-model="currentPage"
            :total-rows="images.length"
            :per-page="perPage"
            aria-controls="my-table"
    ></b-pagination>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      perPage: 3,
      currentPage: 1,
      term: '',
      imageEndPoint: 'https://images-api.nasa.gov/search',
      images : {},
      formattedimages : {},
      links: {}
    }
  },
  computed: {
    //
  },
  methods: {
    fetchImages: function(event) {
      let term = event.target.value;
      this.axios.get(this.imageEndPoint+'?q='+term).then((response) => {
        this.images = response.data.collection.items;
        this.links = response.data.collection.links;
        this.formattedImages();
      })
    },
    formattedImages: function() {
      this.formattedimages = this.images.reduce((c, n, i) => {
        if (i % 2 === 0) c.push([]);
        c[c.length - 1].push(n);
        return c;
      }, []);
    },
    changePagination(page) {
      console.log(page);
    },
    updatePage(page) {
      console.log(page);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
