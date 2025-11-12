"use strict";

class enemy {
    constructor(name,breed,hp,mp,maxMp,maxHp){
        this.name = name;
        this.breed = breed;
        this.hp = hp;
        this.mp = mp;
        this.maxMp= maxMp;
        this.maxHp= maxHp;
    }

    magic(target,i){
        if(target.hp >= 0){
            switch(i){
                case  1 :
                if(this.mp >= 4){
                    this.mp = this.mp - 4 ;
                    const damage = 4;
                    // target.hp - damage;　これでは計算しただけで反映されていないので代入しないとだめ
                    target.hp = target.hp - damage;
                    console.log( this.name + 'はメラを唱えた！');
                    console.log('のこりMP' + this.mp);
                    console.log(this.name +"は" + target.name + "に" + damage + 'ダメージを与えた！');
                    
                }else if( this.mp < 4){
                    console.log( this.name + 'はメラを唱えた！');
                    console.log('MPが足りない！');
                    console.log(this.name + 'は戸惑っている...');
                }
                break;

                case 2 :
                if(this.mp >= 6){
                    this.mp = this.mp - 6 ;
                    console.log( this.name + 'はメラミを唱えた！');
                    console.log('のこりMP' + this.mp);
                }else if( this.mp < 6){
                    console.log( this.name + 'はメラミを唱えた！');
                    console.log('MPが足りない！');
                    console.log(this.name + 'は戸惑っている...');
                }
                break;

                case  3 :
                if(this.mp < this.maxMp){
                    let tempMP = this.maxMp;
                    this.mp = this.mp + 4 ;
                    if (tempMP > this.maxMp) {
                    this.mp = this.maxMp;
                    }
                    console.log( this.name + 'は瞑想をはじめた...');
                    console.log(this.name +'のMPが回復した！');
                    console.log('のこりMP' + this.mp);
                
                }else{
                    console.log( this.name + 'は瞑想をはじめた...');
                    console.log('しかしMPはすでに満タンだ！');
                }
                break;

                case 4:
                if(this.mp >= 4){
                    let tempHP = this.hp;
                    this.mp -= 4;
                    this.hp += 6;
                    if(this.hp > this.maxHp){
                    this.hp = this.maxHp;
                    }
                    console.log(this.name + 'はホイミをつかった！');
                    console.log('HPが' + (this.hp - tempHP) + '回復した！');
                    console.log('のこりMP' + this.mp);
                    console.log('のこりHP' + this.hp);
                    
                }else if(this.hp >= this.maxHp){
                    console.log(this.name + 'はホイミをつかった！');
                    console.log('しかしHPはすでに満タンだ！');
                }else if(this.mp < 4){
                    console.log(this.name + 'はホイミをつかった！');
                    console.log('しかしMPがたりない！');
                }
                
                break;
            }
        }else if(target.hp <= 0){
            console.log(target.name + 'は倒れた！');
        }
    }
    attack(){

    }
}

const slarin = new enemy("スラりん","スライムベス",9,38,12,12);
const slami = new enemy("スラみ","スライムベス",14,12,12,12);

for(let i = 0; i < 10; i++ ){
    let mRand = Math.floor(Math.random() * (magic.length - 0) + 1) ;
    let aRand = Math.floor(Math.random() * (4 - 0) + 1) ;
    
    slarin.magic(slami,mRand);
    slami.magic(slarin,mRand);
    console.log(slami.hp);
    console.log(slarin.hp);
    
    
}


//いろいろ調べていくうちにswith文に攻撃方法を組み込むのは非効率だとわかったので分岐させて
//クラスの中身をシンプルにする方法で続ける