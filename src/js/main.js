$(function () {	
	
	// TOOLTIP
 	$('[data-toggle="tooltip"]').tooltip();   
	
	
	// POPOVER
	$('[data-toggle="popover"]').popover();
	
	
	// ORDER CHANGE
	$('.select-swap').on("click", function(e) {
		e.preventDefault();
			
		var cityStart = $('.airport-select__arrival option:selected').html();
		var cityEnd = $('.airport-select__departure option:selected').html();

		$('.airport-select__arrival option:selected').html(cityEnd);
		$('.airport-select__departure option:selected').html(cityStart);
	});
	// END --> ORDER CHANGE	
	
	
	
	// VIEW DETAILS 
	$('.section__content__more').hide();
	
	$('.js-btn-more').on("click", function(e) {
		e.preventDefault();

    	let currentSection = $(this).parents( "section.flights-info" );
		let currentButton = currentSection.find( ".js-btn-more" );
		
		currentSection.toggleClass('is-open');
		
		currentSection.find( ".section__content__more" ).slideToggle();	
		currentButton.html( currentButton.html() == 'View details' ? 'Hide details' : 'View details' );		
    });
	// END --> VIEW DETAILS 
	
	
	
	// FLIGHTS-DIRECTION-SM-DOWN
	$('section.flights-info').find( '.section__content__more div.row > div:eq(0)' ).before('<div class="flight-direction">Outbound &dArr;<div>');
	$('section.flights-info').find( '.section__content__more div.row > div:eq(2)' ).before('<div class="flight-direction">Return &dArr;<div>');			
	// END --> FLIGHTS-DIRECTION-SM-DOWN
	
	
	
	// FAVORITES-SORT 
	$('.btn-favorites').on("click", function(e) {
		e.preventDefault();

		if ( $(this).hasClass('is-active') ) {
			$('section.flights-info').show();
			$(this).toggleClass('is-active');
		} else if ( !$('.js-btn-like').hasClass('is-liked') ) {
			alert('No favorites flights.');
		} else {
			$(this).toggleClass('is-active');
		
			$('section.flights-info').hide();
			$('.js-btn-like.is-liked').parents( "section.flights-info" ).show();
		}		
    });
	// END --> FAVORITES-SORT 
		
	
	
	// LIKE-BUTTON	
	$('.js-btn-like').on("click", function(e) {
		e.preventDefault();

		$(this).toggleClass('is-liked');
    });
	// END --> LIKE-BUTTON

});