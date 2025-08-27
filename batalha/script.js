const btn_add_ball = document.getElementById("btn_add_ball")
const ball_overlay = document.getElementById("ball_overlay")
const ball_modal = document.getElementById("ball_modal")
const b_close_btn = document.getElementById("b_close_btn")
const b_cancel_btn = document.getElementById("b_cancel_btn")
const b_add_btn = document.getElementById("b_add_btn")
const ball_form = document.getElementById("ball_form")

const btn_add_barrier = document.getElementById('btn_add_barrier')
const obs_overlay = document.getElementById('obs_overlay')
const obs_modal = document.getElementById('obs_modal')
const o_close_btn = document.getElementById('o_close_btn')
const o_cancel_btn = document.getElementById('o_cancel_btn')
const o_add_btn = document.getElementById('o_add_btn')
const obs_form = document.getElementById('obs_form')

let ultimoFoco = null

function handleKeyDown(modal,overlay,e){
    if(e.key === 'Escape'){
        closeModal(modal,overlay)
    }
    if(e.key === 'Tab'){}
}

openModal = (modal,overlay)=>{
    ultimoFoco = document.activeElement
    overlay.classList.add('open')
    modal.classList.add('open')
    modal.setAttribute('aria-hidden','false')
    document.body.classList.add('modal-open')

    handleKeyDown.modal = modal
    handleKeyDown.overlay = overlay
    document.addEventListener('keydown',(e)=> handleKeyDown)
}

closeModal = (modal,overlay)=>{
    overlay.classList.remove('open')
    modal.classList.remove('open')
    modal.setAttribute('aria-hidden','true')
    document.body.classList.remove('modal-open')
    document.removeEventListener('keydown',(e) => handleKeyDown);

    if(ultimoFoco)
        ultimoFoco.focus()
}

btn_add_ball.addEventListener("click",() => openModal(ball_modal,ball_overlay))
b_close_btn.addEventListener('click',() => closeModal(ball_modal,ball_overlay))
b_cancel_btn.addEventListener('click',() => closeModal(ball_modal,ball_overlay))
ball_overlay.addEventListener('click',(evt)=>{
    if(evt.target === ball_overlay){
        closeModal(ball_modal,ball_overlay)
    }
})
ball_form.addEventListener('submit',(evt)=>{
    evt.preventDefault()
    const data = new FormData(ball_form)

    //Criação da Bolinha será feita por aqui//

    alert('Bolinha Criada com Sucesso!!')
    ball_form.reset()
    closeModal(ball_modal,ball_overlay)
})

btn_add_barrier.addEventListener('click',()=> openModal(obs_modal,obs_overlay))
o_close_btn.addEventListener('click',()=> closeModal(obs_modal,obs_overlay))
o_cancel_btn.addEventListener('click',()=> closeModal(obs_modal,obs_overlay))
obs_overlay.addEventListener('click',(evt)=>{
    if(evt.target === obs_overlay){
        closeModal(obs_modal,obs_overlay)
    }
})
obs_form.addEventListener('submit',(evt)=>{
    evt.preventDefault()
    const data = new FormData(obs_form)

    //Criação do Obstaculo será feita por aqui//

    alert('Obstáculo Criado com Sucesso!!')
    obs_form.reset()
    closeModal(obs_modal,obs_overlay)
})
