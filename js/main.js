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



















function changeImage(thumb) {
    // climb up the DOM until we find a parent that contains a .main-image
    let container = thumb.parentElement;
    while (container && !container.querySelector('.main-image')) {
      container = container.parentElement;
    }
    if (!container) return; // safety: no matching container found

    const mainImage = container.querySelector('.main-image');
    if (!mainImage) return;

    // If clicked thumb is already the active one and matches main src, do nothing
    if (thumb.classList.contains('active') && thumb.src === mainImage.src) return;

    // Preload the image (avoids flicker on slow networks)
    const toLoad = new Image();
    toLoad.src = thumb.src;
    toLoad.onload = () => {
      // fade out, swap src, fade in
      mainImage.style.transition = 'opacity 0.18s ease';
      mainImage.style.opacity = 0;
      setTimeout(() => {
        mainImage.src = thumb.src;
        mainImage.style.opacity = 1;
      }, 180);
    };

    // update active class only for thumbnails inside the same container
    container.querySelectorAll('.thumb-grid img').forEach(img => img.classList.remove('active'));
    thumb.classList.add('active');
  }



















(async () => {
  const channelId = "UCqb8IX7ZZ_e2VVbdKjtE4hw";
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const proxyUrl = "https://corsproxy.io/?" + encodeURIComponent(rssUrl);

  const thumbContainer = document.getElementById("thumbContainer");
  const videoTitle = document.getElementById("videoTitle");
  let player, videos = [], currentIndex = 0;

  // Retry helper
  async function fetchWithRetry(url, retries = 5, delay = 1000) {
    for (let i = 0; i < retries; i++) {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Fetch failed");
        const text = await res.text();
        return text;
      } catch (err) {
        console.warn("Fetch failed, retrying...", i + 1);
        await new Promise(r => setTimeout(r, delay));
      }
    }
    throw new Error("Failed to fetch after retries");
  }

  // Load RSS feed
  let xmlText;
  try {
    xmlText = await fetchWithRetry(proxyUrl, 5, 1500);
  } catch (err) {
    videoTitle.textContent = "Failed to load feed after multiple attempts.";
    return;
  }

  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlText, "text/xml");
  const entries = xml.querySelectorAll("entry");
  if (!entries.length) {
    videoTitle.textContent = "No videos found.";
    return;
  }

  // Build video array
  videos = Array.from(entries).map(entry => {
    const title = entry.querySelector("title")?.textContent || "Untitled";
    const videoId = entry.querySelector("yt\\:videoId, videoId")?.textContent?.trim();
    return { title, videoId };
  }).filter(v => v.videoId);

  // Build thumbnails
  videos.forEach((v, i) => {
    const img = document.createElement("img");
    img.src = `https://img.youtube.com/vi/${v.videoId}/mqdefault.jpg`;
    img.dataset.id = v.videoId;
    img.dataset.title = v.title;
    if (i === 0) img.classList.add("active");
    thumbContainer.appendChild(img);
    img.addEventListener("click", () => { currentIndex = i; updatePlayerWithRetry(); });
  });

  // Scroll buttons
  document.getElementById("scrollLeft").addEventListener("click", () => {
    thumbContainer.scrollBy({ left: -200, behavior: "smooth" });
  });
  document.getElementById("scrollRight").addEventListener("click", () => {
    thumbContainer.scrollBy({ left: 200, behavior: "smooth" });
  });

  // Initialize YouTube player
  window.onYouTubeIframeAPIReady = () => {
    player = new YT.Player("player", {
      videoId: videos[currentIndex].videoId,
      events: { onReady: updatePlayerWithRetry, onStateChange: onPlayerStateChange }
    });
  };

  // Update player with retry until loaded
  async function updatePlayerWithRetry(retries = 10, delay = 900) {
    for (let i = 0; i < retries; i++) {
      if (player && typeof player.loadVideoById === "function") {
        const video = videos[currentIndex];
        player.loadVideoById(video.videoId);
        videoTitle.innerHTML = `<a href="https://www.youtube.com/watch?v=${video.videoId}" target="_blank">🎥 ${video.title}</a>`;
        thumbContainer.querySelectorAll("img").forEach((t, idx) => {
          t.classList.toggle("active", idx === currentIndex);
        });
        
      }
      await new Promise(r => setTimeout(r, delay));
    }
    console.warn("Player not ready, retrying later...");
  }

  // Auto-advance when video ends
  function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
      currentIndex = (currentIndex + 1) % videos.length;
      updatePlayerWithRetry();
    }
  }
})();











