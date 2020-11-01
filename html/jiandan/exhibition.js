function showAppForm()
{
	$('.app-form-mask').show();
}

function closeAppForm()
{
	$('.app-form-mask').hide();
}

function stopEvent(ev)
{
	ev.stopPropagation();
}

function submitForm()
{
    var e = $(this);
    if (e.data('lock')) return;
    if (!$("input[name='agree']").is(':checked')) {
        layer.msg('璇峰厛闃呰骞跺悓鎰忛殣绉佹斂绛�');
        return;
    }
    e.data('lock', true);
    var data = {};
    data.name = $("input[name='name']").val();
    data.phone_number = $("input[name='phone_number']").val();
    data.email = $("input[name='email']").val();
    data.type = $("input[name='type']:checked").val();
    data.wechat_id = $("input[name='wechat_id']").val();
    data.remark = $("textarea[name='remark']").val();
    data.siteid = $("input[name='siteid']").val();

    $.post("http://my.ad.parking.taoming.com:81/order.php", data, function(r) {
        layer.closeAll();
        if(r.flag) {
            $('#app-form').hide();
            $('#app-result').show();
            /*layer.open({
                content: '<p class="title">鎭枩锛佹彁浜ゆ垚鍔�</p><p>瀹℃牳閫氳繃鍚庯紝鎴戜滑灏嗕互閭欢褰㈠紡閫氱煡鎮紒</p>'
            });
			closeAppForm();*/
        } else {
            layer.msg(r.info);
        }
        e.data('lock', false);
    }, "json");
}

$(function() {
	$('[data-app-btn]').click(showAppForm);
	$('[data-submit]').click(submitForm);
	$('.app-form-mask').click(closeAppForm);
	$('.app-form').click(stopEvent);
	$('.app-form .close-btn').click(closeAppForm);
});
