"use strict";
const mesTex = document.getElementById('mesTex');

class  Character {
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

    Action(action){
		let resourceType = ( action.type === 'mgi' ) ?  'mp' : 'hp';
		if(this[resourceType] >= action.cost){
			this[resourceType] -= action.cost;
			return true;
		}else{
			return false;
		}
	}


}
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
//             ～ここから攻撃に関するクラス～
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

/*
    magic・phycicalclassを統合
    hpcostとmpとして用意していた値をcostに統合
    魔法・物理の判別用としてtypeの項目を追加
    これによってtypeがphyならHPからcostを引く、
    typeがmgiならMPからcostを引くといった魔法と
    物理攻撃を差別化しながら二つになっていたクラスを
    ひとつで済ませられる
*/
class Skill {
    constructor(name,cost,amount,type){
        this.name= name;//作成する動きの名前
        this.cost= cost;//発動必要コスト
        this.amount= amount;//発動することで変動する数値
        this.type =type;//物理・魔法の判断用
    }
}
class item extends Skill{
	constructor(name,amount,type,count){
    super(name, cost, amount, type); 
	this.count = count;
	}
	use(){
		if(this.count >  0){
		this.count -= 1;
        hpEffect(this.amount);
		return true;
		}else{
		return false;
		}
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
        if(this.turn === 'player'){
            this.turn = this.enemy ;
        }else if(this.turn === 'enemy'){
            this.turn = this.player;
        }
    }
    /*
    勝敗確認
    isResultを書き換える
    */
    resultConfirm (){
        if(this.player.isAlive === false || this.enemy.isAlive === false){
            this.enemy.isResult = 'lose';
            this.player.isResult = 'lose';
            return;   
        }else if(this.enemy.isAlive === true || this.player.isAlive === false){
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

let fire = new Skill("fire", 4,-6,'mgi');
let ice = new Skill("ice" , 2, -4,'mgi');
let magicAttack = [fire,ice];
let normal = new Skill("通常攻撃",0,-2,'phy');
let highAttack = new Skill("強攻撃",-4,-7,'phy');
let physicalAttack= [normal,highAttack];
let healing = new Skill( "ホイミ",4,4 , 'heal');
/*=======================================
        ここまで攻撃方法
=========================================*/

/*=======================================
        ここからキャラクターの初期設定
=========================================*/
const enemySt = new Character("スラりん","スライムベス",100,100,100,100);
const playerSt = new Character("スラみ","スライムベス",100,100,100,100);
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
let playerMp = document.getElementById('mp');
let enemyMp = document.getElementById('eMp');//MP表記
let playerBtn = document.getElementById('selWin');
let enemyBtn = document.getElementById('mesNext');//行動ボタン
/*=======================================
        ここまでシステム初期設定
=========================================*/
function refreshStatus(){
    playerHpBar.value = playerSt.hp;
    enemyHpBar.value = enemySt.hp;

    playerHp.innerHTML = `HP: ${playerSt.maxHp} / ${playerSt.hp}`;
    enemyHp.innerHTML = `HP: ${playerSt.maxHp} / ${enemySt.hp}`;

    playerName.innerHTML = `${playerSt.name}`;
    enemyName.innerHTML = `${enemySt.name}`;

    playerMp.innerHTML = `MP:${playerSt.maxMp}/${playerSt.mp}`;
    enemyMp.innerHTML = `MP:${enemySt.maxMp}/${enemySt.mp}`;

    enemyBtn.classList.add('pointerNone');
    
    if(playerSt.hp <= 0 || enemySt.hp <= 0){
        GM.resultConfirm();
        if(playerSt.hp <= 0 && enemySt.hp <= 0){
            mesTex.innerHTML =`ひきわけ！`;
        }else if(enemySt.hp <= 0){
            mesTex.innerHTML = `${playerSt.name}の勝利！`; 
        }else if(playerSt.hp <= 0){
            mesTex.innerHTML = `${enemySt.name}の勝利！`; 
        }
    }

}
window.addEventListener('load',refreshStatus);

function changeTurn(){
    playerBtn.classList.toggle('pointerNone');
    enemyBtn.classList.toggle('pointerNone');
}
/*============================================
        ここから敵の攻撃function
=============================================*/

function enemyAction(attacker , target){
    console.count("enemyAction");
//配列attackからランダムな数値を指定し、取り出すために何度も記述する労力をカット＋結果を統一するため
    let randMgi = magicAttack[Math.floor(Math.random() * magicAttack.length)];
    let randPhys =physicalAttack[Math.floor(Math.random() * physicalAttack.length)];
    if(attacker.hp <= attacker.maxHp / 2 && Math.random() < 0.2){
        attacker.Action(healing);
        attacker.hpEffect(healing.amount);
        console.log(attacker.name , "ヒール");
        mesTex.innerHTML = `<p>${attacker.name}は${healing.name}を唱えた</p>`;
        GM.createLog(attacker,target,healing);
        console.log(GM);
        changeTurn();
        refreshStatus();
        return;
    }else if(attacker.mp >= randMgi.cost && Math.random() > 0.5){
        attacker.Action(randMgi);
        target.hpEffect(randMgi.amount);
        mesTex.innerHTML = `<p>${attacker.name}の${randMgi.name}！
        </p><br><p>${randMgi.amount}のダメージを${target.name}に与えた！</p>`;
        GM.createLog(attacker,target,randMgi);
        changeTurn();
        refreshStatus();
        return;
    }
        attacker.Action(randPhys);
        attacker.hpEffect(randPhys.cost);
        target.hpEffect(randPhys.amount);
        GM.createLog(attacker,target,randPhys);
        mesTex.innerHTML = `<p>${attacker.name}の${randPhys.name}！
        ${target.name}に${randPhys.amount}のダメージ！</p>`;
        changeTurn();
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
    attacker.Action(randPhys);
    attacker.hpEffect(randPhys.cost);
    target.hpEffect(randPhys.amount);
    GM.createLog(attacker,target,randPhys);
    mesTex.innerHTML = `<p>${attacker.name}の${randPhys.name}！
    ${target.name}に${randPhys.amount}のダメージ！</p>`;
    refreshStatus();
    return;
}


function playerMgiAction(attacker,target){
    const randMgi = magicAttack[Math.floor(Math.random() * magicAttack.length)];
        //攻撃者の㏋が最大値の半分　かつ　ランダム生成した数字が0.2より大きい場合（20％
    if(attacker.hp <= attacker.maxHp / 2 && Math.random() < 0.5){
        attacker.Action(healing);
        attacker.hpEffect(healing.amount);
        console.log(attacker.name , "ヒール");
        mesTex.innerHTML = `<p>${attacker.name}は${healing.name}を唱えた</p>`;
        GM.createLog(attacker,target,healing);
        console.log(GM);
        refreshStatus();
        return;
        //攻撃者のMPがランダムな魔法のコストより大きい　且つ　ランダム生成した数字が0.5より大きい場合(50%
    }else if(attacker.mp >= randMgi.cost && Math.random() > 0.5){
        attacker.Action(randMgi);
        target.hpEffect(randMgi.amount);
        mesTex.innerHTML = `<p>${attacker.name}の${randMgi.name}!
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
    changeTurn();
    console.log(GM.logs);
});
MgiAtkBtn.addEventListener('click' ,()=>{ 
    playerMgiAction(playerSt,enemySt);
    changeTurn();
    console.log(GM.logs);
});

/*====================================================

    敵味方共通の攻撃処理

=======================================================*/

function executeAction(attacker, target, action) {

    // 1. コスト消費
	let canAct=attacker.Action(action);
	if(!canAct) {
    	mesTex.innerHTML = `${attacker.name}はMPが足りない！`;
    	return false;  // 処理を中断	
	}
    // 2. ダメージ/回復処理
	let なんかいい感じの変数名 =(action.type === 'heal' ) ? attcker : target;
	なんかいい感じの変数名.hpEffect(action.amount)
    // 3. ログ作成
	GM.createLog(attacker,target,action);
    // 4. メッセージ表示
	if(action.type === 'heal') {
    mesTex.innerHTML = `${attacker.name}は${action.name}を唱えた！<br>HPが${action.amount}回復した！`;
} else {
    mesTex.innerHTML = `${attacker.name}の${action.name}！<br>${target.name}に${Math.abs(action.amount)}のダメージ！`;
}
	 // 5. UI更新・ターン切り替え
	RefleshTurn();	
	changeTurn();
}
