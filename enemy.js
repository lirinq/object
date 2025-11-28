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
    
    damage(dmgtaken){
        this.hp -= dmgtaken;
        if(this.hp <= 0){
            this.hp = 0;
            console.log(this.name + 'は倒れた！');
        }
    }

    heal(healtaken){
        this.hp += healtaken;//まずhpに回復分の数値を＋する
        //ここからは回復したHPが最大値を超えてないか、超えてたなら最大値に書き換える式
        if(this.hp >= this.maxHp){//もしこのキャラのHPが最大値以上なら
            this.hp = this.maxHp;//このキャラのHPは最大値と同じにする
            console.log('すでにHPは満タンだ！');
        }
    }
    castSpell(caster, target,spell){//MPを消費するときに使うメソッド
        if(caster.mp >= spell.mp){//もし詠唱者のMPが呪文の消費MP以上なら
            caster.mp -= spell.mp;//詠唱者のMPから呪文の消費MP文を－する
            target.hp += spell.amount;//対象者のHPに呪文の影響を与える数値を＋する
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


let healing = new magic( "hoimi",4,3);
const slarin = new chara("スラりん","スライムベス",9,38,12,12);
const slami = new chara("スラみ","スライムベス",14,12,12,12);


slami.damage(10);
console.log(slami);
slami.castSpell(slami,slami,healing);
// slami.heal(5);

console.log(8 + -3);

console.log(slami);

