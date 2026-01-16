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

class Physical {
    constructor(name,hp,amount) {
        this.name = name;//魔法の名前
        this.hp = hp;//消費する㏋
        this.amount = amount;//影響を与える数値
    }
    
}
/*
ターンの管理
勝敗の確認
ステータスの更新
*/
class BattleManager{
    constructor(){
    
    }

}

let fire = new Magic("fire", 4,-6);
let ice = new Magic("ice" , 2, -4);
let mgiattack = [fire,ice];
let normal = new Physical("通常攻撃",0,-2);
let highAttack = new Physical("強めの攻撃",4,-7);
let physicalAttack= [normal,highAttack];
let healing = new Magic( "ホイミ",4,4);
const attackBtn= document.getElementById('attack-pop-btn');
const nextBtn = document.getElementById('mesNext');
const enemyName = document.getElementById('eName');
const playerName = document.getElementById('name');
const enemyHp = document.getElementById('eHp');
const playerHp = document.getElementById('hp');
let enemyBar = document.getElementById('ehpbar');
let playerBar = document.getElementById('hpbar');
const enemySt = new Chara("スラりん","スライムベス",100,100,12,100);
const playerSt = new Chara("スラみ","スライムベス",100,100,12,100);

function refreshStatus(){
    playerHp.innerHTML = `<p>${playerSt.hp}/${playerSt.maxHp}</p>`;
    playerName.innerText = playerSt.name;
    playerBar.setAttribute('value' , `${playerSt.hp}`);
    enemyHp.innerHTML = `<p>${enemySt.hp}/${enemySt.maxHp}</p>`;
    enemyName.innerText = enemySt.name;
    enemyBar.setAttribute('value' , `${enemySt.hp}`);
}
document.addEventListener('DOMContentLoaded' , function situationLoad(){
    refreshStatus();
});



function enemyAction(attacker , target){
    console.log("enemyAction 実行");
    console.count("enemyAction");
//配列attackからランダムな数値を指定し、取り出すために何度も記述する労力をカット＋結果を統一するため
    let randAtc = mgiattack[Math.floor(Math.random() * mgiattack.length)];
    if(attacker.hp <= attacker.maxHp /2 && Math.random() < 0.2){
        attacker.castSpell(attacker,healing);
        console.log(attacker.name , "ヒール");
        // mesTex.innerHTML = `<p>${attacker.name}は${healing.name}を唱えた</p>`;
        refreshStatus();
        return;
    }

    if(attacker.mp >= randAtc.mp && Math.random() > 0.5){
        attacker.castSpell(target , randAtc);
        console.log( attacker.name , randAtc.name + "攻撃");
//        mesTex.innerHTML = `<p>${attacker.name}の${randAtc.name}！</p><br><p>${randAtc.amount}のダメージを${target.name}に与えた！</p>`;
        refreshStatus();
        return;
    }
    
    mesTex.innerHTML = `<p>${attacker.name}はボーっとしている。</p>`;
    refreshStatus();
    return;
}

const mgiBtn= document.getElementById('magic-pop-btn');
const phyBtn= document.getElementById('attack-pop-btn');

/*
攻撃ボタンを押したときの処理

*/
function player_physicalAttack_action(player,enemy){

    enemyAction(player,enemy);
}
phyBtn.addEventListener("click",() =>player_physicalAttack_action(enemySt,enemySt));

/*

魔法ボタンを押したときの処理

*/
function player_magicAttack_action(attacker,target){
    let randAtc = mgiattack[Math.floor(Math.random() * mgiattack.length)];
    //攻撃
    attacker.castSpell(target,randAtc);
    //攻撃の処理を出力
    mesTex.innerHTML = `<p>${attacker.name}の${randAtc.name}！</p>
    <br><p>${randAtc.amount}のダメージを${target.name}に与えた！</p>`;
    //HPの書き換え
    refreshStatus();
    //メッセージウィンドウをクリックしたら敵の行動を実施
};


mgiBtn.addEventListener("click",() =>player_magicAttack_action(playerSt,enemySt));
nextBtn.addEventListener("click" ,() => enemyAction(playerSt,enemySt));
