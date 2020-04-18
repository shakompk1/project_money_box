let name = document.querySelector('#name');
let amount = document.querySelector('#amount');
let period = document.querySelector('#period');
let initAmount = document.querySelector('#initAmount');
let go = document.querySelector('#go');
let show = document.querySelector('#show');

go.addEventListener('click', function () {
    let obj = {
        name: name.value,
        amount: amount.value,
        period: period.value,
        initAmount: initAmount.value
    }
    let user = new DepositOption(obj,show);
    console.log(user);
})

class DepositOption {
    constructor({ name, amount, period, initAmount }, input) {
        this.name = name;
        this.finalAmount = amount;
        this.depositTerm = period;
        this.startAmount = initAmount;
        this.button = input;
        this.takeDeposit();
    }
    async takeDeposit() {
        try {
            let depositApi = await fetch('https://bolta.herokuapp.com/deposits');
            let data = await depositApi.json();
            this.bestDeposit(data)
        }
        catch{
            this.button.innerHTML = "Ошибка";
            console.log('Error')
        }
    }
    bestDeposit(obj) {
        let bankArr = [];
        let bestСontribution; //Лучший варриант
        for (let i = 0; i < obj.length; i++) {
            if (this.startAmount >= +obj[i].minSumm && (this.depositTerm >= obj[i].minTerm && this.depositTerm <= obj[i].maxTerm)) {
                bankArr.push(obj[i]);
            }
        }
        bestСontribution = bankArr.reduce(function (prev, current) {
            return (prev.income >= current.income) ? prev : current
        });
        this.toСount(bestСontribution)
    }
    toСount(result) {
        this.obj = result;
        let pay = (this.finalAmount - (this.startAmount * Math.pow(1 + (result.income / 100) / 12, this.depositTerm))) / this.findPower(this.depositTerm, result.income);
        pay.toFixed(2)
        this.showMonthlyPayment(pay.toFixed(2))
    }
    findPower(time, rait) {
        let salPower = 0;
        for (let i = time; i > 0; i--) {
            salPower += Math.pow(1 + (rait / 100) / 12, i);
        }
        return salPower;
    }
    showMonthlyPayment(res) {
        this.button.innerHTML = res;
    }
}