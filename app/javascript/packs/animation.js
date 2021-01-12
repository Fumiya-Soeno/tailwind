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
    for (let i = 1; i <= 10; i++){
        $(document).on('click', function(e){
            if(!$(e.target).closest(`.modal${i}`).length && !$(e.target).closest(`.modal-btn${i}`).length){
                $(`.modal${i}`).hide()
            }else if($(e.target).closest(`.modal-btn${i}`).length){
                $(`.modal${i}`).is(':hidden') ? $(`.modal${i}`).show() : $(`.modal${i}`).hide()
            }
        })
    }
    // 新規投稿画面のプレビュー機能
    marked.setOptions({
        breaks: true,
        langPrefix: '',
        highlight: function (code, lang) {
        return hljs.highlightAuto(code, [lang]).value
        }
    })
    $('#body').on('keyup', function(){
        $('#preview').html(marked($(this).val()))
        $('#slideModeBody').html(marked($(this).val()))
    })
    // スライドモードのチェックボックス
    $('#slideMode').on('click', function(){
        if($(this).prop('checked')){
            $('#preview').hide()
            $('#slideModePreview').show()
        } else {
            $('#preview').show()
            $('#slideModePreview').hide()
        }
    })
    // スライドモードのタイトル表示を同期させる
    $('#slideModeTitle').autosize()
    $('#newTitle').on('keyup', function(){
        $('#slideModeTitle').val($(this).val())
                            .trigger('autosize.resize')
    })
    // 新規投稿画面のモーダル表示
    for (let i = 1; i <= 10; i++){
        let newModal = $(`.newModal${i}`)
        let newModalIcon = $(`.newModalIcon${i}`)
        newModalIcon.hover(function(){
            // モーダルの左右表示位置をアイコン中央の真上に合わせる
            newModal.css('left', `${$(this).offset().left - $(this).parent().offset().left - (newModal.width() - newModalIcon.width())/2}px`)
            newModal.fadeIn(100)
        }, function(){
            newModal.fadeOut(100)
        })
    }
})