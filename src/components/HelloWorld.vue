<template>
  <div>
    <h1>{{ msg }}</h1>
    <div>
      <b-tabs content-class="mt-3" align="center">
        <b-tab title="Image" active>
          <input type="search"  v-on:keyup="fetchImages" v-model="term">
          <div class="row">
            <div v-for="image in pageOfImages" :key="image.id" class="column" @click="previewImage"><a href="javascript:void(0)" data-toggle="modal" data-target="#myModal"><img :src="image.links[0].href" :name="image.data[0].nasa_id" :alt="image.data[0].description" :title="image.data[0].title" width="100" height="100"></a></div>
          </div>
          <!-- Modal -->
          <b-modal id="image-modal" :title="modalImageTitle" hide-footer>
            <img :src="modalImageHref" width="465" >
            <p>{{ modalImageDescription }}</p>
            <p>Id: {{ modalImageId }}</p>
          </b-modal>
          <div class="card-footer pb-0 pt-3">
            <jw-pagination :items="images" @changePage="onChangePage"></jw-pagination>
          </div>
        </b-tab>
        <b-tab title="Graph">
          <div align="center">
            <line-chart
                    v-if="loaded"
                    :chartdata="chartdata"
                    :options="options"/>
          </div>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
  import LineChart from './Chart.vue'
  export default {
    components: { LineChart },
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
      marsEndPoint: 'https://api.nasa.gov/insight_weather/?api_key=DDz14KZjytRMwXmLi6JAz1mguDV0zcqCSs6QksTZ&feedtype=json&ver=1.0',
      images : {},
      links: {},
      pageOfImages: {},
      modalImageHref: '',
      modalImageTitle: '',
      modalImageId: '',
      modalImageDescription: '',
      loaded: false,
      chartdata: {
        labels: [],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 20, 45, 40, 20, 45, 40, 20, 45, 66, 70]
          }
        ]
      }
    }
  },
  computed: {
    //
  },
    async mounted () {
      this.loaded = false
      try {
        await this.axios.get(this.marsEndPoint).then((response) => {
          this.chartdata.labels = response.data.sol_keys
          var formatted = [];
          console.log(this.chartdata.labels.length);
          for (var i = 0; i < this.chartdata.labels.length; i++) {
            if (response.data[this.chartdata.labels[i]]){
              formatted.push({ label: this.chartdata.labels[i], backgroundColor: '#f87979', data : [response.data[this.chartdata.labels[i]].AT['mn'], response.data[this.chartdata.labels[i]].AT['mx']]});
            }
          }
          console.log(formatted);
          this.chartdata.datasets = formatted
          this.loaded = true
        })
      } catch (e) {
        console.error(e)
      }
    },
  methods: {
    onChangePage(pageOfImages) {
      this.pageOfImages = pageOfImages;
    },
    fetchImages: function(event) {
      let term = event.target.value;
      this.axios.get(this.imageEndPoint+'?q='+term).then((response) => {
        this.images = response.data.collection.items;
        this.links = response.data.collection.links;
      })
    },
    previewImage: function (event) {
      this.modalImageHref = event.target.src;
      this.modalImageTitle = event.target.title;
      this.modalImageId = event.target.name;
      this.modalImageDescription = event.target.alt;
      this.$bvModal.show('image-modal');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  * {
    box-sizing: border-box;
  }

  .column {
    float: left;
    width: 50%;
    padding: 5px;
  }

  /* Clearfix (clear floats) */
  .row::after {
    content: "";
    clear: both;
    display: table;
  }
  .small {
    height: 200px;
    width: 50%;
    background-color: powderblue;
  }
</style>
