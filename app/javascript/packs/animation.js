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
    // プレビューの右左矢印
    let hideDom = (arr)=>{$.each(arr, (i,c)=>{$(c).hide()})}
    let showDom = (arr)=>{$.each(arr, (i,c)=>{$(c).css('display','flex')})}
    let fullDom = (arr)=>{$.each(arr, (i,c)=>{$(c).removeClass('w-1/2').addClass('w-full')})}
    let halfDom = (arr)=>{$.each(arr, (i,c)=>{$(c).addClass('w-1/2').removeClass('w-full')})}
    $('#previewLeft').on('click', ()=>{
        showDom(['#previewRight2','#previewNeutral1'])
        hideDom(['#body','#previewLeft','#previewRight','#newHeaderLeft'])
        fullDom(['#newHeaderRight'])
        if($('#slideMode').prop('checked')){
            fullDom(['#slideModePreview'])
        }
    })
    $('#previewRight').on('click', ()=>{
        showDom(['#previewLeft2','#previewNeutral2'])
        hideDom(['#preview','#previewRight','#newHeaderRight'])
        fullDom(['#newHeaderLeft','#body'])
        halfDom(['#newHeaderRight','#preview'])
        if($('#slideMode').prop('checked')){
            hideDom(['#slideModePreview'])
        }
    })
    $('#previewNeutral1').on('click', ()=>{
        showDom(['#body','#previewLeft','#previewRight','#newHeaderLeft','#preview','#previewRight','#newHeaderRight'])
        hideDom(['#previewLeft2','#previewRight2','#previewNeutral1','#previewNeutral2'])
        halfDom(['#newHeaderRight','#preview','#newHeaderLeft','#body'])
        if($('#slideMode').prop('checked')){
            hideDom(['#preview'])
            halfDom(['#slideModePreview'])
        }
    })
    $('#previewNeutral2').on('click', ()=>{
        showDom(['#body','#previewLeft','#previewRight','#newHeaderLeft','#preview','#previewRight','#newHeaderRight'])
        hideDom(['#previewLeft2','#previewRight2','#previewNeutral1','#previewNeutral2'])
        halfDom(['#newHeaderRight','#preview','#newHeaderLeft','#body'])
        if($('#slideMode').prop('checked')){
            showDom(['#slideModePreview'])
            hideDom(['#preview'])
        }
    })
    $('#previewRight2').on('click', ()=>{
        showDom(['#body','#newHeaderLeft','#previewLeft2','#previewNeutral2'])
        hideDom(['#preview','#newHeaderRight'])
        fullDom(['#newHeaderLeft','#body'])
        halfDom(['#newHeaderRight','#preview'])
        if($('#slideMode').prop('checked')){
            hideDom(['#slideModePreview'])
            halfDom(['#slideModePreview'])
        }
    })
    $('#previewLeft2').on('click', ()=>{
        showDom(['#preview','#newHeaderRight','#previewRight2','#previewNeutral1'])
        hideDom(['#body','#newHeaderLeft','#previewLeft'])
        halfDom(['#newHeaderLeft','#body'])
        fullDom(['#newHeaderRight','#preview'])
        if($('#slideMode').prop('checked')){
            showDom(['#slideModePreview'])
            fullDom(['#slideModePreview'])
            hideDom(['#preview'])
        }
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
    // スライドモードのForward/Backward
    let page = $('#slideModePreview').attr('page')
    let slideForward = ()=>{
        $('#slideForwardBar').removeClass('bg-qiita-sub').addClass('bg-white opacity-70')
        $('#slideForwardIcon').addClass('text-qiita-sub').removeClass('cursor-pointer opacity-60 hover:opacity-100')
        $('#slideBackwardIcon').removeClass('text-qiita-sub').addClass('cursor-pointer opacity-60 hover:opacity-100')
        $('#slideFirst').hide()
        $('#slideSecond').show()
        if(page == 1){ page = 2 }
        $('#slidePage').text(page)
    }
    let slideBackward = ()=>{
        $('#slideForwardBar').addClass('bg-qiita-sub').removeClass('bg-white opacity-70')
        $('#slideForwardIcon').removeClass('text-qiita-sub').addClass('cursor-pointer opacity-60 hover:opacity-100')
        $('#slideBackwardIcon').addClass('text-qiita-sub').removeClass('cursor-pointer opacity-60 hover:opacity-100')
        $('#slideFirst').show()
        $('#slideSecond').hide()
        if(page == 2){ page = 1 }
        $('#slidePage').text(page)
    }
    $('.slideForward').on('click', ()=>{ slideForward() })
    $('.slideBackward').on('click', ()=>{ slideBackward() })
    // スライドモードのフルスクリーンボタン
    $('#slideFullscreen').on('click', ()=>{
        $('#slideFirst').toggleClass('h-418px h-full')
        $('#slideSecond').toggleClass('h-418px h-full')
        $('#slideModePreview').children().toggleClass('h-468px h-screen')
        $('#slideModePreview').toggleClass('w-1/2 w-full h-calc-post h-full p-2')
        let dom = ['header','footer','#newTitle','#tags','#newHeader','#body']
        if($('#slideModePreview').attr('fullscreen') == "off"){
            $('#slideModePreview').attr('fullscreen', 'on')
            dom.filter(c=>{ $(c).hide() })
        } else {
            $('#slideModePreview').attr('fullscreen', 'off')
            dom.filter(c=>{ $(c).show() })
        }
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
    // 投稿種別の選択
    $('.newSelectCheck').on('click', function(){
        $(this).parent().find('.opacity-1').toggleClass('opacity-0 opacity-1')
        $(this).find('.opacity-0').toggleClass('opacity-0 opacity-1')
        $('#newSelect').toggleClass('hidden')
        $('#newForm').attr('action', $(this).attr('action'))
        $('.newSubmitTitle').hide()
        $(`#newSubmitTitle${$(this).attr('index')}`).show()
    })
    $('#newSelectButton').on('click', function(){
        $('#newSelect').toggleClass('hidden')
    })
    // 投稿種別の初期値を決定 1:draft(下書き), 2:locked(限定公開), 3:create(新規投稿)
    let defaultPostType = 3
    $('#newForm').attr('action', 'create')
    $(`#newSelectCheck${defaultPostType}`).find('.opacity-0').toggleClass('opacity-0 opacity-1')
    $(`#newSubmitTitle${defaultPostType}`).toggleClass('hidden')
})