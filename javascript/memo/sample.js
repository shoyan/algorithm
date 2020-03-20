// spanで囲むサンプル
let sampleData = [
  {
    id: 1,
    text: "Elm",
    start: 0,
    end: 3
  },
  {
    id: 3,
    text: "Elm は JavaScript にコンパイルできる関数型プログラミング言語",
    start: 0,
    end: 38
  },
  {
    id: 2,
    text: "JavaScript",
    start: 6,
    end: 15
  },
];

// 包括関係順にソートする関数
// 挿入ソートアルゴリズムで実装
function sort(data) {
  //未整列の部分から値を１つずつ取り出すfor文
  for (var i = 1; i < data.length; i++) {
    //「挿入する値」を変数に一時保存する
    let tmp = data[i];

    //「整列済みの部分」のどこに挿入すれば良いか後ろから前に向かって順番に判断する
    for (var j = i - 1; j >= 0; j--) {
      //「挿入する値」が小さい場合、調べた値を１つ後ろへずらす
      if(data[j].start <= tmp.start && data[j].end >= tmp.end){
        data[j + 1] = data[j]
      } else {
        //小さくなければ、ずらす処理を止める
        break;
      }
    }
    //ずらす処理が終わったところに「挿入する値」を入れる
    data[j + 1] = tmp;
  }
  return data.reverse()
}

function getData() {
  return sort(sampleData)
}
