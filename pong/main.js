// primer objeto (pizarron) se coloca dentro de una funcion anónima para que no tengamos que contaminar el scope general del proyecto 
(function(){
	self.Board = function(width,height){
		//asignar a variables de la clase, variables del objeto
		this.width = width;
		this.height = height;
		// dos variables booleanas (si el juego se esta jugando o el juego esta terminado)
		this.playing = false;
		this.game_over = false;
		this.bars = [];
		this.ball = null;
	}

// modificar el prototipo de la clase para colocar los metodos
	self.Board.prototype = {
		get elements(){
			//barras que controla el usuario
			var elements = this.bars;
			//pelota
			elements.push(this.ball);
			//retornar todos los elementos que hay en el tablero
			return elements;
		}
	}
})();
//barras
(function(){
	self.Bar = function(x,y,width,height,board){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.board = board;
		// accedo al board, al arreglo bars y le agrego un nuevo elemento con push que es esta barra
		this.board.bars.push(this);
		//para dibujar las cosas se necesita la variable especial que nos dice si es un circulo, cuadrado, etc. 
		this.kind = "rectangle";
	}
	self.Bar.prototype = {
		down: function(){

		},
		up: function(){

		}
	}
})();

// declarar una nueva clase BoardView que va a recibir el canvas u un objeto board
(function(){
	self.BoardView = function(canvas,board){
		this.canvas = canvas;
		this.canvas.width = board.width;
		this.canvas.height = board.height;
		this.board = board;
		//contexto = el objecto a traves del cual podemos dibujar en JS
		this.ctx = canvas.getContext("2d");
	}

	self.BoardView.prototype = {
		draw: function(){
			for (var i = this.board.elements.length - 1; i >= 0; i--) {
				var el = this.board.elements[i];

				draw(this.ctx,el);
			}
		}
	}

	function draw(ctx,element){
		if(element !== null && element.hasOwnProperty("kind")){
			switch(element.kind){
				case "rectangle":
					ctx.fillRect(element.x,element.y,element.width,element.height);
					break;
			}
		}
	}
})();
//mostrar main cuando se cargue la ventana
window.addEventListener("load",main);

function main(){
	var board = new Board(800,400);
	var bar = new Bar(70,100,40,100,board);
	var bar = new Bar(735,100,40,100,board);
	var canvas = document.getElementById('canvas');
	var board_view = new BoardView(canvas,board);
	board_view.draw();
	console.log(board)
}

