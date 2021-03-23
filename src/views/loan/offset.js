
export default {
    data() {
        return {
            waiverForm: {
                loanType: "Select a Loan Type",
                waiverType: "Select a Waiver Type",
                amount: 0,
                fee: 0
            },
           waiverDetails: []
        };
    }, 
    methods: {
        addWaiver(){
            console.log('click')
            let value = this.waiverForm
            console.log("d?>>>", value)
            this.waiverDetails.push(value)
            console.log(this.waiverDetails)
        }
    }, 
};
