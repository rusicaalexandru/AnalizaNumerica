var Equations = /** @class */ (function () {
    function Equations(a, b, h, k) {
        this.eps = 1e-12;
        this.arr = [];
        this.a = a;
        this.b = b;
        this.h = h;
        this.k = k;
    }
    Equations.prototype.createArr = function () {
        for (var i = 0; i < 10; i++) {
            this.arr.push({ left: undefined, right: undefined });
        }
    };
    Equations.prototype.separation = function () {
        var n = 0;
        var xO = this.a;
        var x;
        do {
            x = xO + this.h;
            if (this.f(x) == 0) {
                this.arr[n].left = x;
                this.arr[n].right = x;
                xO = x + this.eps;
                n++;
            }
            if (this.f(xO) * this.f(x) < 0) {
                this.arr[n].left = xO;
                this.arr[n].right = x;
                n++;
            }
            xO = x;
        } while (x < this.b);
        return n;
    };
    Equations.prototype.bisection = function (a, b) {
        var x;
        this.k = 0;
        do {
            this.k++;
            x = (a + b) / 2;
            if (this.f(x) === 0)
                return x;
            if (this.f(x) * this.f(a) < 0) {
                b = x;
            }
            else {
                a = x;
            }
        } while (Math.abs(this.f(x)) > this.eps);
        return x;
    };
    Equations.prototype.newton = function (a, b) {
        var x, d;
        var xO = (a + b) / 2;
        this.k = 0;
        do {
            this.k++;
            x = xO - equations.f(xO) / equations.fpr(xO);
            if (this.f(x) === 0)
                return x;
            d = Math.abs(x - xO);
            xO = x;
        } while (d > this.eps);
        return x;
    };
    Equations.prototype.mNewton = function (a, b) {
        var x, d;
        this.k = 0;
        var xO = (a + b) / 2;
        var fpr = this.fpr(xO);
        do {
            this.k++;
            x = xO - equations.f(xO) / fpr;
            if (this.f(x) === 0)
                return x;
            d = Math.abs(x - xO);
            xO = x;
        } while (d > this.eps);
        return x;
    };
    Equations.prototype.secants = function (a, b) {
        var x, d;
        var xO = a;
        var x1 = b;
        this.k = 1;
        do {
            this.k++;
            x = x1 - this.f(x1) * (x1 - xO) / (this.f(x1) - this.f(xO));
            if (this.f(x) === 0)
                return x;
            d = Math.abs(x - x1);
            xO = x1;
            x1 = x;
        } while (d > this.eps);
        return x;
    };
    Equations.prototype.coarderlor = function (a, b) {
        var x, d;
        var xO = a;
        var x1 = b;
        var f = this.f(xO);
        this.k = 1;
        do {
            this.k++;
            x = x1 - this.f(x1) * (x1 - xO) / (this.f(x1) - f);
            if (this.f(x) === 0)
                return x;
            d = Math.abs(x - x1);
            x1 = x;
        } while (d > this.eps);
        return x;
    };
    Equations.prototype.mixt = function (a, b) {
        var x;
        var x1;
        var d;
        var xO = (a + b) / 2;
        var f = this.f(xO);
        this.k = 1;
        x1 = xO - equations.f(xO) / equations.fpr(xO);
        d = Math.abs(x1 - xO);
        if (d < this.eps)
            return x;
        do {
            this.k++;
            x = x1 - this.f(x1) * (x1 - xO) / (this.f(x1) - f);
            if (this.f(x) === 0)
                return x;
            d = Math.abs(x - x1);
            x1 = x;
        } while (d > this.eps);
        return x;
    };
    Equations.prototype.f = function (x) {
        //return x*x*x + 5*(x*x) - 35*x - 175;
        return x * x * x - 6 * (x * x) - 20 * x + 120; //MY
    };
    Equations.prototype.fi = function (x) {
        var ym = 35 * x + 175 - 5 * x * x;
        //const ym: number = 35*x + 175 - 5 * x * x;
        if (x > 0) {
            return Math.pow(ym * ym, 1 / 6);
        }
        if (x > -5) {
            return (Math.pow(x, 3) + 5 * x * x - 175) / 35;
        }
        return -1 * Math.pow(ym * ym, 1 / 6);
    };
    Equations.prototype.fpr = function (x) {
        return 3 * x * x + 10 * x - 35;
    };
    Equations.prototype.showData = function (val) {
        console.log(val);
        var tempArr = [];
        for (var i = 0; i < val; i++) {
            tempArr.push("O solutie separata se afla pe [" + this.arr[i].left.toFixed(2) + "; " + this.arr[i].right.toFixed(2) + "]<br>");
        }
        document.getElementById('container').innerHTML = tempArr.join();
    };
    Equations.prototype.createTable = function (arr) {
        var table = document.getElementById('table-body');
        var tr = document.createElement('tr');
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var col = arr_1[_i];
            var td = document.createElement('td');
            td.innerHTML = col;
            td.style.padding = '10px';
            tr.append(td);
        }
        table.append(tr);
    };
    Equations.prototype.iterations = function (a, b) {
        var res = { left: undefined, right: undefined };
        var x0, x, delta;
        var k = 0;
        x0 = a;
        do {
            k++;
            x = this.fi(x0);
            res.left = k;
            res.right = x;
            if (Math.abs(this.f(x)) < this.eps)
                return res;
            delta = Math.abs(x - x0);
            x0 = x;
        } while (delta > this.eps);
        res.left = k;
        res.right = x;
        return res;
    };
    return Equations;
}());
var equations = new Equations(-7, 7, 0.07, 0);
equations.createArr();
var n = equations.separation();
equations.showData(n);
for (var i = 0; i < n; i++) {
    equations.createTable([equations.arr[i].left.toFixed(2) + "; " + equations.arr[i].right.toFixed(2), '', '', '']);
    var x = equations.bisection(equations.arr[i].left, equations.arr[i].right);
    console.log("Bisectiei " + x.toFixed(12) + " " + equations.k + " " + equations.f(x));
    equations.createTable(['Bisectiei', x.toFixed(12), equations.k, equations.f(x)]);
    x = equations.newton(equations.arr[i].left, equations.arr[i].right);
    console.log("Tangentei " + x.toFixed(12) + " " + equations.k + " " + equations.f(x));
    equations.createTable(['Tangentei', x.toFixed(12), equations.k, equations.f(x)]);
    x = equations.mNewton(equations.arr[i].left, equations.arr[i].right);
    console.log("Modificata tangentei " + x.toFixed(12) + " " + equations.k + " " + equations.f(x));
    equations.createTable(['Modificata tangentei', x.toFixed(12), equations.k, equations.f(x)]);
    x = equations.secants(equations.arr[i].left, equations.arr[i].right);
    console.log("Secantelor " + x.toFixed(12) + " " + equations.k + " " + equations.f(x));
    equations.createTable(['Secantelor', x.toFixed(12), equations.k, equations.f(x)]);
    x = equations.coarderlor(equations.arr[i].left, equations.arr[i].right);
    console.log("Coardelor " + x.toFixed(12) + " " + equations.k + " " + equations.f(x));
    equations.createTable(['Coardelor', x.toFixed(12), equations.k, equations.f(x)]);
    x = equations.mixt(equations.arr[i].left, equations.arr[i].right);
    console.log("Mixta " + x.toFixed(12) + " " + equations.k + " " + equations.f(x));
    equations.createTable(['Mixta', x.toFixed(12), equations.k, equations.f(x)]);
    /*x = equations.iterations(equations.arr[i].left, equations.arr[i].right);
    console.log(`Iteratiei ${x.toFixed(12)} ${equations.k} ${equations.f(x)}`);
    equations.createTable(['Iteratiei', x.toFixed(12), equations.k, equations.f(x)]);*/
}
