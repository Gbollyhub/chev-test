import createNumberMask from 'text-mask-addons/dist/createNumberMask';
  const currencyMask = createNumberMask({
    prefix: '',
    allowDecimal: true,
    decimalLimit :2,
    includeThousandsSeparator: true,
    allowNegative: false,
  });
  
export default {
    data() {
        return {
            mask: currencyMask,
            waiverForm: {
                loanType: "Select a Loan Type",
                waiverType: "Select a Waiver Type",
                amount: "",
                fee: ""
            },
           waiverDetails: []
        };
    }, 
    methods: {
        addWaiver(event) {
            event.preventDefault()
            
            console.log('click')
            let value = this.waiverForm
            console.log("d?>>>", value)
            this.waiverDetails.push(value)
            console.log(this.waiverDetails)
        }
    }, 
};
