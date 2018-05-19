<template>
  <transition name="slide">
    <music-list :rank="rank" :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {getMusicList} from 'api/rank'
  import {ERR_OK} from 'api/config'
  import {mapGetters} from 'vuex'
   import {getMusic} from 'api/song.js'
  import {createSong} from 'common/js/song'

   export default {
    data() {
      return {
        songs: [],
        rank: true
      }
    },
    components: {
      MusicList
    },
    computed: {
      ...mapGetters([
        'topList'
      ]),
      title() {
        return this.topList.topTitle
      },
      bgImage() {
        if (this.songs.length) {
          return this.songs[0].image
        }
        return ''
      }
    },
    created() {
      this._getMusicList()
    },
    methods: {
      _getMusicList() {
        if (!this.topList.id) {
          this.$router.push('/rank')
          return
        }
        getMusicList(this.topList.id).then(res => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeList(res.songlist)
            // console.log("排行榜详细列表",this.songs)
          }
        })
      },
      _normalizeList(list) {
        let ret = []
        list.forEach((item) => {
          const musicData = item.data
          if (musicData.songid && musicData.albummid) {
             getMusic(musicData.songmid).then((res) => {
            if(res.code === ERR_OK) {
              const svkey = res.data.items
              // // console.log('svkey', svkey)
              const songVkey = svkey[0].vkey
              // // console.log('songVkey', songVkey)
              const newSong = createSong(musicData, songVkey)
              ret.push(newSong)
            } else {
              console.log('获取失败咯')
            }
                      // ret.push(createSong(musicData))
          })
          }
        })
        return ret
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>