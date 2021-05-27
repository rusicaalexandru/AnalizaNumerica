class Simpson2 {
  private readonly eps: number;
  private k: number;

  constructor(eps: number) {
    this.eps = eps;
    this.resolve();
  }

  f(x: number, occasion: string = 'a'): number {
    switch (occasion) {
      case 'a':
        return 2 * x * x + x - 4;
      case 'b':
        return 2 * x * x * x * x + 6 * x * x * x - 2 * x * x - 5 * x + 1;
      case 'c':
        return 8 * x * x * x * x * x - 2 * x * x * x * x + 6 * x * x * x - 2 * x * x - 5 * x + 1;
      case 'd':
        return x * Math.cos(x * x) / (x + 1);
    }
  }

  df(x: number, occasion: string = 'a'): number {
    switch (occasion) {
      case 'a':
        return 0;
      case 'b':
        return 48;
      case 'c':
        return 960 * x - 48;
    }
  }

  Simpson(a: number, b: number, occasion: string = 'a'): number {
    return ((b - a) / 6 * (this.f(a, occasion) + 4 * this.f((a + b) / 2, occasion) + this.f(b, occasion)));
  }

  simpsonIntegral(a, b, n, occasion: string = 'a'): number {
    const width: number = (b-a)/n;
    let integral = 0;

    for(let i: number = 0; i < n; i++) {
      const x1: number = a + i * width;
      const x2: number = a + (i+1) * width;

      integral += (x2-x1)/6 * (this.f(x1, occasion) + 4 * this.f(0.5 * (x1+x2), occasion) + this.f(x2, occasion));
    }

    return integral;
  }

  private range(a: number, b: number, occasion: string = 'a'): number {
    let i: number, x: number, S0: number, S: number, h: number;
    this.k = 1;

    h = b - a;
    S = this.Simpson(a, b, occasion);
    do {
      S0 = S;
      S = 0; x = a;
      this.k *= 2;
      h /= 2;

      for (i = 1; i <= this.k; i++) {
        S = S + this.Simpson(x, x + h, occasion);
        x += h;
      }
    } while (Math.abs(S - S0) > this.eps);

    return S;
  }

  private resolve(): void {
    const a: number = 0, b: number = 2;
    let S: number, R: number, I: number, x: number, h: number, i: number;
    let Rest, eroare;
    let n: number = 10, m: number = (a+b)/2;

    console.log("Project Nr.4 by Rusica Alexandru");
    console.log("Approximate calculation of defined integrals\n");

    S = this.Simpson(a, b);
    console.log("a) " + S.toFixed(16));
    S = this.Simpson(a, b, 'b');
    console.log("b) " + S.toFixed(16));
    S = this.Simpson(a, b, 'c');
    console.log("c) " + S.toFixed(16));
    S = this.Simpson(a, b, 'd');
    console.log("d) " + S.toFixed(16));

    S = this.Simpson(a, b);
    console.log("a) Valoarea aproximativa a integralei, identica cu cea exacta: ", S.toFixed(16));
    S = this.simpsonIntegral(a, b, n);
    console.log("a) Functia modificata Valoarea aproximativa a integralei, identica cu cea exacta: ", S);

    eroare = (-1/90) * h*h*h*h*h * this.df(x,'b');
    h = (b - a) / n;
    x = a;
    S = 0;

    for ( i = 1; i <= n; i++)
    {
      S = S + this.Simpson(x, x + h);
      x += h;
    }

    console.log("Formula generalizata: Valoarea aproximativa a integralei: ", S);
    R = (-1*(Math.pow(h, 5)) * this.df(a)) / (90 * Math.pow(m, 4));
    console.log("Rest = ", R);
    I = S+R;

    console.log("I = ", I, "\n");

    S = this.Simpson(a, b, 'b');
    //Rest = -((b-a)/180)*h*h*h*h*df(a,'b');
    //R = (-1*(pow(h,5)/90)*df(a,'b'))/(90*pow(m,4));
    R = (-1*(Math.pow(h,5)) * this.df(a,'b'))/(90 * Math.pow(m,4));
    //R = pow((b - a), 3) * df(a, 'b')/24;
    I = S + R;
    console.log("b) Valoarea aproximativa a integralei: ", S);
    console.log("Valoarea termenului de rest: ", R);
    console.log("Valoarea exacta a integralei: ", I);

    x = a;
    S = 0;
    for ( i = 1; i <= n; i++)
    {
      S = S + this.Simpson(x, x + h, 'b');
      x += h;
    }
    //R = pow((b - a), 3) * df(b, 'b')/(24*n*n);
    //R = (-1*(pow((b-a/2),5))*df(a,'b'))/(90*pow(m,4));
    R = (-1*(Math.pow(h,5)) * this.df(a,'b')) / (90 * Math.pow(m,4));
    I = S + Rest;

    console.log("Formula generalizata: Valoarea aproximativa a integralei: ", S);
    console.log("Valoarea termenului de rest: ", Rest);
    console.log("Valoarea exacta a integralei: ", I);

    S = this.range(a, b, 'b');
    console.log("Regula Runge: Valoarea aproximativa a integralei dupa " + this.k + " diviziuni: ", S.toFixed(16));
    S = this.Simpson(a, b, 'c');
    //R = pow((b - a), 3) * df(b, 'c')/24;
    R = (-1*(Math.pow((b-a/2),5)) * this.df(a,'c'))/(90 * Math.pow(m,4));

    I = S + R;
    console.log("c) Valoarea aproximativa a integralei: ", S);
    console.log("Valoarea maximala a termenului de rest: ", R);
    console.log("Valoarea exacta a integralei este intre ", S, " si ", I)

    x = a;
    S = 0;

    for ( i = 1; i <= n; i++) {
      S = S + this.Simpson(x, x + h, 'c');
      x += h;
    }
    //R = pow((b - a), 3) * df(b, 'c')/(24*n*n);
    R = (-1*(Math.pow((b-a/2),5)) * this.df(a,'c')) / (90 * Math.pow(m,4));
    I = S + R;

    console.log("Formula generalizata: Valoarea aproximativa a integralei: ", S);
    console.log("Valoarea termenului de rest: ", R);
    console.log("Valoarea exacta a integralei este intre ", S, " si ", I);
    S = this.range(a, b, 'c');
    console.log("Regula Runge: Valoarea aproximativa a integralei dupa ", this.k, " diviziuni: ", S.toFixed(16), "\n");

    S = this.range(a, b, 'd');
    console.log("d) Regula Runge: Valoarea aproximativa a integralei dupa ", this.k, " diviziuni: ", S.toFixed(16));
  }
}

new Simpson2(10e-9);
