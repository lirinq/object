"use strict";

class  chara {
    constructor(name,breed,hp,mp,maxMp,maxHp){
        this.name = name;
        this.breed = breed;
        this.hp = hp;
        this.mp = mp;
        this.maxMp= maxMp;
        this.maxHp= maxHp;
    }
    

    hpEffect(effectaken){
        this.hp += effectaken;

        if(this.hp >= this.maxHp){
            this.hp = this.maxHp;
        }else if(this.hp <= 0){
            this.hp = 0;
            console.log(this.name + 'は倒れた！');
        }
    }


    castSpell(target,spell){//MPを消費するときに使うメソッド
        if(this.mp >= spell.mp){//もし詠唱者のMPが呪文の消費MP以上なら
            this.mp -= spell.mp;//詠唱者のMPから呪文の消費MP文を－する
            target.hpEffect(spell.amount)//対象者のHPに呪文の影響を与える数値を＋する
        }else{//上記の条件に当てはまらないのなら
            console.log('MPがたりない！');//魔法は発動せずメッセージをコンソールに出力する
        }
    }

}
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
//             ～ここから攻撃に関するクラス～
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

class magic {
    constructor(name,mp,amount) {
        this.name = name;//魔法の名前
        this.mp = mp;//消費MP
        this.amount = amount;//影響を与える数値
    }
    
}

let fire = new magic("fire", 4,-6);
let nAt = new magic("攻撃" , 0, -7);
let atack = [fire,nAt];
let healing = new magic( "hoimi",4,4);
const slarin = new chara("スラりん","スライムベス",9,38,12,12);
const slami = new chara("スラみ","スライムベス",14,12,12,12);


// slarin.castSpell(slami,nAt);
// slarin.castSpell(slami,fire);
// console.log(slami,"攻撃後");
// slami.castSpell(slami,healing);
// console.log(slami,"回復後");

function enemyego(i , enemy){
    randA = atack[Math.floor(Math.random() * atack.length)];

    if(i.hp < i.maxHp /2 && Math.random() * 0.2){
        i.castSpell(i,healing);
        console.log(i.name , "ヒール");
        return;
    }

    if(i.mp >= randA.mp && Math.random() > 0.5){
        i.castSpell(enemy , randA);
        console.log( i.name , randA.name + "攻撃");
        return;
    }

    console.log(i.name ,"行動なし");
    return;
}

enemyego(slami ,slarin);


enemyego(slarin ,slami);
console.log(slami,slarin,"1回目");

enemyego(slami,slarin);


enemyego(slarin ,slami);
console.log(slami,slarin,"2回目");