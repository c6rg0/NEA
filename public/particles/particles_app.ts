// particlesJS.load(@dom-id, @path-json, @callback (optional));

declare var particlesJS: any;

particlesJS.load('particles-js', '/particles/particles.json', function() {
	console.log('callback - particles.js config loaded');
});

