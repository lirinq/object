"use strict";
const mesTex = document.getElementById('mesTex');

class  Chara {
    constructor(name,breed,hp,mp,maxMp,maxHp){
        this.name = name;
        this.breed = breed;
        this.hp = hp;
        this.mp = mp;
        this.maxMp= maxMp;
        this.maxHp= maxHp;
    }

/*
hpEffect(amount)

【何をする？】
HPを増減させる共通処理。
ダメージ（マイナス）と回復（プラス）を両方扱う。

【なぜ必要？】
HPの処理専門のメソッドを作ることで、
・同じ処理を繰り返し書かずに済む
・HP管理の責任をこのメソッドに集約できる

その結果、
・神メソッドを防げる
・HPの上限オーバーやマイナス値を防げる

【どんな時に使う？】
ほかのメソッドでダメージ・回復などHPを変化させたいとき

【処理の流れ】
1. amount分HPを増減 2行目
2. maxHpを超えたらmaxHpに合わせる　3行目～4行目
3. 0以下ならHPを0にして戦闘不能メッセージ表示　5行目から最後まで
*/

    hpEffect(amount){
        this.hp += amount;
        if(this.hp >= this.maxHp){
            this.hp = this.maxHp;
        }else if(this.hp <= 0){
            this.hp = 0;
            mesTex.innerHTML =this.name + 'は倒れた！';
        }
    }


    castSpell(target,spell){//MPを消費するときに使うメソッド target=攻撃対象　spell=呼び出す魔法
        if(this.mp >= spell.mp){//もし詠唱者のMPが呪文の消費MP以上なら
            this.mp -= spell.mp;//詠唱者のMPから呪文の消費MP文を－する
            target.hpEffect(spell.amount);//対象者のHPに呪文の影響を与える数値を＋する
        }else{//上記の条件に当てはまらないのなら
            mesTex.innerHTML ='MPがたりない！';//魔法は発動せずメッセージを出力する
        }
    }

}
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
//             ～ここから攻撃に関するクラス～
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

class Magic {
    constructor(name,mp,amount) {
        this.name = name;//魔法の名前
        this.mp = mp;//消費MP
        this.amount = amount;//影響を与える数値
    }
    
}

let fire = new Magic("fire", 4,-6);
let nAttack = new Magic("攻撃" , 0, -7);
let attack = [fire,nAttack];
let healing = new Magic( "ホイミ",4,4);
const attackBtn= document.getElementById('attack-pop-btn');

const slarin = new Chara("スラりん","スライムベス",9,38,12,12);
const slami = new Chara("スラみ","スライムベス",14,12,12,12);




function enemyAction(player , enemy){
//配列attackからランダムな数値を指定し、取り出すために何度も記述する労力をカット＋結果を統一するため
    let randAtc = attack[Math.floor(Math.random() * attack.length)];
    if(player.hp <= player.maxHp /2 && Math.random() < 0.2){
        player.castSpell(player,healing);
        console.log(player.name , "ヒール");
        mesTex.innerHTML = `<p>${player.name}は${healing.name}を唱えた</p>`;
        return;
    }

    if(player.mp >= randAtc.mp && Math.random() > 0.5){
        player.castSpell(enemy , randAtc);
        console.log( player.name , randAtc.name + "攻撃");
        mesTex.innerHTML = `<p>${player.name}の${randAtc.name}！</p>`;
        return;
    }

    console.log(player.name ,"行動なし");
    return;
}

/*
魔法ボタンを押したときの処理

*/

const mgiBtn= document.getElementById('mgi-pop-btn');
function player_magicAttack_action(i,enemy){


    enemyAction(i,enemy);
}
mgiBtn.addEventListener("click",()=>player_magicAttack_action(slami,slarin));
/*
攻撃ボタンを押したときの処理

*/
function player_physicalAttack_action(i,enemy){

    enemyAction(i,enemy);
}
