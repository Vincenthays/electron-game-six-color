class Case {
    constructor(positionX, positionY, color, playerId) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.color = color;
        this.playerId = playerId;
    }
}

class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.score = 0;
    }
}

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
        this.currentPlayerId = 0;
        this.gameFinised = false;
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
                this.tableau[i][j] = new Case(
                    100*j/this.width+'%',
                    100*i/this.height+'%',
                    this.colors[index],
                    null
                );
            }
        }
        this.initPlayers();

        return this;
    }

    initPlayers() {
        // clear the previous players
        for (var i=0; i<this.postitionsStart.length; i++) {

            this.tableau[this.postitionsStart[i].y]
                        [this.postitionsStart[i].x].playerId = null;    
        }
        // create the new players
        this.players = new Array(this.nbPlayers);
        for (var i=0; i<this.nbPlayers; i++) {
            // register players
            this.players[i] = new Player (i, 'Player ' + i);
            // set start positions in the tableau (array)
            this.tableau[this.postitionsStart[i].y]
                        [this.postitionsStart[i].x].playerId = i;
        }
    }

    play(color) {
        this.colorPlay(color);
        // if the game is not finised
        if (!this.gameFinised) {
            if (this.currentPlayerId + 2 > this.nbPlayers) {
                this.currentPlayerId = 0;
            } else {
                this.currentPlayerId += 1;
            }
        }

        
    }

    colorPlay(color) {
        var keepGoing = true;
        while(keepGoing) {
            keepGoing = false;
            // loop throw all the tableau
            for (var i = 0; i < this.height; i++) {
                for (var j = 0; j < this.width; j++) {
                    // if the case belong to the player
                    if (this.tableau[i][j].playerId == this.currentPlayerId) {
                        this.tableau[i][j].color = color;
                    }
                    // if the the palyer can conquer this case
                    if (this.tableau[i][j].playerId == null &&
                        this.tableau[i][j].color == color &&
                        this.hasNeighborCaseConquer(i, j)
                    ) {
                        this.tableau[i][j].playerId = this.currentPlayerId;
                        this.tableau[i][j].color = color;
                        keepGoing = true;
                    }
                }
            }
        }
        this.updateScores();
    }

    hasNeighborCaseConquer(caseX, caseY) {
        var x, y;

        x = caseX, y = caseY+1;
        if (this.isInTheTableau(x, y)) {
            if (this.tableau[x][y].playerId == this.currentPlayerId) return true;
        }

        x = caseX+1; y = caseY;
        if (this.isInTheTableau(x, y)) {
            if (this.tableau[x][y].playerId == this.currentPlayerId) return true;
        }

        x = caseX; y = caseY-1;
        if (this.isInTheTableau(x, y)) {
            if (this.tableau[x][y].playerId == this.currentPlayerId) return true;
        }

        x = caseX-1; y = caseY;
        if (this.isInTheTableau(x, y)) {
            if (this.tableau[x][y].playerId == this.currentPlayerId) return true;
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

    updateScores() {
        // clear scores
        for (var i in this.players) {
            this.players[i].score = 0;
        }        
        // update scores & check if there is a winner
        var remainCaseToBeConquiered = false;
        for(var i in this.tableau) {
            for(var j in this.tableau[i]) {
                var playerId = this.tableau[i][j].playerId;
                if (playerId != null) {
                    // udpate player score
                    this.players[playerId].score += 1;
                    // check if a player has conquiered most than half of the cases
                    if (this.players[playerId].score > this.width*this.height/2) {
                        this.gameFinised = true;
                    }
                } else {
                    remainCaseToBeConquiered = true;
                }
            }
        }

        if (!remainCaseToBeConquiered) {
            this.gameFinised = true;
        }
    }
}