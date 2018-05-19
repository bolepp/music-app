<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {getSingerDetail} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import {getMusic} from 'api/song.js'
  import {createSong} from 'common/js/song'
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.avatar
      },
      ...mapGetters([
        'singer'
      ])
    },
    data() {
      return {
        songs: []
      }
    },
    created() {
      this._getDetail()
    },
    methods: {
      _getDetail() {
        if (!this.singer.id) {
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.id).then((res) => {           
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.data.list)
          }
        })
      },
         _normalizeSongs(list) {
          let ret = []
          const newSong = ''
          list.forEach((item, index) => {
            let { musicData } = item // 对象  结构赋值
            if (musicData.songid && musicData.albummid) {
              // console.log('准备进入')
              getMusic(musicData.songmid).then((res) => {
                if(res.code === ERR_OK) {
                  const svkey = res.data.items
                  // // console.log('svkey', svkey)
                  const songVkey = svkey[0].vkey
                  // // console.log('songVkey', songVkey)
                  const newSong = createSong(musicData, songVkey)
                  ret.push(newSong)
                }
              })
              // ret.push(createSong(musicData))
              // ret.push(newSong)          
            }
          })
          return ret
        }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>