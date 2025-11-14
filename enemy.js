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
        this.hp += healtaken;//healtakenに代入された数値をthis.hp(キャラクターのHP)に足す
        
        //代入された値によって変わる内容
        if(this.hp <= this.maxHp){//もしこのキャラのHPがMAXHP以下なら
                console.log('HPを' + healtaken + "回復した");

        }else{//それ以外、つまりHPが満タンかそれ以上の場合
            console.log('すでにHPは満タンだ！');
            this.hp = this.maxHp;//最大HPを超えて回復しないように最大HPと現在のHPを同じにする
        }
    }
    castSpell(caster, target,cast){//魔法を唱えるためのプロパティ　(詠唱者、標的、唱える魔法)
        if(caster.mp < cast.cost){
            caster.mp -= cast.mp;
            return cast.effect;
        }else if(target.mp > cast.cost){
            console.log('MPがたりない！');
        }
    }

}
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
//             ～ここから攻撃に関するクラス～
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

class magic {//魔法を作るための型
    constructor(name,cost,effect) {
        this.name = name;//魔法の名前
        this.cost = cost;//消費MP
        this.effect = effect;//呼び出す関数
    }
    
}


function miniHeal(taraget){
    taraget.hp += 4;    
}


let healing = new magic( "hoimi",4,miniHeal(taraget));
const slarin = new chara("スラりん","スライムベス",9,38,12,12);
const slami = new chara("スラみ","スライムベス",14,12,12,12);

slami.castSpell(slami,slami,healing);
console.log(slami);

