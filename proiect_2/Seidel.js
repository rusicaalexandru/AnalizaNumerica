var Seidel = /** @class */ (function () {
    function Seidel(eps) {
        var _this = this;
        this.eps = eps;
        /*"71, 2, 3, -4, 4, 241; 4, 72, -5, 5, 2, 396; -3, 2, 73, 1, -3, 130; 3, 2, 1, 74, 1, 324; 4, -4, 3, 2, 75, 531"*/
        document.getElementById("sendBtn").addEventListener('click', function () {
            // @ts-ignore
            var textField = document.getElementById("textField").value;
            var array = textField.trim().split(";");
            _this.matrixA = [];
            _this.initialValues = [];
            for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
                var elem = array_1[_i];
                _this.matrixA.push(elem.trim().replaceAll(" ", "").split(",").map(function (x) { return +x; }));
                _this.initialValues.push(0);
            }
            _this.resolve();
        });
    }
    Seidel.prototype.init = function () {
        console.log('\nInitial Matrix:');
        for (var i = 0; i < this.matrixA.length; i++) {
            var temp = [];
            for (var j = 0; j < this.matrixA.length; j++) {
                temp.push(this.matrixA[i][j]);
            }
            console.log(temp);
        }
        console.log("---------------------------------------");
    };
    Seidel.prototype.pivot = function () {
        for (var i = 0; i < this.matrixA.length; i++) {
            for (var k = i + 1; k < this.matrixA.length; k++) {
                if (Math.abs(this.matrixA[i][i]) < Math.abs(this.matrixA[k][i])) {
                    for (var j = 0; j <= this.matrixA.length; j++) {
                        var temp = this.matrixA[i][j];
                        this.matrixA[i][j] = this.matrixA[k][j];
                        this.matrixA[k][j] = temp;
                    }
                }
            }
        }
    };
    Seidel.prototype.calculate = function () {
        var flag = 0;
        var y;
        var count = 0;
        do {
            var temp = [];
            for (var i = 0; i < this.matrixA.length; i++) {
                y = this.initialValues[i];
                this.initialValues[i] = this.matrixA[i][this.matrixA.length];
                for (var j = 0; j < this.matrixA.length; j++) {
                    if (j != i)
                        this.initialValues[i] = this.initialValues[i] - this.matrixA[i][j] * this.initialValues[j];
                }
                this.initialValues[i] = this.initialValues[i] / this.matrixA[i][i];
                if (Math.abs(this.initialValues[i] - y) <= this.eps)
                    flag++;
                temp.push(this.initialValues[i]);
            }
            console.log("Iteration " + (++count));
            console.log(temp);
        } while (flag < this.matrixA.length);
    };
    Seidel.prototype.resolve = function () {
        console.log('Project Nr.2 by Rusica Alexandru');
        console.log('The Seidel method');
        this.init();
        this.pivot();
        this.calculate();
        console.log('\n The solution is as follows:\n');
        for (var i = 0; i < this.matrixA.length; i++)
            console.log('x' + i + ' = ' + this.initialValues[i]);
    };
    return Seidel;
}());
new Seidel(1e-12);
