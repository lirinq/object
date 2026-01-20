"use strict";
const mesTex = document.getElementById('mesTex');

class  character {
    constructor(name,breed,hp,mp,maxMp,maxHp){
        this.name = name;
        this.breed = breed;
        this.hp = hp;
        this.mp = mp;
        this.maxMp= maxMp;
        this.maxHp= maxHp;
//生死の判定用のステータス　trueなら生存　falseなら死亡
        this.isAlive=true;
        this.isResult='';
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
            this.isAlive =false;
        }
    }

    castSpell(/*target,*/spell){//MPを消費するときに使うメソッド target=攻撃対象　spell=呼び出す魔法
        if(this.mp >= spell.mp){//もし詠唱者のMPが呪文の消費MP以上なら
            this.mp -= spell.mp;//詠唱者のMPから呪文の消費MP文を－する
            return true;
            //target.hpEffect(spell.amount);対象者のHPに呪文の影響を与える数値を＋する
        }else{//上記の条件に当てはまらないのなら
            //魔法は発動しない
            return false;
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
戦闘ログ作成
ログの保存
誰に　誰が　何を　の管理？
*/
class GameManager{
    constructor(player,enemy){
    this.player=player;//charクラスで作成した自キャラを入れる
    this.enemy=enemy;//charクラスで作成した敵キャラを入れる
    this.turn='player';//ターンの確認 enemyかplayerが入る
    this.logs=[];//ログをpushする
    }
    /*
    SwitchTurn(turn)
    【何をする？】
    ターンの確認
    this.turnの値を切り替える

    【なぜ必要？】
    誰のターンなのかを確認して次に行動する方にターンを切り替える

    【どんな時に使う？】
    ターンの終了時につかう
    */
    SwitchTurn(){
        if(this.turn === this.player){
            this.turn = this.enemy ;
        }else if(this.turn === this.enemy){
            this.turn = this.player;
        }
    }
    /*
    勝敗確認
    isResultを書き換える
    */
    resultConfirm (){
        if(this.enemy.isAlive === false || this.enemy.isAlive === false){
            this.enemy.isResult = 'lose';
            this.player.isResult = 'lose';
            return;   
        }else if(this.enemy.isAlive === true || this.enemy.isAlive === false){
            this.enemy.isResult = 'win';
            return;
        }else if(this.player.isAlive === true || this.enemy.isAlive === false){
            this.player.isResult = 'win';
            return;
        }
            console.log('継戦');
            return false;
        };

    /*
    logの作成・保存
    logを保存した後蓄積していく一方になってしまう？
    */
    createLog(actor,target,spell){
        this.logs.push({
            actor,
            spell,
            target,
            actName:spell.name,
            value: spell.amount
        });
    }
}
/*=============================================

            ここまでGameManagerクラス

===============================================*/
/*
ステータスの更新
メッセージの表示
GameManagerで作成したログを参照して上記の作業を行う
*/
class UiManager{
    constructor(player,enemy,log){
        this.player = player;
        this.enemy = enemy;
        this.log = log;
    }
}

let fire = new Magic("fire", 4,-6);
let ice = new Magic("ice" , 2, -4);
let magicAttack = [fire,ice];
let normal = new Physical("通常攻撃",0,-2);
let highAttack = new Physical("強攻撃",4,-7);
let physicalAttack= [normal,highAttack];
let healing = new Magic( "ホイミ",4,4);
/*=======================================
        ここまで攻撃方法
=========================================*/

/*=======================================
        ここからキャラクターの初期設定
=========================================*/
const enemySt = new character("スラりん","スライムベス",100,100,12,100);
const playerSt = new character("スラみ","スライムベス",100,100,12,100);
/*=======================================
        ここまでキャラ設定
=========================================*/

/*=======================================
        ここからシステム初期設定
=========================================*/
let GM = new GameManager(playerSt,enemySt);
let playerHpBar =  document.getElementById('pHpBar');
let enemyHpBar =  document.getElementById('eHpBar');//HPバー
let playerName = document.getElementById('name');
let enemyName = document.getElementById('eName');//名前
let playerHp = document.getElementById('hp');
let enemyHp = document.getElementById('eHp');//HP表記
/*=======================================
        ここまでシステム初期設定
=========================================*/

function refreshStatus(){
    playerHpBar.value = playerSt.hp;
    enemyHpBar.value = enemySt.hp;

    playerHp.innerHTML = `100 / ${playerSt.hp}`;
    enemyHp.innerHTML = `100 / ${enemySt.hp}`;

    playerName.innerHTML = `${playerSt.name}`;
    enemyName.innerHTML = `${enemySt.name}`;

    if(playerSt.hp <= 0 || enemySt.hp <= 0){
        GM.resultConfirm();
        if(playerSt.hp <= 0 && enemySt.hp <= 0){
            mesTex.innerHTML =`ひきわけ！`;
        }else if(enemySt.hp <= 0){
            mesTex.innerHTML = `${playerSt.name}の勝利！`; 
        }else if(playerSt.hp <= 0){
            mesTex.innerHTML = `${enemySt.name}の勝利！`; 
        }
        GM.resultConfirm();
    }
}

window.addEventListener('load',refreshStatus());

/*============================================
        ここから敵の攻撃function
=============================================*/

function enemyAction(attacker , target){
    console.count("enemyAction");
//配列attackからランダムな数値を指定し、取り出すために何度も記述する労力をカット＋結果を統一するため
    let randMgi = magicAttack[Math.floor(Math.random() * magicAttack.length)];
    let randPhys =physicalAttack[Math.floor(Math.random() * physicalAttack.length)];
    if(attacker.hp <= attacker.maxHp /2 && Math.random() < 0.2){
        attacker.castSpell(healing);
        attacker.hpEffect(healing.amount);
        console.log(attacker.name , "ヒール");
        mesTex.innerHTML = `<p>${attacker.name}は${healing.name}を唱えた</p>`;
        GM.createLog(attacker,target,healing);
        console.log(GM);
        refreshStatus();
        return;
    }else if(attacker.mp >= randMgi.mp && Math.random() > 0.5){
        attacker.castSpell(randMgi);
        target.hpEffect(randMgi.amount);
        mesTex.innerHTML = `<p>${attacker.name}の${randMgi.name}！
        </p><br><p>${randMgi.amount}のダメージを${target.name}に与えた！</p>`;
        GM.createLog(attacker,target,randMgi);
        refreshStatus();
        return;
    }
        attacker.castSpell(randPhys);
        target.hpEffect(randPhys.amount);
        GM.createLog(attacker,target,randPhys);
        mesTex.innerHTML = `<p>${attacker.name}の${randPhys.name}！
        ${target.name}に${randPhys.amount}のダメージ！</p>`;
        refreshStatus();
        return;
}

let enemyAct = document.getElementById('mesNext');
enemyAct.addEventListener('click', ()=>{
    enemyAction(enemySt,playerSt);
    console.log(GM.logs);
});

/*============================================
        ここまで敵の攻撃function
=============================================*/


/*============================================
        ここから味方の攻撃function
=============================================*/

function playerPhyAction(attacker,target){
    const randPhys =physicalAttack[Math.floor(Math.random() * physicalAttack.length)];
    attacker.castSpell(randPhys);
    target.hpEffect(randPhys.amount);
    GM.createLog(attacker,target,randPhys);
    mesTex.innerHTML = `<p>${attacker.name}の${randPhys.name}！
    ${target.name}に${randPhys.amount}のダメージ！</p>`;
    refreshStatus();
    return;
}

function playerMgiAction(attacker,target){
    const randMgi = magicAttack[Math.floor(Math.random() * magicAttack.length)];
    if(attacker.hp <= attacker.maxHp /2 && Math.random() < 0.2){
        attacker.castSpell(healing);
        attacker.hpEffect(healing.amount);
        console.log(attacker.name , "ヒール");
        mesTex.innerHTML = `<p>${attacker.name}は${healing.name}を唱えた</p>`;
        GM.createLog(attacker,target,healing);
        console.log(GM);
        refreshStatus();
        return;
    }else if(attacker.mp >= randMgi.mp && Math.random() > 0.5){
        attacker.castSpell(randMgi);
        target.hpEffect(randMgi.amount);
        mesTex.innerHTML = `<p>${attacker.name}の${randMgi.name}！
        </p><br><p>${randMgi.amount}のダメージを${target.name}に与えた！</p>`;
        GM.createLog(attacker,target,randMgi);
        refreshStatus();
        return;
    }
}

const PhyAtkBtn= document.getElementById('attack-pop-btn');
const MgiAtkBtn= document.getElementById('magic-pop-btn');

PhyAtkBtn.addEventListener('click' ,()=>{ 
    playerPhyAction(playerSt,enemySt);
    console.log(GM.logs);
});
MgiAtkBtn.addEventListener('click' ,()=>{ 
    playerMgiAction(playerSt,enemySt);
    console.log(GM.logs);
});