interface Interval {
    left: number,
    right: number
}

class Equations {
    private readonly a: number;
    private readonly b: number;
    private readonly h: number;
    private readonly eps: number = 1e-12;
    public  k: number;
    arr: Interval[] = [];

    constructor(a: number, b: number, h: number, k: number) {
        this.a = a;
        this.b = b;
        this.h = h;
        this.k = k;
    }

    createArr(): void {
        for (let i: number = 0; i < 10; i++) {
            this.arr.push({left: undefined, right: undefined});
        }
    }

    separation(): number {
        let n: number = 0;
        let xO: number = this.a;
        let x: number;

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
    }

    bisection(a, b): number {
        let x: number;
        this.k = 0;

        do {
            this.k++;
            x = (a + b) / 2 ;

            if (this.f(x) === 0) return x;
            if (this.f(x) * this.f(a) < 0) {
                b = x;
            } else {
                a = x;
            }

        } while (Math.abs(this.f(x)) > this.eps);

        return x;
    }

    newton(a, b): number { // tangentei
        let x: number, d: number;
        let xO: number = (a + b) / 2;
        this.k = 0;

        do {
            this.k++;
            x = xO - equations.f(xO) / equations.fpr(xO);

            if (this.f(x) === 0) return x;

            d = Math.abs(x - xO);
            xO = x;
        } while (d > this.eps);

        return x;
    }

    mNewton(a, b): number { // tangentei modificata
        let x: number, d: number;
        this.k = 0;
        let xO: number = (a + b) / 2;
        const fpr: number = this.fpr(xO);

        do {
            this.k++;
            x = xO - equations.f(xO) / fpr;

            if (this.f(x) === 0) return x;

            d = Math.abs(x - xO);
            xO = x;
        } while (d > this.eps);

        return x;
    }

    secants(a, b): number { // secantelor
        let x: number, d: number;
        let xO: number = a;
        let x1: number = b;
        this.k = 1;

        do {
            this.k++;
            x = x1 - this.f(x1) * (x1 - xO) / (this.f(x1) - this.f(xO));

            if (this.f(x) === 0) return x;

            d = Math.abs(x - x1);
            xO = x1;
            x1 = x;
        } while (d > this.eps);

        return x;
    }

    coarderlor(a, b): number { // coardelor
        let x: number, d: number;
        let xO: number = a;
        let x1: number = b;
        let f = this.f(xO);
        this.k = 1;

        do {
            this.k++;
            x = x1 - this.f(x1) * (x1 - xO) / (this.f(x1) - f);

            if (this.f(x) === 0) return x;

            d = Math.abs(x - x1);
            x1 = x;
        } while (d > this.eps);

        return x;
    }

    mixt(a, b): number { // mixta
        let x: number;
        let x1: number;
        let d: number;
        let xO: number = (a + b) / 2;
        let f: number = this.f(xO);
        this.k = 1;

        x1 = xO - equations.f(xO) / equations.fpr(xO);
        d = Math.abs(x1 - xO);

        if (d < this.eps) return x;

        do {
            this.k++;
            x = x1 - this.f(x1) * (x1 - xO) / (this.f(x1) - f);

            if (this.f(x) === 0) return x;

            d = Math.abs(x - x1);
            x1 = x;
        } while (d > this.eps);

        return x;
    }

    f(x): number {
        //return x*x*x + 5*(x*x) - 35*x - 175;
        return x*x*x - 6*(x*x) - 20*x + 120; //MY
    }

    fi(x): number {
        const ym: number = 35*x + 175 - 5 * x * x;
        //const ym: number = 35*x + 175 - 5 * x * x;

        if (x > 0) {
            return Math.pow(ym * ym, 1 / 6);
        }

        if (x > -5) {
            return (Math.pow(x, 3) + 5 * x * x - 175) / 35;
        }

        return -1 * Math.pow(ym * ym, 1 / 6);
    }

    fpr (x): number {
        return 3*x*x + 10*x - 35;
    }

    showData(val): void {
        console.log(val)
        const tempArr: String[] = [];

        for (let i = 0; i < val; i++) {
            tempArr.push(`O solutie separata se afla pe [${this.arr[i].left.toFixed(2)}; ${this.arr[i].right.toFixed(2)}]<br>`)
        }

        document.getElementById('container').innerHTML = tempArr.join()
    }

    createTable(arr): void {
        const table = document.getElementById('table-body');
        const tr = document.createElement('tr');

        for(const col of arr) {
            const td = document.createElement('td');
            td.innerHTML = col;
            td.style.padding = '10px'
            tr.append(td);
        }

        table.append(tr);
    }

    iterations(a, b): Interval { // iteratiilor
        const res: Interval = {left: undefined, right: undefined}
        let x0, x, delta;
        let k = 0;
        x0 = a;

        do {
            k++;
            x = this.fi(x0);
            res.left = k;
            res.right = x;
            if (Math.abs(this.f(x)) < this.eps) return res;
            delta = Math.abs(x - x0);
            x0 = x;
        } while (delta > this.eps);

        res.left = k;
        res.right = x;

        return res;
    }
}

const equations = new Equations(-7, 7, 0.07, 0);
equations.createArr();
const n: number = equations.separation();
equations.showData(n);



for (let i = 0; i < n; i++) {
    equations.createTable([`${equations.arr[i].left.toFixed(2)}; ${equations.arr[i].right.toFixed(2)}`, '', '', ''])
    let x = equations.bisection(equations.arr[i].left, equations.arr[i].right);
    console.log(`Bisectiei ${x.toFixed(12)} ${equations.k} ${equations.f(x)}`);
    equations.createTable(['Bisectiei', x.toFixed(12), equations.k, equations.f(x)])

    x = equations.newton(equations.arr[i].left, equations.arr[i].right);
    console.log(`Tangentei ${x.toFixed(12)} ${equations.k} ${equations.f(x)}`);
    equations.createTable(['Tangentei', x.toFixed(12), equations.k, equations.f(x)]);

    x = equations.mNewton(equations.arr[i].left, equations.arr[i].right);
    console.log(`Modificata tangentei ${x.toFixed(12)} ${equations.k} ${equations.f(x)}`);
    equations.createTable(['Modificata tangentei', x.toFixed(12), equations.k, equations.f(x)]);

    x = equations.secants(equations.arr[i].left, equations.arr[i].right);
    console.log(`Secantelor ${x.toFixed(12)} ${equations.k} ${equations.f(x)}`);
    equations.createTable(['Secantelor', x.toFixed(12), equations.k, equations.f(x)]);

    x = equations.coarderlor(equations.arr[i].left, equations.arr[i].right);
    console.log(`Coardelor ${x.toFixed(12)} ${equations.k} ${equations.f(x)}`);
    equations.createTable(['Coardelor', x.toFixed(12), equations.k, equations.f(x)]);

    x = equations.mixt(equations.arr[i].left, equations.arr[i].right);
    console.log(`Mixta ${x.toFixed(12)} ${equations.k} ${equations.f(x)}`);
    equations.createTable(['Mixta', x.toFixed(12), equations.k, equations.f(x)]);

    /*x = equations.iterations(equations.arr[i].left, equations.arr[i].right);
    console.log(`Iteratiei ${x.toFixed(12)} ${equations.k} ${equations.f(x)}`);
    equations.createTable(['Iteratiei', x.toFixed(12), equations.k, equations.f(x)]);*/
}
