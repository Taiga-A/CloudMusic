class LyricItem {
  constructor(time, text, fy = "") {
    this.time = time
    this.text = text
    this.fy = fy
  }
}

export default class Lyrics {
  constructor(text = "", fy = "") {
    if(text == "")
      text = "[99:00.0]纯音乐，请欣赏"
      
    let txt_arr = text.split("\n");
    let fy_arr = fy.split("\n")

    this.lyric = []
    this.haveFy = (fy != "")

    for (let i = 0; i < txt_arr.length; i++) {
      let temp_row = txt_arr[i];
      let temp_arr = temp_row.split("]");
      let text = temp_arr.pop();
      temp_arr.forEach(element => {
        let time_arr = element.slice(1, element.length).split(":");
        let time = parseInt(time_arr[0]) * 60 + parseFloat(time_arr[1]);
        this.lyric.push(new LyricItem(time, text));
      });
    }

    for (let i = 0; i < fy_arr.length; i++) {
      if (!/^\[[0-9]{2}:[0-9]{1,}\.[0-9]{1,}\]/.test(fy_arr[i]))
        continue;
      let temp_row = fy_arr[i];
      let temp_arr = temp_row.split("]");
      let text = temp_arr.pop();
      temp_arr.forEach(element => {
        let time_arr = element.slice(1, element.length).split(":");
        let time = parseInt(time_arr[0]) * 60 + parseFloat(time_arr[1]);
        for(let j = 0; j < this.lyric.length; j++) {
          if(this.lyric[j].time == time)
            this.lyric[j].fy = text
        }
      });
    }


    this.lyric.sort(this.sortRule);
  }

  sortRule(a, b) { //设置一下排序规则
    return a.time - b.time;
  }

  getIndex(time) {
    for (let i = 0; i < this.lyric.length; i++) {
      if (time < this.lyric[i].time)
        return i - 1
    }
    return this.lyric.length - 1;
  }
}