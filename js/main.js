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



	const rssUrl = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCqb8IX7ZZ_e2VVbdKjtE4hw';
let playlist = [];
let currentSong = 0;
let player;
let playerReady = false;
let playlistReady = false;

const getEl = id => document.getElementById(id);
const songEl    = getEl("song");
const artistEl  = getEl("artist");
const albumEl   = getEl("album");
const artworkEl = getEl("artwork");
const playBtn   = getEl("play");
const pauseBtn  = getEl("pause");
const nextBtn   = getEl("next");
const prevBtn   = getEl("previous");

function setControlsEnabled(enabled){
  [playBtn,pauseBtn,nextBtn,prevBtn].forEach(btn=>{
    if(!btn) return;
    btn.disabled = !enabled;
    btn.style.opacity = enabled ? "1":"0.5";
    btn.style.cursor = enabled ? "pointer":"not-allowed";
  });
}
setControlsEnabled(false);

(function loadYouTubeAPI(){
  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);
})();

function onYouTubeIframeAPIReady(){
  player = new YT.Player('player',{
    height:'0', width:'0',
    playerVars:{autoplay:0,controls:0,enablejsapi:1,modestbranding:1},
    events:{onReady:onPlayerReady,onStateChange:onPlayerStateChange}
  });
}

function onPlayerReady(){
  playerReady = true;
  fetchPlaylist().then(()=>{
    playlistReady = true;
    if(playerReady && playlistReady){
      loadSong();
      setControlsEnabled(true);
    }
  }).catch(err=>{
    console.error("Failed to fetch playlist",err);
    alert("Failed to load playlist. See console.");
  });
}

async function fetchPlaylist(){
  const fetchUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(rssUrl);
  const resp = await fetch(fetchUrl);
  if(!resp.ok) throw new Error("Network response not ok "+resp.status);
  const text = await resp.text();
  const parser = new DOMParser();
  const xml = parser.parseFromString(text,"application/xml");
  const parserError = xml.querySelector('parsererror');
  if(parserError) throw new Error("Failed to parse RSS XML");
  const entries = xml.querySelectorAll('entry');
  playlist = [];
  entries.forEach(entry=>{
    const idNode = entry.querySelector('id');
    if(!idNode) return;
    let videoId = idNode.textContent.replace('yt:video:','').trim();
    if(!videoId) return;
    const title = entry.querySelector('title')?.textContent.trim() || "Untitled";
    const author = entry.querySelector('author > name')?.textContent.trim() || "";
    const thumb = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    playlist.push({song:title,album:"",artist:author,artwork:thumb,youtubeId:videoId});
  });
  if(playlist.length===0) throw new Error("No videos found");
}

function loadSong(){
  if(!playlist||playlist.length===0) return;
  const track = playlist[currentSong];
  songEl.textContent = track.song;
  artistEl.textContent = track.artist;
  albumEl.textContent = track.album;
  artworkEl.style.backgroundImage = `url(${track.artwork})`;
  if(player && typeof player.loadVideoById==='function'){
    player.loadVideoById(track.youtubeId);
    try{player.pauseVideo();}catch(e){}
  }
}

function safe(fn){return function(){if(!playerReady||!playlistReady){console.warn("Not ready");return;}try{fn();}catch(e){console.error(e);}}}

if(playBtn) playBtn.addEventListener('click',safe(()=>{
  player.playVideo();
  playBtn.style.display="none";
  if(pauseBtn) pauseBtn.style.display="inline-block";
}));

if(pauseBtn) pauseBtn.addEventListener('click',safe(()=>{
  player.pauseVideo();
  pauseBtn.style.display="none";
  if(playBtn) playBtn.style.display="inline-block";
}));

if(nextBtn) nextBtn.addEventListener('click',safe(()=>{
  currentSong = (currentSong+1)%playlist.length;
  loadSong();
  player.playVideo();
}));

if(prevBtn) prevBtn.addEventListener('click',safe(()=>{
  currentSong = (currentSong-1+playlist.length)%playlist.length;
  loadSong();
  player.playVideo();
}));

function onPlayerStateChange(event){
  if(event && event.data===YT.PlayerState.ENDED){
    currentSong = (currentSong+1)%playlist.length;
    loadSong();
    try{player.playVideo();}catch(e){}
  }
}


})(jQuery);
