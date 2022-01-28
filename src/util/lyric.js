class LyricItem {
  constructor(time, text) {
    this.time = time
    this.text = text
  }
}

export default class Lyrics {
  constructor(text = "") {
    let arr = text.split("\n");
    let row = arr.length; //获取歌词行数
    this.lyric = []
    for (let i = 0; i < row; i++) {
      let temp_row = arr[i];
      let temp_arr = temp_row.split("]");
      let text = temp_arr.pop(); 
      temp_arr.forEach(element => {
        let time_arr = element.slice(1, element.length).split(":");
        let time = parseInt(time_arr[0]) * 60 + Math.ceil(time_arr[1]);
        this.lyric.push(new LyricItem(time, text));
      });
    }
    this.lyric.sort(this.sortRule);
  }

  sortRule(a, b) { //设置一下排序规则
    return a.time - b.time;
  }

  getIndex(time) {
    for(let i = 0; i < this.lyric.length; i++) {
      if(time < this.lyric[i].time)
        return i - 1
    }
    return this.lyric.length - 1;
  }
}
