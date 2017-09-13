define( [ 'jquery', 'cookie' ], function ( $ ) {


 $( '#formId' ).on( 'submit', function () {

            // 1, 收集数据
    var formData = $( this ).serialize();

    // 2, 发送 ajax 请求
    $.ajax({
        url: '/login',
        type: "post",
        data: formData,
        success: function ( info ) {
               if(info.code == 200){
               	location.href = '/';
               }
        }
    });
        // $.post('/login',function(info){
        //     alert("我发送的是post请求")
        //     alert(info)
        // })
    return false;
});


});