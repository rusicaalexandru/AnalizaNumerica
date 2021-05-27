class Seidel {
    readonly eps: number;
    matrixA: number[][];
    initialValues: number[];

    constructor(eps: number) {
        this.eps = eps;

        /*"71, 2, 3, -4, 4, 241; 4, 72, -5, 5, 2, 396; -3, 2, 73, 1, -3, 130; 3, 2, 1, 74, 1, 324; 4, -4, 3, 2, 75, 531"*/
        document.getElementById("sendBtn").addEventListener('click', () => {
            // @ts-ignore
            const textField = document.getElementById("textField").value;
            const array = textField.trim().split(";");
            this.matrixA = [];
            this.initialValues = []

            for (const elem of array) {
                this.matrixA.push(elem.trim().replaceAll(" ", "").split(",").map(x => +x));
                this.initialValues.push(0);
            }

            this.resolve();
        });
    }

    init(): void {
        console.log('\nInitial Matrix:')

        for (let i = 0; i < this.matrixA.length; i++) {
            const temp: number[] = [];

            for (let j = 0; j < this.matrixA.length; j++) {
                temp.push(this.matrixA[i][j])
            }

            console.log(temp);
        }

        console.log("---------------------------------------")
    }

    pivot(): void {
        for (let i = 0; i < this.matrixA.length; i++) {
            for (let k = i + 1; k < this.matrixA.length; k++) {
                if (Math.abs(this.matrixA[i][i]) < Math.abs(this.matrixA[k][i])) {
                    for (let j = 0;j <= this.matrixA.length; j++) {
                        const temp: number = this.matrixA[i][j];
                        this.matrixA[i][j] = this.matrixA[k][j];
                        this.matrixA[k][j] = temp;
                    }
                }
            }
        }
    }

    calculate(): void {
        let flag: number = 0;
        let y: number;
        let count: number = 0;

        do {
            const temp: any[] = [];

            for (let i = 0; i < this.matrixA.length; i++) {
                y = this.initialValues[i];
                this.initialValues[i] = this.matrixA[i][this.matrixA.length];

                for (let j = 0;j < this.matrixA.length; j++) {
                    if (j != i)
                        this.initialValues[i] = this.initialValues[i] - this.matrixA[i][j] * this.initialValues[j];
                }

                this.initialValues[i] = this.initialValues[i] / this.matrixA[i][i];

                if (Math.abs(this.initialValues[i]-y) <= this.eps) flag++;

                temp.push(this.initialValues[i]);
            }

            console.log("Iteration " + (++count))
            console.log(temp)

        } while(flag < this.matrixA.length);
    }

    resolve(): void {
        console.log('Project Nr.2 by Rusica Alexandru');
        console.log('The Seidel method');

        this.init();
        this.pivot();
        this.calculate();

        console.log('\n The solution is as follows:\n');

        for (let i = 0;i < this.matrixA.length; i++)
            console.log('x' + i + ' = ' + this.initialValues[i]);
    }

}

new Seidel(1e-12);



