class Simpson {
    private readonly eps: number;
    private readonly a;
    private readonly b;
    private readonly n;
    private k;

    constructor(a: number, b: number, n: number, eps: number) {
        this.a = a;
        this.b = b;
        this.n = n;
        this.eps = eps;
        this.resolve();
    }

    private f(x: number, occasion: string = 'a'): number {
        switch (occasion) {
            case 'a': return x * x * x + 3 * x * x + 3 * x + 6;
            case 'b': return 3 * x * x * x * x + x * x * x + 3 * x * x + 3 * x + 6;
            case 'c':  return x * x * x * x * x + 3 * x * x * x * x + x * x * x + 3 * x * x + 3 * x + 6;
            case 'd': return Math.cos(2 * x * x + 1) * Math.sin(2 * x);
        }
    }

    private df(x: number, occasion: string = 'a') {
        switch (occasion) {
            case 'a': return 6*x + 6;
            case 'b': return 36 * x * x + 6*x + 6;
            case 'c': return 20 * x * x * x + 36 * x * x + 6 * x + 6;
        }
    }

    private simpson(a: number, b: number, occasion: string = 'a'): number {
        return (b - a) / 6 * (this.f(a, occasion) + 4 * this.f((a + b)/ 2, occasion) + this.f(b, occasion));
    }

    private runge(a: number, b: number, occasion: string = 'a'): number {
        let i: number, x: number, S0: number, S: number, h: number;
        this.k = 1;

        h = b - a;
        S = this.simpson(a, b, occasion);
        do {
            S0 = S;
            S = 0; x = a;
            this.k *= 2;
            h /= 2;

            for (i = 1; i <= this.k; i++) {
                S = S + this.simpson(x, x + h, occasion);
                x += h;
            }
        } while (Math.abs(S - S0) > this.eps);

        return S;
    }

    private resolve(): void {
        let S: number, R: number, I: number, x: number, h: number, i: number;

        console.log("Project Nr.4 by Rusica Alexandru");
        console.log("Approximate calculation of defined integrals\n");
        S = this.simpson(this.a, this.b);
        console.log("a) The approximate value of the integral, identical to the exact one: " + S);

        h = (this.b - this.a)/this.n;
        x = this.a; S = 0;

        for ( i = 1; i <= this.n; i++) {
            S = S + this.simpson(x, x + h);
            x += h;
        }

        console.log("Generalized formula: Approximate value of the integral: " + S);

        S = this.simpson(this.a, this.b, 'b');
        R = Math.pow((this.b - this.a) / 2, 5) * this.df(this.a, 'b') / 90;
        I = S + R;

        console.log("\nb) Approximate value of the integral: " + S);
        console.log("The value of the rest term: " + R);
        console.log("The exact value of the integral: " + I);

        x = this.a; S = 0;
        for ( i = 1; i <= this.n; i++) {
            S = S + this.simpson(x, x + h, 'b');
            x += h;
        }
        R = Math.pow((this.b - this.a) / 2, 5) * this.df(this.a, 'b')/(90*this.n*this.n*this.n*this.n);
        I = S + R;

        console.log("Generalized formula: Approximate value of the integral: " + S);
        console.log("The value of the rest term: " + R);
        console.log("The exact value of the integral: " + I);

        S = this.runge(this.a, this.b, 'b');
        console.log("Runge rule: The approximate value of the integral after " + this.k + " divisions: " + S.toFixed(16));

        S = this.simpson(this.a, this.b, 'c');
        R = Math.pow((this.b - this.a) / 2, 5) * this.df(this.b, 'c') / 90;
        I = S + R;

        console.log("\nc) Approximate value of the integral: " + S);
        console.log("The value of the rest term: " + R);
        console.log("The exact value of the integral " + S + " si " + I);

        x = this.a; S = 0;

        for ( i = 1; i <= this.n; i++) {
            S = S + this.simpson(x, x + h, 'c');
            x += h;
        }

        R = Math.pow((this.b - this.a) / 2, 5) * this.df(this.b, 'c')/(90*this.n*this.n*this.n*this.n);
        I = S + R;

        console.log("Generalized formula: Approximate value of the integral: " + S);
        console.log("The value of the rest term: " + R);
        console.log("The exact value of the integral is between " + S + " and " + I);
        S = this.runge(this.a, this.b, 'c');
        console.log("Runge rule: The approximate value of the integral after " + this.k + " divisions: " + S.toFixed(16));

        S = this.runge(this.a, this.b, 'd');
        console.log("\nd) Runge rule: The approximate value of the integral after " + this.k + " divisions: " + S.toFixed(16));
    }

}

new Simpson(1,5,10, 10e-9);
