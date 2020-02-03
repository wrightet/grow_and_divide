/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/cell.js":
/*!*********************!*\
  !*** ./src/cell.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Mass = __webpack_require__(/*! ./mass */ \"./src/mass.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst Food = __webpack_require__(/*! ./food */ \"./src/food.js\");\nconst GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\nconst Origin = __webpack_require__(/*! ./origin */ \"./src/origin.js\");\n\nconst randomColor = function () {\n    const hexDigits = \"0123456789ABCDEF\";\n    let color = \"#\";\n    for (let i = 0; i < 6; i++) {\n        color += hexDigits[Math.floor((Math.random() * 16))];\n    }\n\n    return color;\n}\n\nconst randomId = function (){\n    return Math.floor((Math.random() * 1000));\n}\n\nconst cloneId = function (cloneId){\n    let id = cloneId || 0;\n    return id += 1;\n}\n\n\nclass Cell extends MovingObject {\n    constructor(options){\n       \n        options.radius = options.radius ||10;\n        options.vel = options.vel || [0,0];\n        options.color = options.color || randomColor();\n        options.id = options.id || randomId();\n        options.cloneId = cloneId(options.cloneId);\n        super(options);  \n    }\n\n    isCollidedWith(otherObject) {\n        const centerDist = Util.dist(this.pos, otherObject.pos);\n\n        // if (otherObject instanceof Cell && this.id === otherObject.id) {\n        //     let dist = this.radius + otherObject.radius;\n        //     otherObject.pos = [otherObject.pos[0] + dist, otherObject.pos[1] + dist]\n        // }\n        return centerDist < (this.radius + otherObject.radius);\n    }\n\n    collideWith(otherObject) {\n        if (otherObject instanceof Food) {\n            otherObject.relocate();\n            this.grow(.1)\n            return true;\n        } else if (otherObject instanceof Mass) {\n            this.grow(5);\n            otherObject.remove();\n        } else if (otherObject instanceof Cell && this.radius > (otherObject.radius + this.radius / 10) && this.id !== otherObject.id) {\n            this.grow(otherObject.radius);\n            otherObject.remove();\n        } else if (otherObject instanceof Cell && this.id === otherObject.id){\n            let dist = this.radius + otherObject.radius;\n           \n            // this.pos = [this.pos[0], this.pos[1] - dist]\n            // otherObject.pos = [otherObject.pos[0] + dist, otherObject.pos[1] + dist]\n        }\n        return false\n    }\n\n    grow(ctx) {\n     this.radius += ctx;\n    }\n\n    shrink(ctx){\n        this.radius -= ctx\n    }\n\n    fireMass(){\n        if (this.radius >= 14){\n            const norm = Util.norm(this.vel);\n            const relVel = Util.scale(\n                Util.dir(this.vel),\n                Mass.SPEED\n        );\n\n        const massVel = [\n            relVel[0] + this. vel[0], relVel[1] + this.vel[1]\n        ];\n\n        const mass = new Mass ({\n            pos: [(this.pos[0] + this.radius), (this.pos[1]+ this.radius)],\n            vel: massVel,\n            color: this. color,\n            game: this.game\n        });\n        this.shrink(mass.radius);\n        this.game.add(mass);\n        }\n        \n    }\n\n    divide(){\n        \n            this.shrink(this.radius/2)\n            const cell = new Cell({\n                radius: this.radius,\n                color: this.color,\n                pos: [(this.pos[0] + this.radius + 5), (this.pos[1] + this.radius + 5)],\n                game: this.game,\n                id: this.id\n            })\n            this.game.addCell(cell)\n            // this.join();\n\n        // if (this.radius >= 14) {\n        //     const norm = Util.norm(this.vel);\n        //     const relVel = Util.scale(\n        //         Util.dir(this.vel),\n        //         Cell.SPEED\n        //     );\n\n        //     const cellVel = [\n        //         relVel[0] + this.vel[0], relVel[1] + this.vel[1]\n        //     ];\n\n        //     const cell = new Cell({\n        //         radius: this.radius,\n        //         color: this.color,\n        //         pos: [(this.pos[0] + this.radius + 5), (this.pos[1] + this.radius + 5)],\n        //         game: this.game,\n        //         id: this.id\n        //     })\n\n\n        // }\n        // this.shrink(this.radius / 2)\n\n        // this.game.addCell(cell)\n    }\n\n    join(){\n        setTimeout(() => {\n            let size = 0;\n         \n            let options = {radius: 0,\n                color: this.color,\n                id: this.id,\n                cloneId: this.cloneId,\n                pos: this.pos,\n                vel: this.vel,\n                game: this.game}\n\n            \n            this.game.cells.forEach(cell => {\n               if(cell.id === this.game.origins[0].id){\n                   options.radius += cell.radius\n                    cell.remove()\n               }\n                    \n                \n            })  \n        \n            this.game.addCell(options)\n        }, 5000);\n    }\n\n    relocate(pos){\n        this.pos = pos || this.game.randomPosition();\n        this.vel = [0, 0];\n    } \n}\n\nmodule.exports = Cell;\n\n\n\n//# sourceURL=webpack:///./src/cell.js?");

/***/ }),

/***/ "./src/food.js":
/*!*********************!*\
  !*** ./src/food.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Cell = __webpack_require__(/*! ./cell */ \"./src/cell.js\");\n\nfunction randomColor() {\n    const hexDigits = \"0123456789ABCDEF\";\n\n    let color = \"#\";\n    for (let i = 0; i < 3; i++) {\n        color += hexDigits[Math.floor((Math.random() * 16))];\n    }\n\n    return color;\n}\n\nclass Food extends MovingObject{\n    constructor(options ={}){\n        options.radius = 1;\n        options.vel = [0, 0];\n        options.color = randomColor();\n        super(options);\n       \n    }\n\n    collideWith(otherObject) {\n        if(!otherObject instanceof Food) {\n             this.relocate();  \n            return true;\n        }\n        return false\n    }  \n    relocate() {\n        this.pos = this.game.randomPosition();\n        this.vel = [0, 0];\n    }  \n\n}\nmodule.exports = Food;\n\n//# sourceURL=webpack:///./src/food.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Cell = __webpack_require__(/*! ./cell */ \"./src/cell.js\");\nconst Food = __webpack_require__(/*! ./food */ \"./src/food.js\");\nconst Mass = __webpack_require__(/*! ./mass */ \"./src/mass.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst Origin = __webpack_require__(/*! ./origin */ \"./src/origin.js\");\nclass Game {\n    constructor(){\n        this.food = [];\n        this.cells = [];\n        this.masses = [];\n        this.origins = [];\n        this.addFood();\n        \n    }\n\n    add(object){\n        \n        if (object instanceof Food){\n            this.food.push(object);\n        } else if (object instanceof Cell){\n            this.cells.push(object);\n        } else if (object instanceof Mass){this.masses.push(object);}\n        else if (object instanceof Origin){this.origins.push(object)}\n        else {\n            throw new Error(\"unknown type of object\");\n        }\n    }\n\n    addFood(){\n        \n        for (let i = 0; i < Game.NUM_FOOD; i++){\n            this.add(new Food({game: this, pos: this.randomPosition()}));\n        }\n    }\n\n    addOrigin(){\n        const origin = new Origin({pos: this.cells[0].pos, id: this.cells[0].id, color: this.cells[0].color, game: this})\n        this.add(origin)\n    }\n\n    addCell(options){\n        if(options){\n            const cell = new Cell(options)\n            this.add(cell);\n            return cell;\n        } else {\n             const cell = new Cell({\n                pos: this.randomPosition(),\n                game: this,\n                id: this.id\n            });\n            this.add(cell);\n            return cell;\n        }\n    }\n\n    allObjects(){\n        return [].concat(this.cells, this.food, this.masses, this.origins);\n    }\n\n    checkCollisions(){\n        const allObjects = this.allObjects();\n        for (let i = 0; i < allObjects.length; i++){\n            for (let j = 0; j < allObjects.length; j++){\n                const obj1 = allObjects[i];\n                const obj2 = allObjects[j];\n\n                if (obj1.isCollidedWith(obj2)){\n                    const collison = obj1.collideWith(obj2);\n                    if( collison) return;\n                }\n            }\n        }\n    }\n\n    draw(ctx) {\n        \n        ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);\n        ctx.fillStyle = Game.BG_COLOR;\n        ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);\n\n        this.allObjects().forEach((object) => {\n            object.draw(ctx);\n        });\n    }\n\n    isOutOfBounds(pos, radius) {\n        \n        return (pos[0] < 0 + radius) || (pos[1] - radius < 0) ||\n            (pos[0] + radius > Game.DIM_X) || (pos[1] + radius > Game.DIM_Y);\n    }\n\n    moveObjects(delta) {\n        this.allObjects().forEach((object) => {\n            object.move(delta);\n        });\n    }\n\n    randomPosition() {\n        return [\n            Game.DIM_X * Math.random(),\n            Game.DIM_Y * Math.random()\n        ];\n    }\n\n    remove(object) {\n        if (object instanceof Mass) {\n            this.masses.splice(this.masses.indexOf(object), 1);\n        } else if (object instanceof Food) {\n            this.food.splice(this.food.indexOf(object), 1);\n        } else if (object instanceof Cell) {\n            this.cells.splice(this.cells.indexOf(object), 1);\n        } else if (object instanceof Origin){\n            this.origins.splice(this.origins.indexOf(object), 1);\n        } else {\n            throw new Error(\"unknown type of object\");\n        }\n    }\n\n    step(delta) {\n        this.moveObjects(delta);\n        this.checkCollisions();\n    }\n\n    wrap(pos) {\n        return [\n            Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)\n        ];\n    }\n\n}\nCell.MOVES = {\n    w: [0, -1],\n    a: [-1, 0],\n    s: [0, 1],\n    d: [1, 0],\n};\nGame.BG_COLOR = \"#000000\";\nGame.DIM_X = 800;\nGame.DIM_Y = 600;\nGame.FPS = 32;\nGame.NUM_FOOD = 500;\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\nclass GameView {\n    constructor(game, ctx){\n        this.ctx = ctx;\n        this.game = game;\n        this.cells = this.game.cells;\n        this.cell = this.game.addCell();\n        this.origin = this.game.addOrigin();\n        this.enemy= this.game.addCell();\n    }\n  \n\n    bindKeyHandlers(){\n\n        Object.keys(GameView.MOVES).forEach((k) => {\n            const move = GameView.MOVES[k];\n            key(k, () => {\n                this.game.origins.forEach(unit => {\n                    unit.power(move);\n                })\n            });\n        });\n       this.game.cells.forEach(cell => {\n           if(cell.id === this.game.origins[0].id){\n                key(\"e\", () => { cell.fireMass();});\n                key(\"g\", () => {cell.grow(10);}); //testing purposes only\n                key(\"space\", () => {\n                    \n                    if(cell.radius > 30){\n                        // console.log(cell)\n                        // console.log(cell.radius)\n                        console.log(this.game)\n                        console.log('divide')\n                        cell.divide(); \n                    }\n                })\n            }\n            \n                \n            });\n       \n       \n    }\n\n    start(){\n        this.bindKeyHandlers();\n        this.lastTime = 0;\n        // start the animation\n        requestAnimationFrame(this.animate.bind(this));\n        \n    }\n\n    animate(time) {\n        const timeDelta = time - this.lastTime;\n\n        this.game.step(timeDelta);\n        this.game.draw(this.ctx);\n        this.lastTime = time;\n\n        // every call to animate requests causes another call to animate\n        requestAnimationFrame(this.animate.bind(this));\n    }\n\n\n}\n//change to cursor control later\nGameView.MOVES = {\n    w: [0, -1],\n    a: [-1, 0],\n    s: [0, 1],\n    d: [1, 0]\n};\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nconst Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    const canvasEl = document.getElementsByTagName(\"canvas\")[0];\n    canvasEl.width = Game.DIM_X;\n    canvasEl.height = Game.DIM_Y;\n\n    const ctx = canvasEl.getContext(\"2d\");\n    const game = new Game();\n    window.game = game;\n    new GameView(game, ctx).start();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/mass.js":
/*!*********************!*\
  !*** ./src/mass.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Cell = __webpack_require__(/*! ./cell */ \"./src/cell.js\");\nconst Food = __webpack_require__(/*! ./food */ \"./src/food.js\");\n\nclass Mass extends MovingObject {\n    constructor(options) {\n        options.radius = 5;\n        // options.vel = [0, 0];\n        options.color = Cell.color;\n        super(options);\n    }\n}\n Mass.SPEED = 6;\nmodule.exports = Mass;\n\n//# sourceURL=webpack:///./src/mass.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\")\n\nclass MovingObject {\n    constructor(options){\n        this.pos = options.pos;\n        this.vel = options.vel;\n        this.radius = options.radius;\n        this.color = options.color;\n        this.game = options.game;\n        this.isStoppable = true;\n        this.id = options.id;\n        this.cloneId = options.cloneId;\n    }\n\n    collideWith(otherObject) {\n        // default do nothing\n    }\n\n    draw(ctx) {\n        ctx.fillStyle = this.color;\n\n        ctx.beginPath();\n        ctx.arc(\n            this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true \n        );\n        ctx.fill();\n    }\n\n    isCollidedWith(otherObject){\n        const centerDist = Util.dist(this.pos, otherObject.pos);\n        return centerDist < (this.radius + otherObject.radius);\n    }\n\n    move(timeDelta) {\n        // timeDelta is number of milliseconds since last move\n        // if the computer is busy the time delta will be larger\n        // in this case the MovingObject should move farther in this frame\n        // velocity of object is how far it should move in 1/60th of a second\n        const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,\n            offsetX = this.vel[0] * velocityScale,\n            offsetY = this.vel[1] * velocityScale;\n        this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];\n        if (this.game.isOutOfBounds(this.pos, this.radius)) {\n            if (this.isStoppable) {\n                this.vel = [0, 0] //stops wrapping\n                // if (this.pos[0] <= 0 + this.radius){\n                //     this.pos = [this.pos[0]+ this.radius, this.pos[1]]\n                // } else if (this.pos[0] >= (800 - this.radius)){\n                //     this.pos = [this.pos[0] - this.radius, this.pos[1]]\n                //     // this.vel = [0,0]\n                // } else if (this.pos[1] <= 0 + this.radius){\n                //     this.pos = [this.pos[0], this.pos[1] + this.radius]\n                // } else if (this.pos[1] > 600 - this.radius) {\n                //     this.pos = [this.pos[0], this.pos[1] - this.radius]\n                // }\n                \n                \n            } else {\n                this.remove();\n            }\n        }\n    }\n\n    remove() {\n        this.game.remove(this);  \n    }\n}\n\nconst NORMAL_FRAME_TIME_DELTA = 1000/60;\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/origin.js":
/*!***********************!*\
  !*** ./src/origin.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\")\nconst Cell = __webpack_require__(/*! ./cell */ \"./src/cell.js\");\nclass Origin extends MovingObject{\n    constructor(props){\n        super(props)\n        this.pos = props.pos\n        this.vel = [0,0]\n        this.radius = 5; //testing purposes\n        this.id = props.id\n        this.color = props.color;\n        // this.color = '#AAffffff' //testing purposes\n        this.game = props.game;\n        \n    }\n    \n    power(impulse) {\n        let count = 0;\n        this.vel[0] += impulse[0];\n        this.vel[1] += impulse[1];\n        this.pos[0] += this.vel[0];\n        this.pos[1] += this.vel[1];\n        if (count <= 1){\n            this.updateFollow(this.pos, this.vel)\n        }\n    }\n\n    updateFollow(pos, vel){\n        let int = 100;\n            this.game.cells.forEach(cell => {\n                if(cell.pos !== pos && cell.id === this.id){\n                    if(pos < 0){\n                        cell.pos = [pos[0] + this.radius, pos[1]]\n                    }\n                    cell.pos = pos;\n                    cell.vel = vel;\n                }\n                \n        })\n    }\n  \n    \n}\n\nmodule.exports = Origin;\n\n//# sourceURL=webpack:///./src/origin.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nconst Util = {\n    // Normalize the length of the vector to 1, maintaining direction.\n    dir(vec) {\n        const norm = Util.norm(vec);\n        return Util.scale(vec, 1 / norm);\n    },\n    // Find distance between two points.\n    dist(pos1, pos2) {\n        return Math.sqrt(\n            Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)\n        );\n    },\n    // Find the length of the vector.\n    norm(vec) {\n        return Util.dist([0, 0], vec);\n    },\n    // Return a randomly oriented vector with the given length.\n    randomVec(length) {\n        const deg = 2 * Math.PI * Math.random();\n        return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n    },\n    // Scale the length of a vector by the given amount.\n    scale(vec, m) {\n        return [vec[0] * m, vec[1] * m];\n    },\n\n    wrap(coord, max) {\n        if (coord < 0) {\n            return max - (coord % max);\n        } else if (coord > max) {\n            return coord % max;\n        } else {\n            return coord;\n        }\n    }\n};\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });