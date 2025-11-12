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
        if(this.hp <= 0){
        console.log(this.name + 'は倒れた！');
        }else {
        this.hp -= dmgtaken;
        }
    }

    heal(healtaken){
        this.hp += healtaken;
        if(this.hp <= this.maxHp){
        this.hp = this.hp + healtaken;
        this.hp = this.maxHp;
        }else{
        this.hp = healtaken + this.hp;
        console.log('すでにHPは満タンだ！');
        }
    }
    castSpell(caster, target){
        if(caster.mp < this.cost){
            caster.mp -= this.mp;
            return effect;
        }else if(target.mp > this.cost){
            console.log('MPがたりない！');
        }
    }
}
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
//             ～ここから攻撃に関するクラス～
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

class magic {
    constructor(name,cost,effect) {
        this.name = name;//魔法の名前
        this.cost = cost;//消費MP
        this.effect = effect;//呼び出す関数
    }
    
}


function heal(){
    taraget.hp -= 4;    
}


let healing = new magic( hoimi,4,heal());
const slarin = new chara("スラりん","スライムベス",9,38,12,12);
const slami = new chara("スラみ","スライムベス",14,12,12,12);

slami.castSpell(slami,slami).healing;
console.log(slami);

