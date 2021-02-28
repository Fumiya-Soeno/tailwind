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
    $('#article_body').on('keyup', function(){
        $('#preview').html(marked($(this).val()))
        $('#slideModeBody').html(marked($(this).val()))
    })
    $('#article_body').trigger('keyup')
    // プレビューの右左矢印
    let hideDom = (arr)=>{$.each(arr, (i,c)=>{$(c).hide()})}
    let flexDom = (arr)=>{$.each(arr, (i,c)=>{$(c).css('display','flex')})}
    let blocDom = (arr)=>{$.each(arr, (i,c)=>{$(c).css('display','block')})}
    let fullDom = (arr)=>{$.each(arr, (i,c)=>{$(c).removeClass('w-1/2').addClass('w-full')})}
    let halfDom = (arr)=>{$.each(arr, (i,c)=>{$(c).addClass('w-1/2').removeClass('w-full')})}
    $('#previewLeft').on('click', ()=>{
        flexDom(['#previewRight2','#previewNeutral1'])
        hideDom(['#article_body','#previewLeft','#previewRight','#newHeaderLeft'])
        fullDom(['#newHeaderRight'])
        if($('#slideMode').prop('checked')){
            fullDom(['#slideModePreview'])
        }
    })
    $('#previewRight').on('click', ()=>{
        flexDom(['#previewLeft2','#previewNeutral2'])
        hideDom(['#preview','#previewRight','#newHeaderRight'])
        fullDom(['#newHeaderLeft','#article_body'])
        halfDom(['#newHeaderRight','#preview'])
        if($('#slideMode').prop('checked')){
            hideDom(['#slideModePreview'])
        }
    })
    $('#previewNeutral1').on('click', ()=>{
        flexDom(['#article_body','#previewLeft','#previewRight','#newHeaderLeft','#previewRight','#newHeaderRight'])
        blocDom(['#preview'])
        hideDom(['#previewLeft2','#previewRight2','#previewNeutral1','#previewNeutral2'])
        halfDom(['#newHeaderRight','#preview','#newHeaderLeft','#article_body'])
        if($('#slideMode').prop('checked')){
            hideDom(['#preview'])
            halfDom(['#slideModePreview'])
        }
    })
    $('#previewNeutral2').on('click', ()=>{
        flexDom(['#article_body','#previewLeft','#previewRight','#newHeaderLeft','#previewRight','#newHeaderRight'])
        blocDom(['#preview'])
        hideDom(['#previewLeft2','#previewRight2','#previewNeutral1','#previewNeutral2'])
        halfDom(['#newHeaderRight','#preview','#newHeaderLeft','#article_body'])
        if($('#slideMode').prop('checked')){
            flexDom(['#slideModePreview'])
            hideDom(['#preview'])
        }
    })
    $('#previewRight2').on('click', ()=>{
        flexDom(['#article_body','#newHeaderLeft','#previewLeft2','#previewNeutral2'])
        hideDom(['#preview','#newHeaderRight'])
        fullDom(['#newHeaderLeft','#article_body'])
        halfDom(['#newHeaderRight','#preview'])
        if($('#slideMode').prop('checked')){
            hideDom(['#slideModePreview'])
            halfDom(['#slideModePreview'])
        }
    })
    $('#previewLeft2').on('click', ()=>{
        flexDom(['#newHeaderRight','#previewRight2','#previewNeutral1'])
        blocDom(['#preview'])
        hideDom(['#article_body','#newHeaderLeft','#previewLeft'])
        halfDom(['#newHeaderLeft','#article_body'])
        fullDom(['#newHeaderRight','#preview'])
        if($('#slideMode').prop('checked')){
            flexDom(['#slideModePreview'])
            fullDom(['#slideModePreview'])
            hideDom(['#preview'])
        }
    })
    // スライドモードのチェックボックス
    $('#slideModeTitle').autosize()
    $('#slideMode').on('click', function(){ 
        if($(this).prop('checked')){
            $('#preview').hide()
            $('#slideModePreview').show()
            $('#slideModeTitle').trigger('autosize.resize')
        } else {
            $('#preview').show()
            $('#slideModePreview').hide()
        }
    })
    // スライドモードのタイトル表示を同期させる
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
        $('#slideModeTitle').trigger('autosize.resize')
    }
    $('.slideForward').on('click', ()=>{ slideForward() })
    $('.slideBackward').on('click', ()=>{ slideBackward() })
    // スライドモードのフルスクリーンボタン
    $('#slideFullscreen').on('click', ()=>{
        $('#slideFirst').toggleClass('h-418px h-full')
        $('#slideSecond').toggleClass('h-418px h-full')
        $('#slideModePreview').children().toggleClass('h-468px h-screen')
        $('#slideModePreview').toggleClass('w-1/2 w-full h-calc-post h-full p-2')
        let dom = ['header','footer','#newTitle','#article_tags','#newHeader','#article_body']
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
        $('.newSubmitTitle').hide()
        $(`#newSubmitTitle${$(this).attr('index')}`).show()
        $('#newSelect').toggleClass('hidden')
        // 投稿先を変更
        $('#newForm').attr('action', $(this).attr('action'))
        if($(this).attr('method')){
            $('#newForm').attr('method', $(this).attr('method'))
        }
        // 項目チェックマークの移動
        $(this).parent().find('.opacity-1').toggleClass('opacity-0 opacity-1')
        $(this).find('.opacity-0').toggleClass('opacity-0 opacity-1')
    })
    $('#newSelectButton').on('click', function(){
        $('#newSelect').toggleClass('hidden')
    })
    // 投稿種別の初期値を決定 1:draft(下書き), 2:locked(限定公開), 3:create(新規投稿)
    let defaultPostType = 3
    $(`#newSelectCheck${defaultPostType}`).find('.opacity-0').toggleClass('opacity-0 opacity-1')
    $(`#newSubmitTitle${defaultPostType}`).toggleClass('hidden')
    // 画像の本文中へのアップロード
    const bucket = 'onseo'
    const region = 'ap-northeast-1'
    AWS.config.update({
        region: region,
        accessKeyId: gon.access_key_id,
        secretAccessKey: gon.secret_access_key
    })
    AWS.config.apiVersions = {
        rekognition: '2016-06-27',
    }
    const UploadToS3 = function(file) {
        const s3 = new AWS.S3({
            params: {
                Bucket: bucket,
                Region: region
            }
        })
        if (file) {
            s3.putObject({
                Body: file,
                Key: file.name,
                ContentType: file.type,
                ACL: "public-read"
            }, function(err, data) {
                if (data !== null) {
                    let body = $('#article_body').val()
                    if (body == undefined){ return }
                    $('#article_body').val(body + '![](' + `https://${bucket}.s3-${region}.amazonaws.com/${file.name}` +')\n')
                    $('#article_body').trigger('keyup')
                } else {
                    console.log(err)
                }
            })
        }
    }
    $('.newModalIcon1').on('click',function(){
        $('#bodyImageUpload').trigger('click')
    })
    $('#upload').on('change',function(){
        $('#iconImageUpload').trigger('click')
    })
    $('#bodyImageUpload').on('change', function(){
        UploadToS3($(this).prop('files')[0])
    })
    $('#article_body').on('drop',function(e){
        e.preventDefault()
        $('#bodyImageUpload').prop('files', e.originalEvent.dataTransfer.files)
        UploadToS3($('#bodyImageUpload').prop('files')[0])
    })
})