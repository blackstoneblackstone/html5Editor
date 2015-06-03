var igms = false;

if (typeof initGoogleMaps != 'undefined' && typeof google != 'undefined')
{
	igms = true;
	initGoogleMaps();
}

function initScripts()
{
	if (igms) return;
	
	var $scripts = [
        componentsPath + "modules/admin/maps/google/assets/lib/jquery-ui-map/ui/jquery.ui.map.js",
        componentsPath + "modules/admin/maps/google/assets/lib/jquery-ui-map/ui/jquery.ui.map.extensions.js",
        componentsPath + "modules/admin/maps/google/assets/lib/jquery-ui-map/ui/jquery.ui.map.services.js",
        componentsPath + "modules/admin/maps/google/assets/lib/jquery-ui-map/ui/jquery.ui.map.microformat.js",
        componentsPath + "modules/admin/maps/google/assets/lib/jquery-ui-map/addons/markerclustererplus/markerclusterer.min.js"
    ];
	$.each($scripts, function(k,v){
		if ($('[src="'+v+'"]').length) return true;
		var scriptNode = document.createElement('script');
		
		scriptNode.src = v;
		$('head').prepend($(scriptNode));
	});
	
	$.extend($.ui.gmap.prototype, {
		pagination: function(prop) {
			var $el = $("<div id='pagination' class='btn-group btn-group-lg' style='width: 100%'>"
					+ "<a href='#' class='col-md-2 back-btn btn btn-inverse'>&lsaquo;</a>"
					+ "<a class='col-md-8 display btn btn-inverse'></a>"
					+ "<a href='#' class='col-md-2 fwd-btn btn btn-inverse'>&rsaquo;</a>"
				+ "</div>");

			var self = this, i = 0, prop = prop || 'title';
			self.set('pagination', function(a, b) {
				if (a) {
					i = i + b;
					$el.find('.display').text(self.get('markers')[i][prop]);
					self.get('map').panTo(self.get('markers')[i].getPosition());
				}
			});
			self.get('pagination')(true, 0);
			$el.find('.back-btn').click(function(e) {
				e.preventDefault();
				self.get('pagination')((i > 0), -1, this);
			});
			$el.find('.fwd-btn').click(function(e) {
				e.preventDefault();
				self.get('pagination')((i < self.get('markers').length - 1), 1, this);
			});
			self.addControl($el, google.maps.ControlPosition.TOP_LEFT);			
		}
	});
	igms = true;
}

function initGoogleMaps()
{
	initScripts();

	/*
	 * Clustering
	 */
	if ($('#google-map-clustering').length)
	{
		// We need to bind the map with the "init" event otherwise bounds will be null
		$('#google-map-clustering').gmap({'zoom': 2, 'disableDefaultUI':true}).bind('init', function(evt, map) { 
			var bounds = map.getBounds();
			var southWest = bounds.getSouthWest();
			var northEast = bounds.getNorthEast();
			var lngSpan = northEast.lng() - southWest.lng();
			var latSpan = northEast.lat() - southWest.lat();
			for ( var i = 0; i < 1000; i++ ) {
				var lat = southWest.lat() + latSpan * Math.random();
				var lng = southWest.lng() + lngSpan * Math.random();
				$('#google-map-clustering').gmap('addMarker', { 
					'position': new google.maps.LatLng(lat, lng) 
				}).click(function() {
					$('#google-map-clustering').gmap('openInfoWindow', { content : 'Hello world!' }, this);
				});
			}
			$('#google-map-clustering').gmap('set', 'MarkerClusterer', new MarkerClusterer(map, $(this).gmap('get', 'markers')));
			// To call methods in MarkerClusterer simply call 
			// $('#google-map-clustering').gmap('get', 'MarkerClusterer').callingSomeMethod();
		});
	}
	
	/*
	 * Extend with pagination
	 */
	if ($('#google-map-extend-pagination').length)
	{
		var markers = [
			{'position': '59.32893000000001,18.064910000000054', 'title': 'Stockholm, Sweden' },
			{'position': '35.6894875,139.69170639999993', 'title': 'Tokyo, Japan' },
			{'position': '13.7234186, 100.47623190000002', 'title': 'Bangkok, Thailand' },
			{'position': '51.508129,-0.12800500000003012', 'title': 'London, Great Britain' },
			{'position': '40.7143528,-74.0059731', 'title': 'New York, USA' },
			{'position': '48.856614,2.3522219000000177', 'title': 'Paris, France' },
			{'position': '34.0522342,-118.2436849', 'title': 'Los Angeles, USA' },
			{'position': '55.75,37.616666699999996', 'title': 'Moskva, Ryssia' }
		];
		
		$('#google-map-extend-pagination').gmap({'zoom': 5, 'disableDefaultUI':true, 'callback': function() {
			var self = this;
			$.each(markers, function(i, marker) {
				self.addMarker(marker).click(function() {
					self.openInfoWindow({'content': this.title}, this);
				});
			});
		}}).gmap('pagination', 'title');
	}
	
	/*
	 * Filtering
	 */
	if ($('#google-map-filters').length)
	{
		// format
		String.prototype.format = function() { a = this; for ( k in arguments ) { a = a.replace("{" + k + "}", arguments[k]); } return a; };
		
		$('#google-map-filters').gmap({'disableDefaultUI':true}).bind('init', function(evt, map) { 
			//$('#google-map-filters').gmap('addControl', 'tags-control', google.maps.ControlPosition.TOP_LEFT);
			$('#google-map-filters').gmap('addControl', 'radios', google.maps.ControlPosition.TOP_LEFT);
			var southWest = map.getBounds().getSouthWest();
			var northEast = map.getBounds().getNorthEast();
			var lngSpan = northEast.lng() - southWest.lng();
			var latSpan = northEast.lat() - southWest.lat();
			var images = ['http://google-maps-icons.googlecode.com/files/friends.png', 'http://google-maps-icons.googlecode.com/files/home.png', 'http://google-maps-icons.googlecode.com/files/girlfriend.png', 'http://google-maps-icons.googlecode.com/files/dates.png', 'http://google-maps-icons.googlecode.com/files/realestate.png', 'http://google-maps-icons.googlecode.com/files/apartment.png', 'http://google-maps-icons.googlecode.com/files/family.png'];
			var tags = ['jQuery', 'Google maps', 'Plugin', 'SEO', 'Java', 'PHP', 'C#', 'Ruby', 'JavaScript', 'HTML'];
			//$('#tags').append('<option value="all">All</option>');
			$.each(tags, function(i, tag) {
				//$('#tags').append(('<option value="{0}">{1}</option>').format(tag, tag));
				$('#radios').append(('<label style="margin-right:5px;display:block;"><input type="checkbox" style="margin-right:3px" value="{0}"/>{1}</label>').format(tag, tag));
			});
			for ( i = 0; i < 100; i++ ) {
				var temp = [];
				for ( j = 0; j < Math.random()*5; j++ ) {
					temp.push(tags[Math.floor(Math.random()*10)]);
				}
				$('#google-map-filters').gmap('addMarker', { 'icon': images[(Math.floor(Math.random()*7))], 'tags':temp, 'bound':true, 'position': new google.maps.LatLng(southWest.lat() + latSpan * Math.random(), southWest.lng() + lngSpan * Math.random()) } ).click(function() {
					var visibleInViewport = ( $('#google-map-filters').gmap('inViewport', $(this)[0]) ) ? 'I\'m visible in the viewport.' : 'I\'m sad and hidden.';
					$('#google-map-filters').gmap('openInfoWindow', { 'content': $(this)[0].tags + '<br/>' +visibleInViewport }, this);
				});
			}
			$('input:checkbox').click(function() {
				$('#google-map-filters').gmap('closeInfoWindow');
				$('#google-map-filters').gmap('set', 'bounds', null);
				var filters = [];
				$('input:checkbox:checked').each(function(i, checkbox) {
					filters.push($(checkbox).val());
				});
				if ( filters.length > 0 ) {
					$('#google-map-filters').gmap('find', 'markers', { 'property': 'tags', 'value': filters, 'operator': 'OR' }, function(marker, found) {
						if (found) {
							$('#google-map-filters').gmap('addBounds', marker.position);
						}
						marker.setVisible(found); 
					});
				} else {
					$.each($('#google-map-filters').gmap('get', 'markers'), function(i, marker) {
						$('#google-map-filters').gmap('addBounds', marker.position);
						marker.setVisible(true); 
					});
				}
			});
			
			/*$("#tags").change(function() {
				$('#google-map-filters').gmap('closeInfoWindow');
				$('#google-map-filters').gmap('set', 'bounds', null);
				if ( $(this).val() == 'all' ) {
					$.each($('#google-map-filters').gmap('get', 'markers'), function(i, marker) {
						marker.setVisible(true); 
					});
				} else {
					$('#google-map-filters').gmap('find', 'markers', { 'property': 'tags', 'value': $(this).val() }, function(marker, found) {
						if (found) {
							$('#google-map-filters').gmap('addBounds', marker.position);
						}
						marker.setVisible(found); 
					});
				}
			});*/
		});
	}
	
	/*
	 * Geocoding
	 */
	if ($('#google-map-geocoding').length)
	{
		$('#google-map-geocoding').gmap({
			'zoomControl' : true,
	        'zoomControlOpt': {
	            'style' : 'SMALL',
	            'position' : 'TOP_LEFT'
	        },
	        'panControl' : false,
	        'streetViewControl' : false,
	        'mapTypeControl': false,
	        'overviewMapControl': false,
	        'scrollwheel': false,
	        'mapTypeId': google.maps.MapTypeId.ROADMAP
		}).bind('init', function(event, map) 
		{ 
			var gmgLatLng = new google.maps.LatLng(53.29463136870075, -6.15019965916872);
			$('#google-map-geocoding').gmap('addMarker', {
				'position': gmgLatLng,
				'draggable': true,
				'bounds': false
			}, function(map, marker) {
				$('#modals').append('<div id="dialog'+marker.__gm_id+'" class="hide">' + 
						'<label for="country">Country</label>'+ 
						'<input id="country'+marker.__gm_id+'" type="text" class="form-control" name="country" value=""/>' + 
						'<div class="separator bottom"></div><label for="state">State</label>' + 
						'<input id="state'+marker.__gm_id+'" type="text" class="form-control" name="state" value=""/>' + 
						'<div class="separator bottom"></div><label for="address">Address</label>' + 
						'<input id="address'+marker.__gm_id+'" type="text" class="form-control" name="address" value=""/>' + 
						'<div class="separator bottom"></div><label for="comment">Comment</label>' + 
						'<textarea id="comment" name="comment" class="form-control" rows="5"></textarea>' + 
				'</div>');
			}).dragend( function(event) {
				findLocation(event.latLng, this);
			}).click( function(event) {
				findLocation(event.latLng, this);
			});

			$('#google-map-geocoding').gmap('option', 'center', gmgLatLng );
			$('#google-map-geocoding').gmap('option', 'zoom', 16 );

			$(map).click( function(event) 
			{
				$('#google-map-geocoding').gmap('addMarker', {
					'position': event.latLng, 
					'draggable': true, 
					'bounds': false
				}, function(map, marker) {
					$('#modals').append('<div id="dialog'+marker.__gm_id+'" class="hide">' + 
							'<label for="country">Country</label>'+ 
							'<input id="country'+marker.__gm_id+'" type="text" class="form-control" name="country" value=""/>' + 
							'<div class="separator bottom"></div><label for="state">State</label>' + 
							'<input id="state'+marker.__gm_id+'" type="text" class="form-control" name="state" value=""/>' + 
							'<div class="separator bottom"></div><label for="address">Address</label>' + 
							'<input id="address'+marker.__gm_id+'" type="text" class="form-control" name="address" value=""/>' + 
							'<div class="separator bottom"></div><label for="comment">Comment</label>' + 
							'<textarea id="comment" name="comment" class="form-control" rows="5"></textarea>' + 
					'</div>');
					findLocation(marker.getPosition(), marker);
				}).dragend( function(event) {
					findLocation(event.latLng, this);
				}).click( function() {
					openDialog(this);
				});
			});
		});

		function findLocation(location, marker) {
			$('#google-map-geocoding').gmap('search', {'location': location}, function(results, status) {
				if ( status === 'OK' ) {
					$.each(results[0].address_components, function(i,v) {
						if ( v.types[0] == "administrative_area_level_1" || 
							 v.types[0] == "administrative_area_level_2" ) {
							$('#dialog'+marker.__gm_id + ' [name="state"]').attr('value', v.long_name);
						} else if ( v.types[0] == "country") {
							$('#dialog'+marker.__gm_id + ' [name="country"]').attr('value', v.long_name);
						}
					});
					marker.setTitle(results[0].formatted_address);
					$('#dialog'+marker.__gm_id + ' [name="address"]').attr('value', results[0].formatted_address);
					openDialog(marker);
				}
			});
		}

		function openDialog(marker) {
			bootbox.dialog({
				message: $('#dialog'+marker.__gm_id).html(),
				title: "Edit location",
				buttons: {
					success: {
						'label': 'Save',
						'className': 'btn-success',
						'callback': function(){}
					}, 
					danger: {
						'label': 'Remove',
						'className': 'btn-danger',
						'callback': function(){
							marker.setMap(null);
						}
					}
				}
			});
		}
	}
	
	/*
	 * JSON
	 */
	if ($('#google-map-json').length)
	{
		$('#google-map-json').gmap({
			'zoomControl' : true,
	        'zoomControlOpt': {
	            'style' : 'SMALL',
	            'position' : 'TOP_LEFT'
	        },
	        'panControl' : false,
	        'streetViewControl' : false,
	        'mapTypeControl': false,
	        'overviewMapControl': false,
	        'scrollwheel': false,
	        'mapTypeId': google.maps.MapTypeId.ROADMAP
		}).bind('init', function() { 
			$.getJSON( componentsPath + 'modules/admin/maps/google/assets/lib/jquery-ui-map/data/demo.json', function(data) { 
				$.each( data.markers, function(i, marker) {
					$('#google-map-json').gmap('addMarker', { 
						'position': new google.maps.LatLng(marker.latitude, marker.longitude) 
					}).click(function() {
						$('#google-map-json').gmap('openInfoWindow', { 'content': marker.content }, this);
					});
				});
				$('#google-map-json').gmap('option', 'center', new google.maps.LatLng(data.markers[1].latitude, data.markers[1].longitude) );
				$('#google-map-json').gmap('option', 'zoom', 16 );
			});
		});
	}
	
	/*
	 * Streetview
	 */
	if ($('#google-map-streetview').length)
	{
		$('#google-map-streetview').gmap({ 'disableDefaultUI':true, 'callback': function() {
			var self = this;
			self.microformat('.vevent', function(result, item, index) {
				var clone = $(item).clone().addClass('ui-dialog-vevent').append('<div id="streetview{0}" class="streetview"></div>'.replace('{0}', index));
				clone.find('p').remove();
				var latlng = new google.maps.LatLng(result.location[0].geo[0].latitude['value-title'], result.location[0].geo[0].longitude['value-title']);
				self.addMarker( { 'bounds':true, 'position': latlng, 'title': result.summary, 'icon': 'http://google-maps-icons.googlecode.com/files/music-rock.png' }, function(map, marker) {
					$(item).find('.summary').click( function() {
						$(marker).triggerEvent('click');
						return false;
					});
					$(item).mouseover(function() {
						self.get('map').panTo(marker.getPosition());
					});
				}).click(function() {
					self.get('map').panTo( $(this)[0].getPosition());
					//$(clone).dialog({ 'modal': true, 'width': 530, 'title': result.summary, 'resizable': false, 'draggable': false });
					bootbox.alert($(clone).html());
					self.displayStreetView('streetview{0}'.replace('{0}', index), { 'position': $(this)[0].getPosition() });
				});
			});
		}});
	}

	/*
	 * Fullscreen
	 */

	if ($('#google-fs').length)
	{
		$('#google-fs').height($(window).height() - $('#footer').height() - $('.navbar.main').height() - $('#menu-top').height());

		$('#google-fs').gmap({
			'zoomControl' : true,
	        'zoomControlOpt': {
	            'style' : 'SMALL',
	            'position' : 'TOP_LEFT'
	        },
	        'panControl' : false,
	        'streetViewControl' : false,
	        'mapTypeControl': false,
	        'overviewMapControl': false,
	        'scrollwheel': false,
	        'mapTypeId': google.maps.MapTypeId.ROADMAP
		})
		.bind('init', function() 
		{ 
			$.getJSON( componentsPath + 'modules/admin/maps/google/assets/lib/jquery-ui-map/data/demo.json', function(data) 
			{ 
				$.each( data.markers, function(i, marker) 
				{
					$('#google-fs').gmap('addMarker', 
					{ 
						'position': new google.maps.LatLng(marker.latitude, marker.longitude), 
						'bounds': true,
						'animation': google.maps.Animation.DROP
					})
					.click(function() 
					{
						$('#google-fs').gmap('openInfoWindow', { 'content': marker.content }, this);
					});
				});

				$('#google-fs').gmap('option', 'center', new google.maps.LatLng(data.markers[1].latitude, data.markers[1].longitude) );
				$('#google-fs').gmap('option', 'zoom', 16 );

				setTimeout(function(){
					$('#google-fs').gmap('openInfoWindow', { 'content': data.markers[1].content }, $('#google-fs').gmap('get', 'markers')[1]);
				}, 1000);
			});
		});
	}

	/*
	 * Real Estate
	 */

	var mfsr = $('#google-fs-realestate');
	if (mfsr.length)
	{
		var mfsr_height = 	$(window).height() - 
							$('#footer').height() - 
							$('.navbar.main').height() - 
							$('#menu-top').height(),

			mfsr_module = mfsr.data('module') || 'admin',
			mfsr_url = rootPath + mfsr_module + '/ajax/maps_google_realestate.json',
			mfsr_info_width = 'auto';

			switch (mfsr_module) {
				default:
				case 'admin':
					mfsr_info_width = 240;
					break;
				case 'realestate':
					mfsr_info_width = 330;
					break;
			}

		function msfr_info ( marker ) 
		{
			var content = $('<div/>');
				content.addClass('innerAll inner-2x').html('<div></div>');
				
				if (mfsr_module == 'admin')
					content.prepend('<h4></h4>').find(':header').text(marker.title);
				
				content.find('> div').addClass('msfr_info_content').html(marker.content);

			return content.html();
		}

		if (mfsr_module == 'admin')
			mfsr.height(mfsr_height);

		mfsr.gmap({
			'zoomControl' : true,
	        'zoomControlOptions': {
	            'style' : google.maps.ZoomControlStyle.SMALL,
	            'position' : google.maps.ControlPosition.TOP_RIGHT
	        },
	        'panControl' : false,
	        'streetViewControl' : false,
	        'mapTypeControl': false,
	        'overviewMapControl': false,
	        'scrollwheel': false,
	        'mapTypeId': google.maps.MapTypeId.ROADMAP,
	        'zoom': 16
		})
		.bind('init', function() 
		{ 
			$.getJSON( mfsr_url, function(data) 
			{ 
				$.each( data.markers, function(i, marker) 
				{
					setTimeout(function()
					{
						mfsr.gmap('addMarker', 
						{ 
							'position': new google.maps.LatLng(marker.latitude, marker.longitude),
							'draggable': true,
							'animation': google.maps.Animation.DROP
						})
						.click(function() 
						{
							mfsr.gmap('openInfoWindow', { 'content': msfr_info(marker), 'maxWidth': mfsr_info_width }, this);
						});

						if (i == 1)
						{
							mfsr.gmap('openInfoWindow', { 'content': msfr_info(marker), 'maxWidth': mfsr_info_width }, mfsr.gmap('get', 'markers')[i]);
							mfsr.gmap('option', 'center', new google.maps.LatLng(marker.latitude, marker.longitude) );
						}
					}, 
					300*i);
				});
			});
		});
	}

}