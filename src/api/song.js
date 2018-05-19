import {commonParams} from './config'
import axios from 'axios'

export function getLyric(mid) {
  const url = '/api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getMusic(mid) {
  const url = '/api/music'
  const data = Object.assign({}, {

    g_tk: 2055263323,
    loginUin: 1152579039,
    hostUin: 0,
    format:'json',
    inCharset:'utf8',
    outCharset:'utf-8',
    notice: 0,
    platform:'yqq',
    needNewCode:0,
    cid: 205361747,
    uin: 1152579039,
    songmid:mid,
    filename: 'C400' + mid + '.m4a',
    guid: 3636738193
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}