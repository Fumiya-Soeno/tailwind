$(()=>{
    // hoverで下矢印の色変更
    let btns = ["#community-btn","#user-btn"]
    btns.filter((b)=>{
        $(`${b}`).hover(function(){
            $(`${b}-icon`).css("color","white")
        },function(){
            $(`${b}-icon`).css("color","")
        })
    })
    // モーダルボタン/モーダル外クリックで表示非表示切り替え
    for (let i = 1; i <= 4; i++){
        $(document).on('click', function(e){
            if(!$(e.target).closest(`.modal${i}`).length && !$(e.target).closest(`.modal-btn${i}`).length){
                $(`.modal${i}`).hide()
            }else if($(e.target).closest(`.modal-btn${i}`).length){
                $(`.modal${i}`).is(':hidden') ? $(`.modal${i}`).show() : $(`.modal${i}`).hide()
            }
        })
    }
})