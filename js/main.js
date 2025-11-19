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

































(async () => {
  const channelId = "UCqb8IX7ZZ_e2VVbdKjtE4hw";
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const corsProxies = [
    "https://corsproxy.io/?",
    "https://api.allorigins.win/raw?url=",
    "https://thingproxy.freeboard.io/fetch/"
  ];

  const thumbContainer = document.getElementById("thumbContainer");
  const videoTitle = document.getElementById("videoTitle");
  const scrollLeftBtn = document.getElementById("scrollLeft");
  const scrollRightBtn = document.getElementById("scrollRight");

  let player;
  let videos = [];
  let currentIndex = 0;

  async function fetchWithFallback(url, retries = 3, delay = 1000) {
    for (const proxy of corsProxies) {
      for (let attempt = 1; attempt <= retries; attempt++) {
        try {
          const response = await fetch(proxy + encodeURIComponent(url));
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return await response.text();
        } catch (error) {
          console.warn(`Proxy failed: ${proxy}, attempt ${attempt}`, error);
          await new Promise(res => setTimeout(res, delay));
        }
      }
    }
    throw new Error("All proxy attempts failed.");
  }

  function parseFeed(xmlText) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, "text/xml");
    const entries = xml.querySelectorAll("entry");

    return Array.from(entries).map(entry => {
      const title = entry.querySelector("title")?.textContent || "Untitled";
      const videoId = entry.querySelector("yt\\:videoId, videoId")?.textContent?.trim();
      return videoId ? { title, videoId } : null;
    }).filter(Boolean);
  }

  function createThumbnail(video, index) {
    const img = document.createElement("img");
    img.src = `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`;
    img.dataset.index = index;
    img.alt = video.title;
    if (index === 0) img.classList.add("active");
    img.addEventListener("click", () => {
      currentIndex = index;
      updatePlayer();
    });
    thumbContainer.appendChild(img);
  }

  function updatePlayer() {
    if (!player || typeof player.loadVideoById !== "function") {
      setTimeout(updatePlayer, 300);
      return;
    }

    const video = videos[currentIndex];
    player.loadVideoById(video.videoId);
    videoTitle.innerHTML = `<a href="https://www.youtube.com/watch?v=${video.videoId}" target="_blank">🎥 ${video.title}</a>`;

    [...thumbContainer.children].forEach((img, i) =>
      img.classList.toggle("active", i === currentIndex)
    );
  } // ✅ properly closed updatePlayer

  function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
      currentIndex = (currentIndex + 1) % videos.length;
      updatePlayer();
    }
  }

  function initScrollButtons() {
    scrollLeftBtn.addEventListener("click", () => {
      thumbContainer.scrollBy({ left: -200, behavior: "smooth" });
    });
    scrollRightBtn.addEventListener("click", () => {
      thumbContainer.scrollBy({ left: 200, behavior: "smooth" });
    });
  }

  function loadYouTubeAPI() {
    return new Promise(resolve => {
      if (window.YT && window.YT.Player) return resolve();
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      window.onYouTubeIframeAPIReady = resolve;
      document.head.appendChild(tag);
    });
  }

  try {
    const xmlText = await fetchWithFallback(rssUrl, 3, 1500);
    videos = parseFeed(xmlText);
    if (videos.length === 0) throw new Error("No videos found.");

    videos.forEach(createThumbnail);
    initScrollButtons();
    await loadYouTubeAPI();

    player = new YT.Player("player", {
      videoId: videos[currentIndex].videoId,
      playerVars: { origin: window.location.origin },
      events: {
        onReady: updatePlayer,
        onStateChange: onPlayerStateChange
      }
    });
  } catch (error) {
    console.error("Initialization failed:", error);
    videoTitle.textContent = "⚠️ Unable to load videos.";
  }
})();









    

















