// SECTIONS NAVIGATION
$(function() {

	$('.header__burger').on('click', function() {
		$('body').toggleClass('nav-open');
	});

	$(window).scroll(function() {
		var windscroll = $(window).scrollTop();
		if (windscroll > 0) {
			$('.header').addClass('header_fixed');
		} else {
			$('.header').removeClass('header_fixed');
		}
	}).scroll();

	$('.js-popup').on('click', function(e) {
		e.preventDefault();
		$('body').addClass('popup-open');
		var popupNow = '.popup_' + $(this).data('popup');
		$(popupNow).addClass('popup_active');
		var popupNowMain =  $(popupNow).find('.popup__main');
		if($('html').height() > popupNowMain.height()) {
			popupNowMain.css('margin-top', $(popupNow).find('.popup__main').height() / -2);
		}
		if($(this).data('film')) {
			$(popupNow).find('.popup_video').attr('src', $(this).data('film'))
		}
		var popupMain =  $('.popup__main');
		if($('html').height() > popupMain.height()) {
			popupMain.removeClass('popup_bigger');
		} else {
			popupMain.addClass('popup_bigger');
		}
	});
	$('.popup__close, .popup__bg').on('click', function() {
		$('body').removeClass('popup-open');
		$('.popup').removeClass('popup_active');
		$('.popup__main').css('margin-top', -100);
		$('.popup_video').attr('src', '')
	});


	$(window).on('load resize', function(){
		console.log('height .poster: ' + $('.poster').height());
		console.log('height .poster__video: ' + $('.poster__video').height());
		var videoHeightCenter = ($('.poster__video').height() - $('.poster').height()) / -2;
		console.log('videoHeightCenter: ' + $('.poster__video').height() + ' - ' + $('.poster').height() + ' / 2 = ' + videoHeightCenter);
		var videoWidthCenter = ($('.poster__video').width() - $('.poster').width()) / -2;
		if(videoHeightCenter < 0) {
			$('.poster__video').css('top', videoHeightCenter) / 2;
		}
		if(videoWidthCenter < 0) {
			$('.poster__video').css('left', videoWidthCenter / 2);
		}
	});

});

// FORMS
$(function() {

	// FIELDS STATES
	$('.form__input, .form__textarea').blur(function() {
		if($.trim(this.value).length) {
			$(this).parent().addClass('form__element_fill');
		} else {
			$(this).parent().removeClass('form__element_fill');
		}
	});

	// TEXTAREA HEIGHT
	$(document)
		.one('focus.textarea', '.autoExpand', function(){
			var savedValue = this.value;
			this.value = '';
			this.baseScrollHeight = this.scrollHeight;
			this.value = savedValue;
		})
		.on('input.textarea', '.autoExpand', function(){
			var minRows = this.getAttribute('data-min-rows')|0,
				rows;
			this.rows = minRows;
			rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
			this.rows = minRows + rows;
			$('.popup_active').find('.popup__main').css('margin-top', $('.popup_active').find('.popup__main').height() / -2);
		});

	$('.form__input-upload[type=file]').change(function(){
		$(this).next().val($(this).val());
	});

	// VALIDATE
	$('#applyForm').validate({
		rules: {
			'name': {
				required: true,
				rangelength: [5, 50]
			},
			'email': {
				required: true,
				email: true
			},
			'message': {
				required: true,
				rangelength: [10, 500]
			}
		},
		messages: {
			'name': {
				required: "Please, enter your name",
				rangelength: "Yor name must have at from {0} to {1} characters"
			},
			'email': {
				required: "Please, enter your Email",
				email: "Invalid mail, please complete"
			},
			'message': {
				required: "Please, enter your message",
				rangelength: "Yor message must have at from {0} to {1} characters"
			}
		}
	});

});

