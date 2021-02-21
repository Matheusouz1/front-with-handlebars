var Demo = (function() {

	function output(node) {
		var existing = $('#result .croppie-result');
		if (existing.length > 0) {
			existing[0].parentNode.replaceChild(node, existing[0]);
		}
		else {
			$('#result')[0].appendChild(node);
		}
	}

	function popupResult(result) {
		var html;
		if (result.html) {
			html = result.html;
		}
		if (result.src) {
			html = '<img src="' + result.src + '" />';
		}
		swal({
			title: '',
			html: true,
			text: html,
			allowOutsideClick: true
		});
		setTimeout(function(){
			$('.sweet-alert').css('margin', function() {
				var top = -1 * ($(this).height() / 2),
					left = -1 * ($(this).width() / 2);

				return top + 'px 0 0 ' + left + 'px';
			});
		}, 1);
	}
	// imgPreview.style.height=window.innerWidth+"px";
	var telas = document.querySelectorAll('.cover')
	var corpdivs = document.querySelectorAll('.upload-demo-wrap')
	for(let tela of telas){
		tela.style.height = screen.width+"px"
	}
	for(let cropdiv of corpdivs){
		cropdiv.style.height = screen.width+"px"
		cropdiv.style.maxHeight = "800px"
		
	}
	window.onresize=()=>{
		for(let tela of telas){
			tela.style.height = screen.width+"px"
		}
		// imgPreview.style.height=window.innerWidth+"px";
	}

	function demoUpload() {
		var $uploadCrop;
		var dropDownCrop = document.querySelector(".dropodowncrop")
		var saveButton = document.querySelector(`.upload-result`)
		var vEl = document.getElementById('upload-demo'),
			vanilla = new Croppie(vEl, {
			viewport: { width: 300, height: 300 },
			boundary: { width: 350, height: 350},
			showZoomer: false,
            enableOrientation: true
		});
		function readFile(input) {
			dropDownCrop.style.display="flex"
			console.log('hello')
			
			
			saveButton.style.display='block'
			saveButton.removeAttribute('disabled')
			if (input.files && input.files[0]) {
			   var reader = new FileReader();
			   
			   reader.onload = function (e) {
				   $('.upload-demo').addClass('ready');
				   vanilla.bind({
					   url: e.target.result
				   }).then(function(){
					   console.log('jQuery bind complete');
				   });
			   }
			   
			   reader.readAsDataURL(input.files[0]);
		   }
		   else {
			   swal("Sorry - you're browser doesn't support the FileReader API");
		   }
	   }


        vEl.addEventListener('update', function (ev) {
        	// console.log('vanilla update', ev);
		});
		var inputs = document.querySelector('#id_image')
			inputs.addEventListener('change',function () { readFile(this);})
		var inputs2 = document.querySelectorAll('#fotoInput2')
		for (let i of inputs2){
			i.addEventListener('change',function () { readFile(this);})
		}
		var fieldB64 = document.querySelector('#id_image_base64')
		document.querySelector('.upload-result').addEventListener('click', function (ev) {
			vanilla.result({
				type: 'canvas'
			}).then(function (resp) {
				// console.log(resp)
				fieldB64.value=resp
				console.log(fieldB64.value)
				dropDownCrop.style.display='none'
			});
		});

		$('.vanilla-rotate').on('click', function(ev) {
			vanilla.rotate(parseInt($(this).data('deg')));
		});
		var closeIcon = document.querySelector('.closeDropD')
		
		closeIcon.onclick=()=>{
			dropDownCrop.style.display="none"
			for (let i of inputs2){
				i.value=''
			}
		}
	}
		
	

	// function demoUpload() {
	// 	var $uploadCrop;
	// 	var dropDownCrop = document.querySelector(".dropodowncrop")
	// 	var imgPreview = document.querySelector(`.cover`)
	// 	var saveButton = document.querySelector(`.upload-result`)
	// 	var formFoto = document.querySelector(`.fotoProduto`)

	// 	var fotoContainer
	// 	var imgPreview
	// 	function readFile(input) {
	// 		dropDownCrop.style.display="flex"

			
			
	// 		saveButton.style.display='block'
	// 		saveButton.removeAttribute('disabled')
 	// 		if (input.files && input.files[0]) {
	//             var reader = new FileReader();
	            
	//             reader.onload = function (e) {
	// 				$(`.upload-demo`).addClass('ready');
	//             	$uploadCrop.croppie('bind', {
	//             		url: e.target.result
	//             	}).then(function(){
	//             		console.log('jQuery bind complete');
	//             	});
	            	
	//             }
	            
	//             reader.readAsDataURL(input.files[0]);
	//         }
	//         else {
	// 	        swal("Sorry - you're browser doesn't support the FileReader API");
	// 		}
			
	// 	}

		
	// 	$uploadCrop = $(`#upload-demo`).croppie({
	// 		viewport: {
	// 			width:300 ,
	// 			height:300
	// 		},
	// 		enableExif: true
	// 	});
	// 	var inputs = document.querySelector('#id_image')
	// 		inputs.addEventListener('change',function () { readFile(this);})
	// 	var inputs2 = document.querySelectorAll('#fotoInput2')
	// 	for (let i of inputs2){
	// 		i.addEventListener('change',function () { readFile(this);})
	// 	}
	// 	var fieldB64 = document.querySelector('#id_image_base64')

	// 	$(`.upload-result`).on('click', function (ev) {
	// 		$uploadCrop.croppie('result', {
	// 			type: 'canvas',
	// 			size: {
	// 				With:500,

	// 				height: 500,}
	// 		}).then(function (resp) {
	// 			console.log(resp)
	// 			fieldB64.value=resp
	// 			dropDownCrop.style.display='none'
				

				
	// 		});
	// 	});
	// 	var closeIcon = document.querySelector('.closeDropD')
		
	// 	closeIcon.onclick=()=>{
	// 		dropDownCrop.style.display="none"
	// 		for (let i of inputs2){
	// 			i.value=''
	// 		}
	// 	}
		
	// }

	function bindNavigation () {
		var $html = $('html');
		$('nav a').on('click', function (ev) {
			var lnk = $(ev.currentTarget),
				href = lnk.attr('href'),
				targetTop = $('a[name=' + href.substring(1) + ']').offset().top;

			$html.animate({ scrollTop: targetTop });
			ev.preventDefault();
		});
	}

	function init() {
				bindNavigation();
				demoUpload();
	}

	return {
		init: init
	};
})();


// Full version of `log` that:
//  * Prevents errors on console methods when no console present.
//  * Exposes a global 'log' function that preserves line numbering and formatting.
(function () {
  var method;
  var noop = function () { };
  var methods = [
      'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
      'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
      'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
      'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});
 
  while (length--) {
    method = methods[length];
 
    // Only stub undefined methods.
    if (!console[method]) {
        console[method] = noop;
    }
  }
 
 
  if (Function.prototype.bind) {
    window.log = Function.prototype.bind.call(console.log, console);
  }
  else {
    window.log = function() { 
      Function.prototype.apply.call(console.log, console, arguments);
    };
  }
})();
