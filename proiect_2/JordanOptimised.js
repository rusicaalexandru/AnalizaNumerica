var JordanOptimised = /** @class */ (function () {
    function JordanOptimised() {
        var _this = this;
        this.A = [];
        this.a = [];
        this.x = [];
        this.aux = 0;
        this.det = 1;
        /*"71, 2, 3, -4, 4, 241; 4, 72, -5, 5, 2, 396; -3, 2, 73, 1, -3, 130; 3, 2, 1, 74, 1, 324; 4, -4, 3, 2, 75, 531"*/
        document.getElementById("sendBtn").addEventListener('click', function () {
            // @ts-ignore
            var textField = document.getElementById("textField").value;
            var array = textField.trim().split(";");
            _this.A = [];
            for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
                var elem = array_1[_i];
                _this.A.push(elem.trim().replaceAll(" ", "").split(",").map(function (x) { return +x; }));
            }
            _this.initArray();
            _this.output();
        });
    }
    JordanOptimised.prototype.initArray = function () {
        for (var i = 0; i < this.A.length; i++) {
            this.a.push([]);
        }
    };
    JordanOptimised.prototype.output = function () {
        console.log('Project Nr.2 by Rusica Alexandru');
        console.log('Application of the Gauss Jordan (optimized) method');
        this.initial();
        this.step1();
        this.step2();
    };
    JordanOptimised.prototype.initial = function () {
        console.log('\nInitial system:');
        for (var i = 0; i < this.A.length; i++) {
            var temp = [];
            for (var j = 0; j < this.A.length; j++) {
                this.a[i][j] = this.A[i][j];
                temp.push(Number(this.a[i][j].toFixed(2)));
            }
            this.a[i][this.A.length] = this.A[i][this.A.length];
            temp.push(this.a[i][this.A.length]);
            console.log(temp);
        }
    };
    JordanOptimised.prototype.step1 = function () {
        var m;
        for (var l = 0; l < this.A.length; l++) {
            if (this.a[l][l] == 0) {
                m = l + 1;
                while ((this.a[m][l] == 0) && (m < this.A.length))
                    m++;
                if (m >= this.A.length) {
                    console.log('Det = 0. The system doesnt have one solution');
                    return;
                }
                for (var j = 0; j <= this.A.length; j++) {
                    this.aux = this.a[m][j];
                    this.a[m][j] = this.a[l][j];
                    this.a[l][j] = this.aux;
                    this.det = -this.det;
                }
            }
            this.det = this.det * this.a[l][l];
            for (var j = l + 1; j <= this.A.length; j++)
                this.a[l][j] /= this.a[l][l];
            this.a[l][l] = 1;
            for (var i = 0; i < this.A.length; i++) {
                if (i !== l) {
                    for (var j = l + 1; j <= this.A.length; j++)
                        this.a[i][j] = this.a[i][j] - this.a[i][l] * this.a[l][j];
                }
            }
            for (var i = 0; i < l; i++)
                this.a[i][l] = 0;
            for (var i = l + 1; i < this.A.length; i++)
                this.a[i][l] = 0;
            console.log('\A.length The system in step ' + (l + 1));
            for (var i = 0; i < this.A.length; i++) {
                var temp = [];
                for (var j = 0; j < this.A.length; j++)
                    temp.push(Number((this.a[i][j]).toFixed(2)));
                temp.push(Math.floor(this.a[i][this.A.length]));
                console.log(temp);
            }
        }
        for (var j = 0; j < this.A.length; j++)
            this.det = this.det * this.a[j][j];
        console.log('\A.length The determinant of the matrix is ' + this.det);
    };
    JordanOptimised.prototype.step2 = function () {
        var tempAux = [];
        var tempResolve = [];
        for (var i = 0; i < this.A.length; i++) {
            this.x[i] = this.a[i][this.A.length];
        }
        console.log('\A.length System resolve:');
        for (var i = 0; i < this.A.length; i++)
            tempResolve.push(Number(this.x[i].toFixed(2)));
        console.log(tempResolve);
        console.log('\A.length Verification:');
        for (var i = 0; i < this.A.length; i++) {
            this.aux = -this.A[i][this.A.length];
            for (var j = 0; j < this.A.length; j++)
                this.aux = this.aux + this.A[i][j] * this.x[j];
            tempAux.push(this.aux);
        }
        console.log(tempAux);
    };
    return JordanOptimised;
}());
new JordanOptimised();
