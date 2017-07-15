class GameEngine {
    constructor(height, width, nbPlayers) {
        this.height = height;
        this.width = width;
        this.tableau = new Array();
        this.colors = ['#2ecc71', '#3498db', '#9b59b6', '#e74c3c', '#95a5a6', '#2c3e50', '#e67e22'];
        this.caseHeight = 100/this.height + '%';
        this.caseWidth = 100/this.width + '%';
        this.nbPlayers = nbPlayers;
        this.players = new Array();
        this.postitionsStart = [
            { 'x': 0, 'y': 0 }, 
            { 'x': this.width-1, 'y': this.height-1},
            { 'x': this.width-1, 'y': 0 },
            { 'x': 0, 'y': this.height-1 }
        ]
    }

    init() {
        // Init tableau
        this.tableau = new Array(this.height);
        for (var i=0; i<this.height; i++) {
            this.tableau[i] = new Array(this.width);
            for (var j=0; j<this.width; j++) {
                var index = Math.floor(Math.random() * this.colors.length);
                this.tableau[i][j] = {
                    'color': this.colors[index],
                    'playerId': null,
                    'positionX': 100*j/this.width+'%',
                    'positionY': 100*i/this.height+'%'
                }
            }
        }
        this.initPlayers();
        
        return this;
    }

    initPlayers() {
        this.players = new Array(this.nbPlayers);
        for (var i=0; i<this.nbPlayers; i++) {
            this.players[i] = {
                'id': i,
                'name': 'Player ' + i,
            }
            // set start positions in the tableau (array)
            this.tableau[this.postitionsStart[i].y]
                        [this.postitionsStart[i].x].playerId = i;
            
        }
    }

    play(playerId, color) {
        var keepGoing = true;
        while(keepGoing) {
            keepGoing = false;
            // loop throw all the tableau
            for (var i=0; i<this.height; i++) {
                for (var j=0; j<this.width; j++) {
                    // if the case belong to the player
                    if (this.tableau[i][j].playerId == playerId) {
                        this.tableau[i][j].color = color;
                    }
                    // console.log(i, j, this.hasNeighborCaseConquer(i, j, playerId));
                    // if the the palyer can conquer this case
                    if (this.tableau[i][j].playerId == null &&
                        this.tableau[i][j].color == color &&
                        this.hasNeighborCaseConquer(i, j, playerId)
                    ) {
                        this.tableau[i][j].playerId = playerId;
                        this.tableau[i][j].color = color;
                        keepGoing = true;
                    }
                }
            }
        }
    }

    hasNeighborCaseConquer(caseX, caseY, playerId) {
        var x, y;

        x = caseX, y = caseY+1;
        if (this.isInTheTableau(x, y)) {
            if (this.tableau[x][y].playerId == playerId) return true;
        }

        x = caseX+1; y = caseY;
        if (this.isInTheTableau(x, y)) {
            if (this.tableau[x][y].playerId == playerId) return true;
        }

        x = caseX; y = caseY-1;
        if (this.isInTheTableau(x, y)) {
            if (this.tableau[x][y].playerId == playerId) return true;
        }

        x = caseX-1; y = caseY;
        if (this.isInTheTableau(x, y)) {
            if (this.tableau[x][y].playerId == playerId) return true;
        }

        return false;
    }
    
    isInTheTableau(x, y) {
        return (
            x>=0 &&
            y>=0 &&
            y<this.tableau.length &&
            x<this.tableau[0].length
        );
    }

    
}