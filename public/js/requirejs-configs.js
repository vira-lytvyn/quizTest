require.config({
	baseUrl: "./js", 
  paths : {
  	templates: "../templates",
  	model:     "./app/model",
  	view: 	   "./app/view",
  	controler: "./app/controler",
		app: 		   "./app",
		jquery:    "./bower_components/jquery/dist/jquery",
		can:       "./bower_components/canjs/amd/can"
  }
});

require(['./app/app']);