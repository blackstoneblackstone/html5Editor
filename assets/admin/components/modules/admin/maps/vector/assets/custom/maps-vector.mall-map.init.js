$(function()
{

	// mall map
	window.initMallMap = function()
	{
		$('#mall-map').vectorMap({
			map: 'mall',
			backgroundColor: 'transparent',
			markers: [{
				coords: [60, 110],
				name: 'Escalator 1',
				style: {fill: 'yellow'}
			},{
				coords: [260, 95],
				name: 'Escalator 2',
				style: {fill: 'yellow'}
			},{
				coords: [434, 95],
				name: 'Escalator 3',
				style: {fill: 'yellow'}
			},{
				coords: [634, 110],
				name: 'Escalator 4',
				style: {fill: 'yellow'}
			}],
			series: {
				regions: [{
					values: {
						F102: 'SPORTS & OUTDOOR',
						F103: 'HOME DECOR',
						F105: 'FASHION',
						F106: 'OTHER',
						F108: 'BEAUTY & SPA',
						F109: 'FASHION',
						F110: 'BEAUTY & SPA',
						F111: 'URBAN FAVORITES',
						F114: 'SERVICES',
						F166: 'DINING',
						F167: 'FASHION',
						F169: 'DINING',
						F170: 'ENTERTAINMENT',
						F172: 'DINING',
						F174: 'DINING',
						F115: 'KIDS STUFF',
						F117: 'LIFESTYLE',
						F118: 'URBAN FAVORITES',
						F119: 'FASHION',
						F120: 'FASHION',
						F122: 'KIDS STUFF',
						F124: 'KIDS STUFF',
						F125: 'KIDS STUFF',
						F126: 'KIDS STUFF',
						F128: 'KIDS STUFF',
						F129: 'LIFESTYLE',
						F130: 'HOME DECOR',
						F132: 'DINING',
						F133: 'SPORTS & OUTDOOR',
						F134: 'KIDS STUFF',
						F135: 'LIFESTYLE',
						F136: 'LIFESTYLE',
						F139: 'KIDS STUFF',
						F153: 'DINING',
						F155: 'FASHION',
						F156: 'URBAN FAVORITES',
						F157: 'URBAN FAVORITES',
						F158: 'LINGERIE & UNDERWEAR',
						F159: 'FASHION',
						F160: 'FASHION',
						F162: 'FASHION',
						F164: 'FASHION',
						F165: 'FASHION',
						FR01: 'REST ROOMS',
						FR02: 'REST ROOMS',
						FR03: 'REST ROOMS',
						FR04: 'REST ROOMS',
						FFC: 'DINING'
					},
					scale: {
						"FASHION": "#2761ad",
						"LINGERIE & UNDERWEAR": "#d58aa3",
						"BEAUTY & SPA": "#ee549f",
						"URBAN FAVORITES": "#15bbba",
						"SPORTS & OUTDOOR": "#8864ab",
						"KIDS STUFF": "#ef4e36",
						"ENTERTAINMENT": "#e47325",
						"HOME DECOR": "#a2614f",
						"LIFESTYLE": "#8a8934",
						"DINING": "#73bb43",
						"REST ROOMS": "#6c260f",
						"SERVICES": "#504d7c",
						"OTHER": "#c7b789"
					}
				}]
			},
			onRegionLabelShow: function(e, el, code){
				if (el.html() === '') {
					e.preventDefault();
				}
			}
		});
	}
	
	$(window).on('load', function(){

		if ($('#maps_vector_tabs').length)
			return;
		
		setTimeout(function(){
			initMallMap();
		}, 100);
	});
	
});