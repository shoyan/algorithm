// spanで囲むサンプル
// let sampleData = [
//   {
//     id: 1,
//     text: "不良品",
//     start: 62,
//     end: 65
//   },
//   {
//     id: 5,
//     text: "返品",
//     start: 100,
//     end: 102
//   },
//   {
//     id: 3,
//     text: "不良品や店側の手違いで",
//     start: 62,
//     end: 72
//   },
//   {
//     id: 2,
//     text: "返品",
//     start: 100,
//     end: 102
//   },
//   {
//     id: 4,
//     text: "店側の手違い",
//     start: 74,
//     end: 80
//   }
// ];

// const sampleData = [
//   { end: 102, start: 100, イイネ数: 0, メモ内容: "返品", ユーザID: "vrZw9HQ50cdysAeSHFsn04Hu5Dy2" },
//   { end: 65, start: 62, イイネ数: 0, メモ内容: "最初から壊れていた、欠品していた等", ユーザID: "vrZw9HQ50cdysAeSHFsn04Hu5Dy2" },
//   { end: 61, start: 34, イイネ数: 0, メモ内容: "物を扱う以上そうすんなり終わる事ばかりでもありません。", ユーザID: "vrZw9HQ50cdysAeSHFsn04Hu5Dy2" },
//   { end: 50, start: 42, イイネ数: 0, メモ内容: "すんなり終わる事", ユーザID: "vrZw9HQ50cdysAeSHFsn04Hu5Dy2" },
//   { end: 72, start: 66, イイネ数: 0, メモ内容: "納期を間違えた、数を間違えた等", ユーザID: "vrZw9HQ50cdysAeSHFsn04Hu5Dy2" },
//   { end: 70, start: 66, イイネ数: 0, メモ内容: "納期を間違えた", ユーザID: "vrZw9HQ50cdysAeSHFsn04Hu5Dy2" },
//   { end: 70, start: 65, イイネ数: 0, メモ内容: "★納期を間違えた", ユーザID: "vrZw9HQ50cdysAeSHFsn04Hu5Dy2" },
// ];
const sampleData = [
  { end: 3, start: 1, イイネ数: 0, メモ内容: "返品", ユーザID: "vrZw9HQ50cdysAeSHFsn04Hu5Dy2" },
  { end: 4, start: 1, イイネ数: 0, メモ内容: "最初から壊れていた、欠品していた等", ユーザID: "vrZw9HQ50cdysAeSHFsn04Hu5Dy2" },
  { end: 5, start: 1, イイネ数: 0, メモ内容: "物を扱う以上そうすんなり終わる事ばかりでもありません。", ユーザID: "vrZw9HQ50cdysAeSHFsn04Hu5Dy2" },
  { end: 6, start: 1, イイネ数: 0, メモ内容: "すんなり終わる事", ユーザID: "vrZw9HQ50cdysAeSHFsn04Hu5Dy2" },
  { end: 5, start: 2, イイネ数: 0, メモ内容: "納期を間違えた、数を間違えた等", ユーザID: "vrZw9HQ50cdysAeSHFsn04Hu5Dy2" },
  { end: 6, start: 2, イイネ数: 0, メモ内容: "納期を間違えた", ユーザID: "vrZw9HQ50cdysAeSHFsn04Hu5Dy2" },
  { end: 7, start: 3, イイネ数: 0, メモ内容: "★納期を間違えた", ユーザID: "vrZw9HQ50cdysAeSHFsn04Hu5Dy2" },
];
// 包括関係順にソートする関数
// 挿入ソートアルゴリズムで実装
function memo_sort(_data) {
  let data = Object.assign([], _data) 
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
  return data
}

// ソート関数
// ORDER BY start ASC, end DESC
function memo_sort2(_data) {
  let data = Object.assign([], _data) 
  //未整列の部分から値を１つずつ取り出すfor文
  for (var i = 1; i < data.length; i++) {
    //「挿入する値」を変数に一時保存する
    let tmp = data[i];

    //「整列済みの部分」のどこに挿入すれば良いか後ろから前に向かって順番に判断する
    for (var j = i - 1; j >= 0; j--) {
      //「挿入する値」が大きい場合、調べた値を１つ後ろへずらす
      if(data[j].start >= tmp.start){
        data[j + 1] = data[j]
      } else {
        //小さくなければ、ずらす処理を止める
        break;
      }
    }
    //ずらす処理が終わったところに「挿入する値」を入れる
    data[j + 1] = tmp;
  }

  for (var i = 1; i < data.length; i++) {
    //「挿入する値」を変数に一時保存する
    let tmp = data[i];

    //「整列済みの部分」のどこに挿入すれば良いか後ろから前に向かって順番に判断する
    for (var j = i - 1; j >= 0; j--) {
      //「挿入する値」が大きい場合、調べた値を１つ後ろへずらす
      if(data[j].start === tmp.start && data[j].end <= tmp.end){
        data[j + 1] = data[j]
      } else {
        //小さくなければ、ずらす処理を止める
        break;
      }
    }
    //ずらす処理が終わったところに「挿入する値」を入れる
    data[j + 1] = tmp;
  }
  return data
}

console.log(1, sampleData)
console.log(2, memo_sort2(sampleData))
// console.log(3, sort2(sampleData))

function getData() {
  return sampleData
  // return sort(sampleData)
}
