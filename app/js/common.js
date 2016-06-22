// SECTIONS NAVIGATION
$(function() {

	$('.nav__trigger, .nav__blocker').on('click', function() {
		$('body').toggleClass('nav-open');
	});

	$('.nav__panel, .panel__blocker').on('click', function() {
		$('body').toggleClass('panel-open');
	});

	$('.nav__close').on('click', function() {
		$('body').removeClass('nav-open').removeClass('panel-open');
	});

	$(window).scroll(function() {
		var windscroll = $(window).scrollTop();
		if (windscroll > 0) {
			$('.header').addClass('header_fixed');
		} else {
			$('.header').removeClass('header_fixed');
		}
	}).scroll();

	$('.panel__up').click(function(){
		$('html, body').animate({
			scrollTop: $( $.attr(this, 'href') ).offset().top
		}, 500);
		return false;
	});

	$('.post__faq-link').click(function(){
		$('html, body').animate({
			scrollTop: $( $.attr(this, 'href') ).offset().top - 140
		}, 500);
		return false;
	});

	// accordion
	$('.accordion__head').click(function(){
		console.log('123');
		var accordionItem = $(this).parent();
		if(accordionItem.hasClass("accordion__item_active")) {
			accordionItem.find('.accordion__body').slideUp(300);
		} else {
			accordionItem.find('.accordion__body').slideDown(300);
			accordionItem.siblings().find('.accordion__body').slideUp(300);
		}
		accordionItem.toggleClass('accordion__item_active').siblings().removeClass('accordion__item_active');
	});

	// members
	$('.form_member').on('click', '.button', function(e){
		e.preventDefault();

		$('.table__body').append('<div class="table__row">' +
			'<div class="table_td table_td_name">TestName</div>' +
			'<div class="table_td table_td_age">-</div>' +
			'<div class="table_td table_td_menu"><a href="#">Menu Planner</a></div>' +
			'<div class="table_td table_td_edit"><a class="table__action" href="#"><img class="table__ico" src="./public/images/ico_edit_green.png" alt=""></a></div>' +
			'<div class="table_td table_td_cancel"><a class="table__action" href="#"><img class="table__ico" src="./public/images/ico_cancel_green.png" alt=""></a></div>' +
			'</div>');

		var familyCount = $('.table__body .table__row').size();

		if(familyCount >= 5){
			$('.panel_member').hide();
		}
	});

	$('.table_family').on('click', '.table_td_cancel', function(e){
		e.preventDefault();

		$(this).closest('.table__row').remove();

		var familyCount = $('.table__body .table__row').size();

		if(familyCount < 5){
			$('.panel_member').show();
		}
	});

	//steps
	$('.button_url').on('click', function(e){
		e.preventDefault();
	});



//	$('.js-popup').on('click', function(e) {
//		e.preventDefault();
//		$('body').addClass('popup-open');
//		var popupNow = '.popup_' + $(this).data('popup');
//		$(popupNow).addClass('popup_active');
//		var popupNowMain =  $(popupNow).find('.popup__main');
//		if($('html').height() > popupNowMain.height()) {
//			popupNowMain.css('margin-top', $(popupNow).find('.popup__main').height() / -2);
//		}
//		if($(this).data('film')) {
//			$(popupNow).find('.popup_video').attr('src', $(this).data('film'))
//		}
//		var popupMain =  $('.popup__main');
//		if($('html').height() > popupMain.height()) {
//			popupMain.removeClass('popup_bigger');
//		} else {
//			popupMain.addClass('popup_bigger');
//		}
//	});
//	$('.popup__close, .popup__bg').on('click', function() {
//		$('body').removeClass('popup-open');
//		$('.popup').removeClass('popup_active');
//		$('.popup__main').css('margin-top', -100);
//		$('.popup_video').attr('src', '')
//	});
//
//
//	$(window).on('load resize', function(){
//		console.log('height .poster: ' + $('.poster').height());
//		console.log('height .poster__video: ' + $('.poster__video').height());
//		var videoHeightCenter = ($('.poster__video').height() - $('.poster').height()) / -2;
//		console.log('videoHeightCenter: ' + $('.poster__video').height() + ' - ' + $('.poster').height() + ' / 2 = ' + videoHeightCenter);
//		var videoWidthCenter = ($('.poster__video').width() - $('.poster').width()) / -2;
//		if(videoHeightCenter < 0) {
//			$('.poster__video').css('top', videoHeightCenter) / 2;
//		}
//		if(videoWidthCenter < 0) {
//			$('.poster__video').css('left', videoWidthCenter / 2);
//		}
//	});
//
});

// FORMS
//$(function() {
//
//	// FIELDS STATES
//	$('.form__input, .form__textarea').blur(function() {
//		if($.trim(this.value).length) {
//			$(this).parent().addClass('form__element_fill');
//		} else {
//			$(this).parent().removeClass('form__element_fill');
//		}
//	});
//
//	// TEXTAREA HEIGHT
//	$(document)
//		.one('focus.textarea', '.autoExpand', function(){
//			var savedValue = this.value;
//			this.value = '';
//			this.baseScrollHeight = this.scrollHeight;
//			this.value = savedValue;
//		})
//		.on('input.textarea', '.autoExpand', function(){
//			var minRows = this.getAttribute('data-min-rows')|0,
//				rows;
//			this.rows = minRows;
//			rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
//			this.rows = minRows + rows;
//			$('.popup_active').find('.popup__main').css('margin-top', $('.popup_active').find('.popup__main').height() / -2);
//		});
//
//	$('.form__input-upload[type=file]').change(function(){
//		$(this).next().val($(this).val());
//	});
//
//	// VALIDATE
//	$('#applyForm').validate({
//		rules: {
//			'name': {
//				required: true,
//				rangelength: [5, 50]
//			},
//			'email': {
//				required: true,
//				email: true
//			},
//			'message': {
//				required: true,
//				rangelength: [10, 500]
//			}
//		},
//		messages: {
//			'name': {
//				required: "Please, enter your name",
//				rangelength: "Yor name must have at from {0} to {1} characters"
//			},
//			'email': {
//				required: "Please, enter your Email",
//				email: "Invalid mail, please complete"
//			},
//			'message': {
//				required: "Please, enter your message",
//				rangelength: "Yor message must have at from {0} to {1} characters"
//			}
//		}
//	});
//
//});
//
