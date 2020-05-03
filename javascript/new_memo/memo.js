firebase.initializeApp({
  apiKey: "AIzaSyBgmke1S6n1nKQZ0Ez6kJ85o3PEOklyKbI",
  authDomain: "qualification-master.firebaseapp.com",
  databaseURL: "https://qualification-master.firebaseio.com",
  projectId: "qualification-master",
  storageBucket: "qualification-master.appspot.com",
  messagingSenderId: "733843168310",
  appId: "1:733843168310:web:1aa23bde7d4373dd"
});

document.body.addEventListener("click", function (e) {
  document.getElementById("contextmenu").style.display = "none";
});
 
var db = firebase.firestore();

var create_fusen;

var user;

function login() {
  var email = "mathgamer.net@gmail.com";
  var password = "dsa9z45re7";
  firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
    location.reload()
  }).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    var errorMessage = ERROR_MESSAGE[errorCode] || ERROR_MESSAGE["auth/other"]
    document.getElementById("error-message").innerHTML = errorMessage;
  });
}

function logout() {
  firebase.auth().signOut().then(function () {
    alert("ログアウトしました。")
    location.reload()
  }).catch(function (error) {
    alert("エラーが発生しました。")
  });
}

firebase.auth().onAuthStateChanged(function (_user) {
  if (_user) {
    user = _user
  } else {
    alert("ログインしていません。ログインボタンを押してください！")
  }
});


    function customMenu(e) {
      const selectedText = start()
      if (selectedText) {
        document.getElementById("contextmenu").style.left = e.pageX + "px";
        document.getElementById("contextmenu").style.top = e.pageY + "px";
        document.getElementById("contextmenu").style.display = "block";
        // 右クリックのイベントを止める
        e.preventDefault()
      }
    }

    function menu1() {
      if (user) {
        const selectedText = document.getSelection().toString();
        document.getElementById("selectedText").value = selectedText;
        document.getElementById("contextmenu").getClientRects()[0].left;
        console.log(document.getElementById("contextmenu").getClientRects());
        contextmenu = document.getElementById("contextmenu").getClientRects()[0];

        document.getElementById("memoarea").style.left = contextmenu.left + "px";
        document.getElementById("memoarea").style.top = contextmenu.top + "px";
        document.getElementById("memoarea").style.display = "block";
      } else {
        alert("ログインしないとメモは書き込めません");
      }
    }
    function menu2() {
      alert("文字をコピーしました");
      const selectedText = document.getSelection().toString();
      document.getElementById("selectedText").value = selectedText;
      var copytext = document.execCommand("copy");
    }
    function menu3() {
      alert("間違い内容を教えて下さい");
    }

    //メモを送る関数

    function send_memo() {
      //内容が空の時は警告

      if (document.getElementById("memocontents").value == "") {
        alert("メモ内容を入力してください。");
      } else {
        // メモを入力する処理
        document.getElementById("memocontents").value;
        console.log(document.getElementById("memocontents").value);
        console.log(document.getElementById("selectedText").value);
        document.getElementById("memoarea").style.display = "none";

        //　メモの送信

        var memo_send = {
          イイネ数: 0, //初期値0
          メモ内容: document.getElementById("memocontents").value,
          ユーザID: user.uid, //取りあえず固定
          文章該当位置: selectedObj["selectedText"],
          start: selectedObj["start"],
          end: selectedObj["end"]
        };

        //BBS用データの送信

        db.collection("databasetest")
          .add(memo_send)
          .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });
      }

      // メモをクリアする処理
      document.getElementById("memocontents").value = "";

      //リロード

      setTimeout(function () {
        location.reload();
      }, 500);
    }

    //メモを削除する

    function deletememo(id) {

      db.collection("databasetest")
        .doc(id)
        .delete();

      //リロード

      setTimeout(function () {
        location.reload();
      }, 500);
    }

    //メモを編集する

    function revision_memo(event, id) {
      db.collection("databasetest")
        .doc(id)
        .update({
          "メモ内容": event.parentNode.querySelector("textarea").value
        })
      //リロード
      setTimeout(function () {
        location.reload();
      }, 500);

    }

    //イイネを追加する

    function iineplus(id) {

      db.collection("databasetest")
        .doc(id)
        .update({
          "イイネ数": firebase.firestore.FieldValue.increment(1)
        })
      //リロード

      setTimeout(function () {
        location.reload();
      }, 500);
    }

    // メモを閉じる
    function close_memo(event) {
      event.parentNode.style.display = "none"
    }

    function close_memo_space() {
      document.querySelector(".memo_space").style.display = "none"
    }

    window.onload = function () {
      const memo_space = document.querySelector(".memo_space");

      // 要素への参照を取得

      var memo = new Array();
      let fusen = new Array();
      //FireBaseからの読み込み
      const get_fusen = db.collection("databasetest");

      //合わせるときは1つに
      var main = document.getElementsByTagName("main")[0];
      var i = 0;

      const memo_array = []

      get_fusen.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const memo_data = doc.data()
          memo_data.id = doc.id
          memo_array.push(memo_data)
        })

        m = memo_array.map(m => {
          return {
            start: m.start,
            end: m.end,
            "文章該当位置": m.文章該当位置
          }
        })

        //<span>タグの挿入
        const textMsg = document.querySelector("main#memo");
        let innerText = textMsg.innerText
        const arr = Array.from(innerText)
        const beforeData = memo_sort(memo_array)
        memo_sort(memo_array).forEach(function (data, j) {
          data = calcData(data, j, beforeData)
          arr.splice(data.start, 0, `<span id="${data.id}" class="memo">`);
          arr.splice(data.end, 0, '</span>');
        });
        textMsg.innerHTML = arr.join("");
        //付箋の作成

        document.querySelectorAll("span.memo").forEach(function(ele) {
          ele.addEventListener("click", function() {
            memo_space.style.display = "block" 
          })
        }) 
 

        memo_sort(memo_array).forEach(function (data, k) {
          create_fusen = document.createElement("div");
          if (user && user.uid === data.ユーザID) {
            create_fusen.innerHTML =
              `<div class="cancel-box" onclick="close_memo(this)">` +
              `<div class="cancel"></div> ` +
              `</div>` +
              `<br><textarea id="${data.id}" cols="30" rows="4">${data.メモ内容}</textarea>` +
              `<br><br>👍：` +
              data.イイネ数 +
              `</button><br><br><button onClick="deletememo('${data.id}')">メモを削除する</button>` +
              `<button onClick="revision_memo(this, '${data.id}')">メモを修正する</button>`;
          } else {
            create_fusen.innerHTML =
              `<div class="cancel" onclick="close_memo(this)"></div> ` +
              `<br>${data.メモ内容}` +
              `<br><br><button onClick="iineplus('${data.id}')">👍：` +
              data.イイネ数
          }
          create_fusen.classList.add("test" + data.id, "fusen");
          memo_space.appendChild(create_fusen);

        });

        fusen_control(memo_array);
      })

      function fusen_control(data) {
        for (let i = 0; i < data.length; i++) {
          memo.push(document.querySelector(`#memo span#${data[i].id}`));
          fusen.push(document.querySelector("div.test" + data[i].id));
        }

        // クリックされた時に付箋の表示を制御する
        for (let i = 0; i < memo.length; i++) {
          memo[i].addEventListener("click", event => {
            // 最初に付箋を非表示にする
            // バブリングで実行されるイベントに対しては実行しない
            if (event.target.id === event.currentTarget.id) {
              document.querySelectorAll(".fusen").forEach(function(ele) {
                ele.style.display = "none"
              })
            }
            $(fusen[i]).toggle();
          });
        }
      }
    }

    let selection;
    let selectedObj = {};
    const body = document.getElementById("memo").innerText
    document.addEventListener("selectionchange", () => {
      selection = window.getSelection();
    })

    function start() {
      let selectedText = String(selection)
      if (!selectedText) {
        return ""
      }
      selection.modify("extend", "forward", "line")
      let paragraph = String(selection)
      selection.modify("extend", "backward", "line")
      let start = body.indexOf(paragraph)
      selectedObj["start"] = start
      let end = start + selectedText.length
      selectedObj["end"] = end
      selectedObj["selectedText"] = selectedText
      console.log({ selectedText, start, end })
      return selectedText
    }

    function calcData(d, index, _data) {
      d = Object.assign({}, d)
      for(let i = 0; i < index; i++) {
        if (_data[i].start < _data[index].start) {
          d.start++
          d.end++
        }
        if (_data[i].end < _data[index].start) {
          d.start++
        }
        if (_data[i].end < _data[index].end) {
          d.end++
        }
      }
      d.end++
      return d
    }
 
    function memo_sort(_data) {
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
