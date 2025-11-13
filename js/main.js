/** 
 * ===================================================================
 * main js
 *
 * ------------------------------------------------------------------- 
 */ 

(function($) {

	"use strict";

	/*---------------------------------------------------- */
	/* Preloader
	------------------------------------------------------ */ 
   $(window).load(function() {

      // will first fade out the loading animation 
    	$("#loader").fadeOut("slow", function(){

        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(300).fadeOut("slow");

      });       

  	})


  	/*---------------------------------------------------- */
  	/* FitText Settings
  	------------------------------------------------------ */
  	setTimeout(function() {

   	$('#intro h1').fitText(1, { minFontSize: '42px', maxFontSize: '84px' });

  	}, 100);


	/*---------------------------------------------------- */
	/* FitVids
	------------------------------------------------------ */ 
  	$(".fluid-video-wrapper").fitVids();


	/*---------------------------------------------------- */
	/* Owl Carousel
	------------------------------------------------------ */ 
	$("#owl-slider").owlCarousel({
        navigation: false,
        pagination: true,
        itemsCustom : [
	        [0, 1],
	        [700, 2],
	        [960, 3]
	     ],
        navigationText: false
    });


	/*----------------------------------------------------- */
	/* Alert Boxes
  	------------------------------------------------------- */
	$('.alert-box').on('click', '.close', function() {
	  $(this).parent().fadeOut(500);
	});	


	/*----------------------------------------------------- */
	/* Stat Counter
  	------------------------------------------------------- */
   var statSection = $("#stats"),
       stats = $(".stat-count");

   statSection.waypoint({

   	handler: function(direction) {

      	if (direction === "down") {       		

			   stats.each(function () {
				   var $this = $(this);

				   $({ Counter: 0 }).animate({ Counter: $this.text() }, {
				   	duration: 4000,
				   	easing: 'swing',
				   	step: function (curValue) {
				      	$this.text(Math.ceil(curValue));
				    	}
				  	});
				});

       	} 

       	// trigger once only
       	this.destroy();      	

		},
			
		offset: "90%"
	
	});	


	/*---------------------------------------------------- */
	/*	Masonry
	------------------------------------------------------ */
	var containerProjects = $('#folio-wrapper');

	containerProjects.imagesLoaded( function() {

		containerProjects.masonry( {		  
		  	itemSelector: '.folio-item',
		  	resize: true 
		});

	});


	/*----------------------------------------------------*/
	/*	Modal Popup
	------------------------------------------------------*/
   $('.item-wrap a').magnificPopup({

      type:'inline',
      fixedContentPos: false,
      removalDelay: 300,
      showCloseBtn: false,
      mainClass: 'mfp-fade'

   });

   $(document).on('click', '.popup-modal-dismiss', function (e) {
   	e.preventDefault();
   	$.magnificPopup.close();
   });

	
	/*-----------------------------------------------------*/
  	/* Navigation Menu
   ------------------------------------------------------ */  
   var toggleButton = $('.menu-toggle'),
       nav = $('.main-navigation');

   // toggle button
   toggleButton.on('click', function(e) {

		e.preventDefault();
		toggleButton.toggleClass('is-clicked');
		nav.slideToggle();

	});

   // nav items
  	nav.find('li a').on("click", function() {   

   	// update the toggle button 		
   	toggleButton.toggleClass('is-clicked'); 
   	// fadeout the navigation panel
   	nav.fadeOut();   		
   	     
  	});


   /*---------------------------------------------------- */
  	/* Highlight the current section in the navigation bar
  	------------------------------------------------------ */
	var sections = $("section"),
	navigation_links = $("#main-nav-wrap li a");	

	sections.waypoint( {

       handler: function(direction) {

		   var active_section;

			active_section = $('section#' + this.element.id);

			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#main-nav-wrap a[href="#' + active_section.attr("id") + '"]');			

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		}, 

		offset: '25%'
	});


	/*---------------------------------------------------- */
  	/* Smooth Scrolling
  	------------------------------------------------------ */
  	$('.smoothscroll').on('click', function (e) {
	 	
	 	e.preventDefault();

   	var target = this.hash,
    	$target = $(target);

    	$('html, body').stop().animate({
       	'scrollTop': $target.offset().top
      }, 800, 'swing', function () {
      	window.location.hash = target;
      });

  	});  
  

   /*---------------------------------------------------- */
	/*  Placeholder Plugin Settings
	------------------------------------------------------ */ 
	$('input, textarea, select').placeholder()  


  	/*---------------------------------------------------- */
	/*	contact form
	------------------------------------------------------ */

	/* local validation */
	$('#contactForm').validate({

		/* submit via ajax */
		submitHandler: function(form) {

			var sLoader = $('#submit-loader');

			$.ajax({      	

		      type: "POST",
		      url: "inc/sendEmail.php",
		      data: $(form).serialize(),
		      beforeSend: function() { 

		      	sLoader.fadeIn(); 

		      },
		      success: function(msg) {

	            // Message was sent
	            if (msg == 'OK') {
	            	sLoader.fadeOut(); 
	               $('#message-warning').hide();
	               $('#contactForm').fadeOut();
	               $('#message-success').fadeIn();   
	            }
	            // There was an error
	            else {
	            	sLoader.fadeOut(); 
	               $('#message-warning').html(msg);
		            $('#message-warning').fadeIn();
	            }

		      },
		      error: function() {

		      	sLoader.fadeOut(); 
		      	$('#message-warning').html("Something went wrong. Please try again.");
		         $('#message-warning').fadeIn();

		      }

	      });     		
  		}

	});


 	/*----------------------------------------------------- */
  	/* Back to top
   ------------------------------------------------------- */ 
	var pxShow = 300; // height on which the button will show
	var fadeInTime = 400; // how slow/fast you want the button to show
	var fadeOutTime = 400; // how slow/fast you want the button to hide
	var scrollSpeed = 300; // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

   // Show or hide the sticky footer button
	jQuery(window).scroll(function() {

		if (!( $("#header-search").hasClass('is-visible'))) {

			if (jQuery(window).scrollTop() >= pxShow) {
				jQuery("#go-top").fadeIn(fadeInTime);
			} else {
				jQuery("#go-top").fadeOut(fadeOutTime);
			}

		}		

	});		


})(jQuery);



document.getElementById('openWidgetLink').addEventListener('click', function(e) {
    e.preventDefault(); // just in case
    e.stopPropagation(); // prevent bubbling

    // Trigger the Fouita popup button
    const fouitaBtn = document.querySelector('.ft-popup-button .cursor-pointer');
    if (fouitaBtn) fouitaBtn.click();
});















(async () => {
  const channelId = "UCqb8IX7ZZ_e2VVbdKjtE4hw";
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const proxyUrl = "https://api.allorigins.win/get?url=" + encodeURIComponent(rssUrl);

  try {
    const response = await fetch(proxyUrl);
    const data = await response.json();
    const parser = new DOMParser();
    const xml = parser.parseFromString(data.contents, "text/xml");

    const entries = xml.querySelectorAll("entry");
    if (!entries || entries.length === 0) {
      document.getElementById("youtubeWidget").innerHTML = "<p>No videos found.</p>";
      return;
    }

    const videos = Array.from(entries).map(entry => {
      const title = entry.querySelector("title")?.textContent || "Untitled";
      const videoId = entry.querySelector("yt\\:videoId, videoId")?.textContent?.trim();
      return { title, videoId };
    }).filter(v => v.videoId);

    const widget = document.getElementById("youtubeWidget");
    widget.innerHTML = `
      <div id="player"></div>
      <h3 id="videoTitle"><a href="https://www.youtube.com/watch?v=${videos[0].videoId}" target="_blank">🎥 ${videos[0].title}</a></h3>
      <div class="thumb-container" id="thumbContainer">
        ${videos.map((v,i) => `<img src="https://img.youtube.com/vi/${v.videoId}/mqdefault.jpg" data-id="${v.videoId}" data-title="${v.title}" class="${i===0?'active':''}">`).join('')}
      </div>
      <div class="nav-buttons">
        <button id="scrollLeft">&lt;</button>
        <button id="scrollRight">&gt;</button>
      </div>
    `;

    const thumbContainer = document.getElementById("thumbContainer");
    const thumbs = thumbContainer.querySelectorAll("img");
    const videoTitle = document.getElementById("videoTitle");
    let currentIndex = 0;
    let player;

    // Initialize YouTube player
    window.onYouTubeIframeAPIReady = () => {
      player = new YT.Player('player', {
        videoId: videos[currentIndex].videoId,
        events: { 'onStateChange': onPlayerStateChange }
      });
    };

    // Click thumbnail only works if player is ready
    thumbs.forEach((thumb, index) => {
      thumb.addEventListener("click", () => {
        currentIndex = index;
        if (player && typeof player.loadVideoById === "function") {
          updatePlayer(currentIndex);
        }
      });
    });

    // Scroll buttons
    document.getElementById("scrollLeft").addEventListener("click", () => {
      thumbContainer.scrollBy({ left: -200, behavior: 'smooth' });
    });
    document.getElementById("scrollRight").addEventListener("click", () => {
      thumbContainer.scrollBy({ left: 200, behavior: 'smooth' });
    });

    function updatePlayer(index) {
      if (!player || typeof player.loadVideoById !== "function") return;
      const video = videos[index];
      player.loadVideoById(video.videoId);
      videoTitle.innerHTML = `<a href="https://www.youtube.com/watch?v=${video.videoId}" target="_blank">🎥 ${video.title}</a>`;
      thumbs.forEach(t => t.classList.remove("active"));
      thumbs[index].classList.add("active");
      thumbs[index].scrollIntoView({ behavior: "smooth", inline: "center" });
    }

    function onPlayerStateChange(event) {
      if (event.data === YT.PlayerState.ENDED) {
        currentIndex = (currentIndex + 1) % videos.length;
        updatePlayer(currentIndex);
      }
    }

  } catch (err) {
    console.error(err);
    document.getElementById("youtubeWidget").innerHTML = "<p>Failed to load videos.</p>";
  }
})();



