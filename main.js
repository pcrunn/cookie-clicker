const buildings = [
    {
        name: 'clicker',
        price: 15,
        description: 'Clicks once every 5 seconds',
        per_second: 0.25,
        per_click: 0.1
    },
    {
        name: 'grandma',
        price: 100,
        description: 'a nice grandma to help bake more cookies',
        per_second: 1,
        per_click: 0.3
    },
    {
        name: 'farm',
        price: 1000,
        description: 'a smelly farm full of pigs',
        per_second: 15,
        per_click: 0.5
    },
    {
        name: 'factory',
        price: 11000,
        description: 'a non environment-friendly factory',
        per_second: 50,
        per_click: 1
    },
    {
        name: 'bank',
        price: 100000,
        description: 'a bank.',
        per_second: 150,
        per_click: 3
    }
];

const app = new Vue({
    el: '#root',
    data: {
        cookies: 0,
        per_second: 0,
        per_click: 1,
        cookie_height: 150,
        buildings,
        notification: '',
    },
    methods: {
        changeCookies(amount) {
            this.cookies += amount;

            this.save();
        },
        clickCookie() {
            this.changeCookies(this.per_click);
            this.notify('+' + this.fix(this.per_click));
        },
        buy(building) {
            if(this.cookies >= building.price) {

                if(building.owned) {
                    building.owned += 1;
                } else {
                    building.owned = 1;
                }

                this.changeCookies(-building.price);
                building.price += building.price / 2;

                this.per_second += building.per_second;
                this.per_click += building.per_click;
            }
        },
        notify(text) {
            this.notification = text;

            setTimeout(() => this.notification = '', 500);
        },
        save() {
            Cookies.set('data', JSON.stringify(this.$data));
        },
        load() {
            if(Cookies.get('data')) {
                Object.entries(JSON.parse(Cookies.get('data'))).forEach(entry => this[entry[0]] = entry[1]);   
            }
        },
        fix(number) {
            if(!number) return 0;
            return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        }
    },
    computed: {
        availableBuildings() {
            return this.buildings.filter(building => this.cookies >= building.price);
        }
    },
    created() {
        this.load();

        setInterval(() => this.changeCookies(this.per_second), 1000);
    }
})
