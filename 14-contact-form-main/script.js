const validation = new JustValidate('#contact-form', {
    focusInvalidField: true,
    errorLabelCssClass: "error-message",
    errorLabelStyle: {},
    errorFieldCssClass: "error"
});

validation
    .addField('#firstname', [
        {rule: 'required', errorMessage: 'This field is required'}
    ])
    .addField('#lastname', [
        {rule: 'required', errorMessage: 'This field is required'}
    ])
    .addField('#email', [
        {rule: 'required', errorMessage: 'This field is required'},
        {rule: 'email', errorMessage: 'Please enter a valid email address'},
    ])
    .addRequiredGroup('#radio-group', 'Please select a query type')
    .addField('#message', [
        {rule: 'required', errorMessage: 'This field is required'}
    ])
    .addRequiredGroup('#checkbox', 'To submit this form, please consent to being contacted')
    .onSuccess((event) => {
        const toast = document.getElementById("success-toast");
        console.log(toast)
        toast.classList.add("active");
        event.target.reset();
        setInterval(() => {
            toast.classList.remove("active");
        }, 5000)
    });

