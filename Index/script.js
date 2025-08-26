const park = document.getElementById('park')
const num_bolas = document.getElementById('num_bol')
const qtd = document.getElementById('txt_qtd')
const btn_add = document.getElementById('btn_add')
const btn_rmv = document.getElementById('btn_rmv')

let larguraPark = park.offsetWidth
let alturaPark = park.offsetHeight
let bolas=[]
let qtd_bolas = 0

class Bola{
    constructor(bolas,park){
        this.tam = Math.floor(Math.random()*10) + 10

        this.r = Math.floor(Math.random()*255)
        this.g = Math.floor(Math.random()*255)
        this.b = Math.floor(Math.random()*255)

        this.px = Math.floor(Math.random() * larguraPark - this.tam)
        this.py = Math.floor(Math.random() * alturaPark - this.tam)

        this.velx = Math.floor(Math.random()*2) + 0.25
        this.vely = Math.floor(Math.random()*2) + 0.25

        this.dx = Math.random() < 10 ? -1 : 1
        this.dy = Math.random() < 10 ? -1 : 1

        this.park = park
        this.bolas = bolas
        this.id = Date.now() + "_" + Math.floor(Math.random()*1000)

        this.desenhar()
        this.controle = setInterval(this.controlar,10)
        this.bolinha = document.getElementById(this.id)

        qtd_bolas++
        num_bolas.innerHTML = qtd_bolas
    }

    poscicaoArray=()=>{
        return this.bolas.indexOf(this)
    }

    desenhar=()=>{
        const div = document.createElement('div')
        div.setAttribute('id',this.id)
        div.setAttribute('class',"bola")
        div.setAttribute('style',`left : ${this.px}px; top : ${this.py}px; width: ${this.tam}px; height : ${this.tam}px; background-color : rgb(${this.r},${this.g},${this.b})`)
        park.appendChild(div)
    }

    remover=()=>{
        clearInterval(this.controle)
        bolas= bolas.filter((bola)=>{
            return bola.id != this.id
        })
        this.bolinha.remove()
        qtd_bolas--
        num_bolas.innerHTML = qtd_bolas
    }

    colisao=()=>{
        if(this.px + this.tam >= larguraPark){
            this.dx = -1
        }else if(this.px <= 0){
            this.dx = 1
        }

        if(this.py + this.tam >= alturaPark){
            this.dy = -1
        }else if(this.py <= 0){
            this.dy = 1
        }
        
    }

    controlar=()=>{
        this.colisao()
        this.px += this.dx * this.velx
        this.py += this.dy * this.vely
        this.bolinha.setAttribute('style',`left : ${this.px}px; top : ${this.py}px; width: ${this.tam}px; height : ${this.tam}px; background-color : rgb(${this.r},${this.g},${this.b})`)
        if(this.px > larguraPark || this.py > alturaPark){
            this.remover()
        }
    }
}


window.addEventListener('resize',(evt)=>{
    larguraPark = park.offsetWidth
    alturaPark = park.offsetHeight
})

btn_add.addEventListener('click',(evt)=>{
    const add_bola = qtd.value
    for(let i = 0; i < add_bola; i++){
        bolas.push(new Bola(bolas,park))
    }
})

btn_rmv.addEventListener('click',(evt)=>{
    bolas.forEach((b)=>{
        b.remover()
    })
})